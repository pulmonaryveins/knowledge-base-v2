// ── FILE: src/app/shared/components/code-block/code-block.component.ts ──

import { Component, computed, input, signal } from '@angular/core';
import { LucideAngularModule, Copy, Check } from 'lucide-angular';
import { CodeBlockData } from '../../../core/models';

export interface CodeToken { text: string; cls: string; }

// ── Keyword sets ──────────────────────────────────────────────────────────────
const TS_KW = new Set([
  'import','export','default','from','as','class','extends','implements',
  'interface','type','enum','const','let','var','function','return','new',
  'async','await','if','else','for','while','of','in','switch','case',
  'break','continue','throw','try','catch','finally','public','private',
  'protected','readonly','static','abstract','override','declare','module',
  'namespace','never','void','any','unknown','object','true','false','null',
  'undefined','this','super',
]);
const TS_TYPE = new Set(['string','number','boolean','symbol','bigint','never','void','any','unknown','object','Array','Promise','Observable','Signal']);
const BASH_CMD = new Set([
  'git','npm','npx','ng','node','yarn','pnpm','python','python3','pip',
  'pip3','cd','ls','mkdir','rm','cp','mv','cat','echo','export','source',
  'chmod','chown','sudo','apt','brew','docker','kubectl','curl','wget',
  'touch','open','code','env','set','unset','read','exec','eval','clear',
]);

// ── Tokenizer ─────────────────────────────────────────────────────────────────

function tok(text: string, cls: string): CodeToken { return { text, cls }; }

function mergeOrPush(tokens: CodeToken[], text: string, cls: string): void {
  if (!text) return;
  const last = tokens[tokens.length - 1];
  if (last && last.cls === cls) last.text += text;
  else tokens.push(tok(text, cls));
}

