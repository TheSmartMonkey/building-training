# honojs-cloudflare-d1

bun run db:init
npx wrangler d1 create todo-db
npx wrangler d1 execute todo-db --local --file=./drizzle/0000_minor_jazinda.sql

