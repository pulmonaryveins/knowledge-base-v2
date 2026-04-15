import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import type { RdSection } from '../models/rd-section.model';

@Injectable({ providedIn: 'root' })
export class RdSectionsService {
  private readonly _sb = inject(SupabaseService);

  /** Fetches all sections ordered by position then name. */
  async listSections(): Promise<RdSection[]> {
    const { data, error } = await this._sb.client
      .from('rd_sections')
      .select('id, name, position, created_at')
      .order('position', { ascending: true })
      .order('name',     { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as RdSection[];
  }

  /** Creates a new section appended at the end. Throws if the name already exists. */
  async createSection(name: string): Promise<RdSection> {
    // Determine next position
    const { data: last } = await this._sb.client
      .from('rd_sections')
      .select('position')
      .order('position', { ascending: false })
      .limit(1)
      .maybeSingle();

    const position = last ? (last.position + 1) : 0;

    const { data, error } = await this._sb.client
      .from('rd_sections')
      .insert({ name: name.trim(), position })
      .select('id, name, position, created_at')
      .single();

    if (error) {
      if (error.code === '23505') throw new Error(`Section "${name}" already exists.`);
      throw new Error(error.message);
    }
    return data as RdSection;
  }

  /** Deletes a section. */
  async deleteSection(id: string): Promise<void> {
    const { error } = await this._sb.client
      .from('rd_sections')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  /** Renames a section. Throws if the new name already exists. */
  async renameSection(id: string, name: string): Promise<void> {
    const { error } = await this._sb.client
      .from('rd_sections')
      .update({ name: name.trim() })
      .eq('id', id);

    if (error) {
      if (error.code === '23505') throw new Error(`Section "${name}" already exists.`);
      throw new Error(error.message);
    }
  }

  /** Batch-updates positions for all sections after a drag-and-drop reorder. */
  async reorderSections(items: { id: string; position: number }[]): Promise<void> {
    await Promise.all(
      items.map(({ id, position }) =>
        this._sb.client.from('rd_sections').update({ position }).eq('id', id)
      )
    );
  }

  /** Swaps the position values of two sections (move up / move down). */
  async swapPositions(idA: string, posA: number, idB: string, posB: number): Promise<void> {
    const { error: e1 } = await this._sb.client
      .from('rd_sections').update({ position: posB }).eq('id', idA);
    if (e1) throw new Error(e1.message);

    const { error: e2 } = await this._sb.client
      .from('rd_sections').update({ position: posA }).eq('id', idB);
    if (e2) throw new Error(e2.message);
  }
}
