import { SQLiteDatabase } from "expo-sqlite";

const createDbIfNeeded = async (db: SQLiteDatabase) => {
  console.log("Creating database if needed...");

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS vinyls (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, artist TEXT, coverPath TEXT)`,
  );

  const columns = await db.getAllAsync<{ name: string }>("PRAGMA table_info(vinyls)");
  const hasCoverPath = columns.some((column) => column.name === "coverPath");

  if (!hasCoverPath) {
    await db.execAsync("ALTER TABLE vinyls ADD COLUMN coverPath TEXT");
  }
};

export { createDbIfNeeded };
