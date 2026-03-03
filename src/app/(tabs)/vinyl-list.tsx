import { useVinyls } from "@/hooks/useVinyls";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function VinylList() {
  const router = useRouter();
  const { vinyls } = useVinyls();

  return (
    <View style={{ padding: 15 }}>
      <FlatList
        data={vinyls}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/vinyl-details/${item.id}`)}
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <Text style={{ color: "#888", fontSize: 12 }}>{item.artist}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
