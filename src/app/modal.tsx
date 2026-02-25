import { router, Stack } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const database = useSQLiteContext();

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
        <Text onPress={handleSave} style={{ fontSize: 18, color: "blue" }}>
          Save
        </Text>
      </View>
    </SafeAreaView>
  );
}
