import { SQLiteDatabase } from "expo-sqlite";

const createDbIfNeeded = async (db: SQLiteDatabase) => {
  console.log("Creating database if needed...");
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS vinyls (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, artist TEXT)`,
  );
};

export { createDbIfNeeded };

