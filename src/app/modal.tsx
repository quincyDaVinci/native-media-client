import { router, Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const [editMode, setEditMode] = useState(false);

  const database = useSQLiteContext();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    const result = await database.getFirstAsync<{
      title: string;
      artist: string;
    }>("SELECT title, artist FROM vinyls WHERE id = ?;", [
      parseInt(id as string),
    ]);
    if (result) {
      setTitle(result.title);
      setArtist(result.artist);
    }
  };

  const handleSave = () => {
    console.log("Saving vinyl:", { title, artist });
    try {
      database.runAsync("INSERT INTO vinyls (title, artist) VALUES (?, ?)", [
        title,
        artist,
      ]);
      console.log("Vinyl saved successfully");
      router.back();
    } catch (error) {
      console.error("Error saving vinyl:", error);
    } finally {
      setTitle("");
      setArtist("");
    }
  };

  const handleUpdate = async () => {
    console.log("Updating vinyl:", { id, title, artist });
    try {
      const response = await database.runAsync(
        "UPDATE vinyls SET title = ?, artist = ? WHERE id = ?",
        [title, artist, parseInt(id as string)],
      );
      console.log("Vinyl updated successfully:", response?.changes!);
      router.back();
    } catch (error) {
      console.error("Error updating vinyl:", error);
    } finally {
      setTitle("");
      setArtist("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Stack.Screen options={{ headerTitle: "Add New Vinyl" }} />
      <View style={{ gap: 12 }}>
        <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
        <TextInput
          placeholder="Artist"
          value={artist}
          onChangeText={setArtist}
        />
      </View>
      <View style={{ padding: 16 }}>
        <Text
          onPress={editMode ? handleUpdate : handleSave}
          style={{ fontSize: 18, color: "blue" }}
        >
          {editMode ? "Update Vinyl" : "Save Vinyl"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
