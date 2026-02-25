import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const vinyls = [
  {
    id: 1,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
  },
  {
    id: 2,
    title: "Abbey Road",
    artist: "The Beatles",
  },
];

export default function VinylList() {
  const router = useRouter();

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
