// scripts/set-env.mjs
// Generates environment files from environment variables.
// Runs automatically before `ng build` via the `prebuild` npm script.

import { writeFileSync, mkdirSync } from 'fs';

const supabaseUrl     = process.env['SUPABASE_URL']      || 'https://okftoxjvgwrpsizdyexf.supabase.co';
const supabaseAnonKey = process.env['SUPABASE_ANON_KEY'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZnRveGp2Z3dycHNpemR5ZXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNjkwMzYsImV4cCI6MjA5MTY0NTAzNn0.mRU1RIHXA9jjBaufmn0BX-5ph8rlRf4kNbog3Rz1oyQ';
const strapiUrl       = process.env['STRAPI_URL']        || 'http://localhost:1337';
const strapiToken     = process.env['STRAPI_TOKEN']      || '';

console.log('Environment sources:');
console.log('  SUPABASE_URL:      ', process.env['SUPABASE_URL'] ? '✅ from env' : '⚠️  using fallback');
console.log('  SUPABASE_ANON_KEY: ', process.env['SUPABASE_ANON_KEY'] ? '✅ from env' : '⚠️  using fallback');
console.log('  STRAPI_URL:        ', process.env['STRAPI_URL'] ? '✅ from env' : '⚠️  using fallback');
console.log('  STRAPI_TOKEN:      ', process.env['STRAPI_TOKEN'] ? '✅ from env' : '⚠️  using fallback');

const dev = `export const environment = {
  production: false,
  supabaseUrl: '${supabaseUrl}',
  supabaseAnonKey: '${supabaseAnonKey}',
  strapiUrl: '${strapiUrl}',
  strapiToken: '${strapiToken}',
};
`;

const prod = `export const environment = {
  production: true,
  supabaseUrl: '${supabaseUrl}',
  supabaseAnonKey: '${supabaseAnonKey}',
  strapiUrl: '${strapiUrl}',
  strapiToken: '${strapiToken}',
};
`;

mkdirSync('src/environments', { recursive: true });
writeFileSync('src/environments/environment.ts', dev);
writeFileSync('src/environments/environment.prod.ts', prod);

console.log('✅ environment.ts and environment.prod.ts generated');
