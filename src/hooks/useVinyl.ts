import {
    createVinyl,
    deleteVinylById,
    getVinylBasicById,
    getVinylById,
    updateVinyl,
} from "@/features/db/vinylRepo";
import { VinylType } from "@/types/VinylType";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export function useVinyl(id: number) {
  const database = useSQLiteContext();

  const [item, setData] = useState<VinylType | null>(null);

  const fetchVinyl = async () => {
    const result = await getVinylById(database, id);
    if (result.length > 0) {
      setData(result[0]);
    } else {
      console.log("No vinyl found with that ID.");
    }
  };

  const handleDelete = async (vinylId: number) => {
    try {
      await deleteVinylById(database, vinylId);
      fetchVinyl();
    } catch (error) {
      console.error("Error deleting vinyl:", error);
    }
  };

  useEffect(() => {
    fetchVinyl();
  }, [id, database]);

  return { fetchVinyl, handleDelete, item };
}

export function useVinylModal(id?: number) {
  const database = useSQLiteContext();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    const result = await getVinylBasicById(database, id as number);
    if (result) {
      setTitle(result.title);
      setArtist(result.artist);
    }
  };

  const handleSave = async () => {
    console.log("Saving vinyl:", { title, artist });
    try {
      await createVinyl(database, title, artist);
      console.log("Vinyl saved successfully");
      setTitle("");
      setArtist("");
      return true;
    } catch (error) {
      console.error("Error saving vinyl:", error);
      return false;
    }
  };

  const handleUpdate = async () => {
    console.log("Updating vinyl:", { id, title, artist });
    try {
      const response = await updateVinyl(database, id as number, title, artist);
      console.log("Vinyl updated successfully:", response?.changes!);
      setTitle("");
      setArtist("");
      return true;
    } catch (error) {
      console.error("Error updating vinyl:", error);
      return false;
    }
  };

  return {
    title,
    setTitle,
    artist,
    setArtist,
    editMode,
    handleSave,
    handleUpdate,
  };
}
