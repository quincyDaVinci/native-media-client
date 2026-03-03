import { useVinyl } from "@/hooks/useVinyl";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function VinylDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { item, handleDelete } = useVinyl(Number(id));

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
