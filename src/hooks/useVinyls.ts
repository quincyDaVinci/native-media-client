import { getAllVinyls } from "@/features/db/vinylRepo";
import { VinylType } from "@/types/VinylType";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export function useVinyls() {
  const database = useSQLiteContext();

  const [vinyls, setData] = useState<VinylType[]>([]);

  const fetchVinyls = async () => {
    const result = await getAllVinyls(database);
    setData(result);
  };

  useEffect(() => {
    fetchVinyls();
  }, [database]);

  return { vinyls, fetchVinyls };
}
