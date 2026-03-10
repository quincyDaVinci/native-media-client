import { useVinyls } from "@/hooks/useVinyls";
import { getCoverUri } from "@/utils/pickAndStoreCover";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

export default function VinylList() {
  const router = useRouter();
  const { vinyls, fetchVinyls } = useVinyls();

  useFocusEffect(
    useCallback(() => {
      fetchVinyls();
    }, []),
  );

  return (
    <View style={{ padding: 15 }}>
      <FlatList
        data={vinyls}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const coverUri = getCoverUri(item.coverPath);

          return (
            <Pressable
              onPress={() => router.push(`/vinyl-details/${item.id}`)}
              style={{
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              {coverUri ? (
                <Image
                  source={{ uri: coverUri }}
                  style={{ width: 56, height: 56, borderRadius: 6, backgroundColor: "#eee" }}
                />
              ) : (
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 6,
                    backgroundColor: "#eee",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, color: "#666" }}>No Cover</Text>
                </View>
              )}

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16 }}>{item.title}</Text>
                <Text style={{ color: "#888", fontSize: 12 }}>{item.artist}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