function tokenizeLine(line: string, lang: string, isFirstNonEmpty: boolean): CodeToken[] {
  if (line === '') return [tok('', 'tok-plain')];

  const tokens: CodeToken[] = [];
  const push = (text: string, cls: string) => mergeOrPush(tokens, text, cls);

  const isBash  = ['bash', 'sh', 'shell'].includes(lang);
  const isJson  = lang === 'json';
  const isHtml  = ['html', 'xml', 'template'].includes(lang);
  const isScss  = ['scss', 'css'].includes(lang);
  const isTs    = ['typescript', 'ts', 'javascript', 'js'].includes(lang);

  let i = 0;

  // ── Bash first-word command highlight ────────────────────────────────────
  if (isBash) {
    // skip leading whitespace
    const indent = line.match(/^(\s*)/)?.[1] ?? '';
    push(indent, 'tok-plain');
    i = indent.length;

    // comment
    if (line[i] === '#') { push(line.slice(i), 'tok-comment'); return tokens; }

    // first word = command
    const cmdMatch = line.slice(i).match(/^[\w.\-/]+/);
    if (cmdMatch) {
      const cmd = cmdMatch[0];
      push(cmd, BASH_CMD.has(cmd.split('/').pop()!) ? 'tok-keyword' : 'tok-plain');
      i += cmd.length;
    }
  }

  // ── JSON root ─────────────────────────────────────────────────────────────
  if (isJson) {
    while (i < line.length) {
      const ch = line[i];
      if (ch === '"') {
        let j = i + 1;
        while (j < line.length && !(line[j] === '"' && line[j-1] !== '\\')) j++;
        j++;
        const word = line.slice(i, j);
        // key if followed by `:`
        const after = line.slice(j).trimStart();
        push(word, after.startsWith(':') ? 'tok-keyword' : 'tok-string');
        i = j; continue;
      }
      if (/\d/.test(ch)) {
        let j = i;
        while (j < line.length && /[\d.eE+\-]/.test(line[j])) j++;
        push(line.slice(i, j), 'tok-number'); i = j; continue;
      }
      const kw = line.slice(i);
      if (kw.startsWith('true') || kw.startsWith('false') || kw.startsWith('null')) {
        const w = kw.match(/^(true|false|null)/)?.[0]!;
        push(w, 'tok-type'); i += w.length; continue;
      }
      push(ch, 'tok-punct'); i++;
    }
    return tokens;
  }

  // ── Main TS / Bash / SCSS / HTML tokenizer ───────────────────────────────
  while (i < line.length) {
    const ch = line[i];
    const rest = line.slice(i);

    // ── Block comment open ────────────────────────────────────────────────
    if (rest.startsWith('/*')) {
      const end = line.indexOf('*/', i + 2);
      if (end !== -1) { push(line.slice(i, end + 2), 'tok-comment'); i = end + 2; }
      else { push(rest, 'tok-comment'); break; }
      continue;
    }

    // ── Line comment ──────────────────────────────────────────────────────
    if ((isTs || isScss) && rest.startsWith('//')) { push(rest, 'tok-comment'); break; }
    if ((isBash) && ch === '#') { push(rest, 'tok-comment'); break; }

    // ── HTML tag ──────────────────────────────────────────────────────────
    if (isHtml && ch === '<') {
      const m = rest.match(/^<\/?[\w\-]+/);
      if (m) { push(m[0], 'tok-keyword'); i += m[0].length; continue; }
      push(ch, 'tok-punct'); i++; continue;
    }

    // ── Decorator ─────────────────────────────────────────────────────────
    if (isTs && ch === '@' && /[A-Za-z]/.test(line[i+1] ?? '')) {
      let j = i + 1;
      while (j < line.length && /[\w]/.test(line[j])) j++;
      push(line.slice(i, j), 'tok-decorator'); i = j; continue;
    }

    // ── Template literal / string ─────────────────────────────────────────
    if (ch === '"' || ch === "'" || (ch === '`' && isTs)) {
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === '\\') { j += 2; continue; }
        if (line[j] === ch)   { j++; break; }
        j++;
      }
      push(line.slice(i, j), 'tok-string'); i = j; continue;
    }

    // ── Bash variable / flag ──────────────────────────────────────────────
    if (isBash) {
      if (ch === '$') {
        let j = i + 1;
        if (line[j] === '{') { while (j < line.length && line[j] !== '}') j++; j++; }
        else { while (j < line.length && /[\w]/.test(line[j])) j++; }
        push(line.slice(i, j), 'tok-number'); i = j; continue;
      }
      if (ch === '-') {
        let j = i;
        while (j < line.length && /[\w\-]/.test(line[j])) j++;
        push(line.slice(i, j), 'tok-type'); i = j; continue;
      }
    }

    // ── Number literal ─────────────────────────────────────────────────────
    if (/\d/.test(ch) && (i === 0 || !/[\w.]/.test(line[i-1]))) {
      let j = i;
      while (j < line.length && /[\d._xXa-fA-F]/.test(line[j])) j++;
      push(line.slice(i, j), 'tok-number'); i = j; continue;
    }

    // ── Word (keyword / type / identifier) ────────────────────────────────
    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i;
      while (j < line.length && /[\w$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (isTs && TS_KW.has(word))   { push(word, 'tok-keyword'); }
      else if (isTs && TS_TYPE.has(word)) { push(word, 'tok-type'); }
      else if (isBash && BASH_CMD.has(word)) { push(word, 'tok-keyword'); }
      else { push(word, 'tok-plain'); }
      i = j; continue;
    }

    // ── SCSS property ─────────────────────────────────────────────────────
    if (isScss && /[\w\-]/.test(ch)) {
      let j = i;
      while (j < line.length && /[\w\-]/.test(line[j])) j++;
      const word = line.slice(i, j);
      push(word, line[j] === ':' ? 'tok-keyword' : 'tok-plain');
      i = j; continue;
    }

    // ── Operator / punctuation ────────────────────────────────────────────
    const ops = ['=>', '===', '!==', '==', '!=', '<=', '>=', '&&', '||', '??', '?.', '...'];
    const op = ops.find(o => rest.startsWith(o));
    if (op) { push(op, 'tok-punct'); i += op.length; continue; }

    push(ch, /[{}[\]();,]/.test(ch) ? 'tok-punct' : 'tok-plain');
    i++;
  }

  return tokens.length ? tokens : [tok('', 'tok-plain')];
}

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class CodeBlockComponent {
  public readonly data = input.required<CodeBlockData>();

  protected readonly CopyIcon  = Copy;
  protected readonly CheckIcon = Check;
  protected readonly copied = signal(false);

  protected readonly lines = computed<string[]>(() => {
    const raw = this.data().code.split('\n');
    if (raw.length > 1 && raw[raw.length - 1] === '') raw.pop();
    return raw;
  });

  protected readonly tokenLines = computed<CodeToken[][]>(() => {
    const lang = this.data().language.toLowerCase().trim();
    return this.lines().map((line, idx) => tokenizeLine(line, lang, idx === 0));
  });

  protected async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.data().code);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch { /* ignore */ }
  }
}
