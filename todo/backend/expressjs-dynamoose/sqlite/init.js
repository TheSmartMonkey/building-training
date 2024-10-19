import { connectToDatabase } from './connect.js';

async function initializeDatabase() {
  try {
    const db = await connectToDatabase();
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TRIGGER IF NOT EXISTS update_todos_timestamp 
      AFTER UPDATE ON todos
      FOR EACH ROW
      BEGIN
        UPDATE todos SET updated_at = CURRENT_TIMESTAMP
        WHERE id = OLD.id;
      END;
    `);

    console.log('Database and trigger initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();
