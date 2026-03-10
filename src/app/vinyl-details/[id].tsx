import { updateVinylCover } from "@/features/db/vinylRepo";
import { useVinyl } from "@/hooks/useVinyl";
import { getCoverUri, pickAndStoreCover } from "@/utils/pickAndStoreCover";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";

export default function VinylDetailsScreen() {
  const database = useSQLiteContext();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const vinylId = Number(id);

  const { item, handleDelete, fetchVinyl } = useVinyl(vinylId);

  useFocusEffect(
    useCallback(() => {
      console.log("[cover] detail screen focused, fetching vinyl", { vinylId });
      fetchVinyl();
    }, []),
  );

  const handleCoverPick = async () => {
    console.log("[cover] handleCoverPick triggered", { vinylId });
    if (Number.isNaN(vinylId)) {
      console.log("[cover] invalid vinylId, aborting");
      return;
    }

    try {
      const coverPath = await pickAndStoreCover(vinylId);
      console.log("[cover] pickAndStoreCover returned", { coverPath });

      if (!coverPath) {
        console.log("[cover] no coverPath returned, stop");
        return;
      }

      const updateResult = await updateVinylCover(database, vinylId, coverPath);
      console.log("[cover] updateVinylCover result", {
        changes: updateResult.changes,
        lastInsertRowId: updateResult.lastInsertRowId,
      });
      await fetchVinyl();
      console.log("[cover] fetchVinyl done after update");
    } catch (error) {
      console.error("[cover] failed while saving cover", error);
      Alert.alert("Could not save cover image", "Please try again.");
    }
  };

  if (!item) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Vinyl not found.</Text>
      </View>
    );
  }

  const coverUri = getCoverUri(item.coverPath);
  console.log("[cover] rendering detail", {
    id: item.id,
    coverPath: item.coverPath,
    coverUri,
  });

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>{item.title}</Text>
      <Text style={{ color: "#555" }}>{item.artist}</Text>

      {coverUri ? (
        <Image
          source={{ uri: coverUri }}
          style={{ width: 220, height: 220, borderRadius: 8, backgroundColor: "#eee" }}
        />
      ) : (
        <View
          style={{
            width: 220,
            height: 220,
            borderRadius: 8,
            backgroundColor: "#eee",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>No cover selected</Text>
        </View>
      )}

      <Pressable onPress={handleCoverPick} style={{ marginTop: 8 }}>
        <Text style={{ color: "#007AFF", fontSize: 16 }}>
          {coverUri ? "Change cover" : "Add cover"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push(`/modal?id=${item.id}`)} style={{ marginTop: 8 }}>
        <Text style={{ color: "#007AFF", fontSize: 16 }}>Edit</Text>
      </Pressable>

      <Pressable
        onPress={async () => {
          await handleDelete(item.id);
          router.back();
        }}
        style={{ marginTop: 8 }}
      >
        <Text style={{ color: "#C62828", fontSize: 16 }}>Delete</Text>
      </Pressable>
    </View>
  );
}
