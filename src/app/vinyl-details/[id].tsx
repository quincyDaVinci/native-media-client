import { VinylType } from "@/types/VinylType";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function VinylDetailsScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  const database = useSQLiteContext();

  const [item, setData] = useState<VinylType | null>(null);

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

  const handleDelete = async (id: number) => {
    try {
      await database.runAsync("DELETE FROM vinyls WHERE id = ?", [id]);
      fetchVinyl();
    } catch (error) {
      console.error("Error deleting vinyl:", error);
    }
  };

  useEffect(() => {
    fetchVinyl();
  }, [id, database]);

  return (
    <View>
      {item && (
        <View>
          <View>
            <Text>Title: {item.title}</Text>
            <Text>Artist: {item.artist}</Text>
            <Text>Year: {item.year}</Text>
          </View>

          <View>
            <Pressable
              onPress={() => router.push(`/modal?id=${item.id}`)}
              style={{ marginTop: 20 }}
            >
              <Text>Edit</Text>
            </Pressable>
            <Pressable
              onPress={() => handleDelete(item.id)}
              style={{ marginTop: 20 }}
            >
              <Text>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
