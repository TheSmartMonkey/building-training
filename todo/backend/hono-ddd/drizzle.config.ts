import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/data/**/*',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'db.sqlite',
  },
});
