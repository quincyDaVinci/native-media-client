import { useVinyl } from "@/hooks/useVinyl";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";

export default function VinylDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { item, handleDelete, fetchVinyl } = useVinyl(Number(id));

  useFocusEffect(
    useCallback(() => {
      fetchVinyl();
    }, []),
  );

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
