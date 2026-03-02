import { VinylType } from "@/types/VinylType";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function VinylDetailsScreen() {
  const { id } = useLocalSearchParams();

  const database = useSQLiteContext();

  const [item, setData] = useState<VinylType | null>(null);

  useEffect(() => {
    const fetchVinyl = async () => {
      const result = await database.getAllAsync<VinylType>(
        "SELECT * FROM vinyls WHERE id = ?",
        [Number(id)],
      );
      if (result.length > 0) {
        setData(result[0]);
      } else {
        console.log("No vinyl found with that ID.");
      }
    };

    fetchVinyl();
  }, [id, database]);

  return (
    <View>
      {item && (
        <View>
          <Text>Title: {item.title}</Text>
          <Text>Artist: {item.artist}</Text>
          <Text>Year: {item.year}</Text>
        </View>
      )}
    </View>
  );
}
