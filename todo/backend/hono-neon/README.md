# Hono Neon Todo API

A Todo API built with Hono, Drizzle ORM, and Neon PostgreSQL database.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `env.example` to `.env`
   - Replace the DATABASE_URL with your actual Neon database connection string
   ```bash
   cp env.example .env
   ```

3. Set up your Neon database:
   - Create a Neon account at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy your connection string from the dashboard
   - Update the DATABASE_URL in your .env file

4. Generate and push the database schema:
   ```bash
   npm run init
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

- `DATABASE_URL`: Your Neon PostgreSQL connection string

## API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get a specific todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo
- `PATCH /todos/:id/complete` - Mark todo as completed
- `PATCH /todos/:id/uncomplete` - Mark todo as uncompleted
