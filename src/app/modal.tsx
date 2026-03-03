import { useVinylModal } from "@/hooks/useVinyl";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  const { id } = useLocalSearchParams();
  const {
    title,
    setTitle,
    artist,
    setArtist,
    editMode,
    handleSave,
    handleUpdate,
  } = useVinylModal(id ? Number(id) : undefined);

  const onPress = async () => {
    const success = editMode ? await handleUpdate() : await handleSave();
    if (success) {
      router.back();
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
        <Text onPress={onPress} style={{ fontSize: 18, color: "blue" }}>
          {editMode ? "Update Vinyl" : "Save Vinyl"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
