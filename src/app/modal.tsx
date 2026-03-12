import { useVinylModal } from "@/hooks/useVinyl";
import { AppTheme } from "@/theme/appTheme";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
    <SafeAreaView style={styles.screen}>
      <Stack.Screen options={{ headerTitle: editMode ? "Edit Vinyl" : "Add New Vinyl" }} />
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="Enter vinyl title"
            placeholderTextColor={AppTheme.colors.textMuted}
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Artist</Text>
          <TextInput
            placeholder="Enter artist name"
            placeholderTextColor={AppTheme.colors.textMuted}
            value={artist}
            onChangeText={setArtist}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={onPress} style={({ pressed }) => [
          styles.submitButton,
          pressed && styles.submitButtonPressed,
        ]}>
          <Text style={styles.submitButtonText}>
            {editMode ? "Update Vinyl" : "Save Vinyl"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    padding: AppTheme.spacing.lg,
    gap: AppTheme.spacing.lg,
  },
  form: {
    gap: AppTheme.spacing.lg,
  },
  field: {
    gap: AppTheme.spacing.sm,
  },
  label: {
    color: AppTheme.colors.textSecondary,
    fontSize: AppTheme.typography.body,
    fontWeight: "600",
  },
  input: {
    borderRadius: AppTheme.radius.md,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    backgroundColor: AppTheme.colors.surface,
    color: AppTheme.colors.textPrimary,
    paddingHorizontal: AppTheme.spacing.md,
    paddingVertical: AppTheme.spacing.md,
    fontSize: AppTheme.typography.body,
  },
  footer: {
    marginTop: AppTheme.spacing.sm,
  },
  submitButton: {
    borderRadius: AppTheme.radius.md,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.buttons.primary.borderColor,
    backgroundColor: AppTheme.buttons.primary.backgroundColor,
    paddingVertical: AppTheme.spacing.md,
    alignItems: "center",
  },
  submitButtonPressed: {
    opacity: 0.8,
  },
  submitButtonText: {
    color: AppTheme.buttons.primary.textColor,
    fontSize: AppTheme.typography.button,
    fontWeight: "700",
  },
});
