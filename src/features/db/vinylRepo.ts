import { VinylType } from "@/types/VinylType";
import type { SQLiteDatabase } from "expo-sqlite";

const getAllVinyls = async (database: SQLiteDatabase) => {
  return database.getAllAsync<VinylType>("SELECT * FROM vinyls");
};

const getVinylById = async (database: SQLiteDatabase, id: number) => {
  return database.getAllAsync<VinylType>("SELECT * FROM vinyls WHERE id = ?", [
    id,
  ]);
};

const deleteVinylById = async (database: SQLiteDatabase, id: number) => {
  await database.runAsync("DELETE FROM vinyls WHERE id = ?", [id]);
};

const getVinylBasicById = (db: SQLiteDatabase, id: number) => {
  return db.getFirstAsync<{ title: string; artist: string }>(
    "SELECT title, artist FROM vinyls WHERE id = ?;",
    [id],
  );
};

const createVinyl = (db: SQLiteDatabase, title: string, artist: string) => {
  return db.runAsync("INSERT INTO vinyls (title, artist) VALUES (?, ?)", [
    title,
    artist,
  ]);
};

const updateVinyl = (
  db: SQLiteDatabase,
  id: number,
  title: string,
  artist: string,
) => {
  return db.runAsync("UPDATE vinyls SET title = ?, artist = ? WHERE id = ?", [
    title,
    artist,
    id,
  ]);
};

const updateVinylCover = (
  db: SQLiteDatabase,
  id: number,
  coverPath: string,
) => {
  console.log("[cover] repo.updateVinylCover", { id, coverPath });
  return db.runAsync("UPDATE vinyls SET coverPath = ? WHERE id = ?", [
    coverPath,
    id,
  ]);
};

export {
  createVinyl,
  deleteVinylById,
  getAllVinyls,
  getVinylBasicById,
  getVinylById,
  updateVinyl,
  updateVinylCover
};

