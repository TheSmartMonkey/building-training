import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/todo/todo.schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'todo-db',
  },
});
