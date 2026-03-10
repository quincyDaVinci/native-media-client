import { SQLiteDatabase } from "expo-sqlite";

const createDbIfNeeded = async (db: SQLiteDatabase) => {
  console.log("[db] createDbIfNeeded: start");

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS vinyls (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, artist TEXT, coverPath TEXT)`,
  );
  console.log("[db] createDbIfNeeded: table ensured");

  const columns = await db.getAllAsync<{ name: string }>("PRAGMA table_info(vinyls)");
  console.log("[db] createDbIfNeeded: current columns", columns);
  const hasCoverPath = columns.some((column) => column.name === "coverPath");

  if (!hasCoverPath) {
    await db.execAsync("ALTER TABLE vinyls ADD COLUMN coverPath TEXT");
    console.log("[db] createDbIfNeeded: added missing coverPath column");
  }
};

export { createDbIfNeeded };
