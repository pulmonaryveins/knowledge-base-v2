// scripts/set-env.mjs
// Generates environment files from environment variables.
// Runs automatically before `ng build` via the `prebuild` npm script.

import { writeFileSync, mkdirSync } from 'fs';

const supabaseUrl    = process.env['SUPABASE_URL']       || '';
const supabaseAnonKey = process.env['SUPABASE_ANON_KEY'] || '';
const strapiUrl      = process.env['STRAPI_URL']         || 'http://localhost:1337';
const strapiToken    = process.env['STRAPI_TOKEN']       || '';

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
