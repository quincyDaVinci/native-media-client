import { updateVinylCover } from "@/features/db/vinylRepo";
import { useVinyl } from "@/hooks/useVinyl";
import { AppTheme } from "@/theme/appTheme";
import { getCoverUri, pickAndStoreCover } from "@/utils/pickAndStoreCover";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

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
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Vinyl not found.</Text>
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
    <View style={styles.screen}>
      <View style={styles.coverBlock}>
        {coverUri ? (
          <Image source={{ uri: coverUri }} style={styles.coverImage} />
        ) : (
          <View style={styles.coverPlaceholder}>
            <Text style={styles.coverPlaceholderText}>
              Geen afbeelding beschikbaar
            </Text>
          </View>
        )}
      </View>

      <View style={styles.metaBlock}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={handleCoverPick}
          style={({ pressed }) => [
            styles.actionButtonBase,
            styles.actionButtonPrimary,
            pressed && styles.actionPressed,
          ]}
        >
          <Text
            style={[styles.actionButtonText, styles.actionButtonTextPrimary]}
          >
            {coverUri ? "Wijzigen cover" : "Cover toevoegen"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push(`/modal?id=${item.id}`)}
          style={({ pressed }) => [
            styles.actionButtonBase,
            styles.actionButtonSecondary,
            pressed && styles.actionPressed,
          ]}
        >
          <Text
            style={[styles.actionButtonText, styles.actionButtonTextSecondary]}
          >
            Wijzigen
          </Text>
        </Pressable>

        <Pressable
          onPress={async () => {
            await handleDelete(item.id);
            router.back();
          }}
          style={({ pressed }) => [
            styles.actionButtonBase,
            styles.actionButtonDanger,
            pressed && styles.actionPressed,
          ]}
        >
          <Text
            style={[styles.actionButtonText, styles.actionButtonTextDanger]}
          >
            Verwijderen
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    padding: AppTheme.spacing.lg,
    gap: AppTheme.spacing.lg,
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: AppTheme.spacing.lg,
  },
  notFoundText: {
    color: AppTheme.colors.textSecondary,
    fontSize: AppTheme.typography.subtitle,
  },
  coverBlock: {
    alignItems: "center",
  },
  coverImage: {
    width: 240,
    height: 240,
    borderRadius: AppTheme.radius.lg,
    backgroundColor: AppTheme.colors.surfaceAlt,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
  },
  coverPlaceholder: {
    width: 240,
    height: 240,
    borderRadius: AppTheme.radius.lg,
    backgroundColor: AppTheme.colors.surfaceAlt,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  coverPlaceholderText: {
    color: AppTheme.colors.textMuted,
    fontSize: AppTheme.typography.body,
  },
  metaBlock: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.radius.lg,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.lg,
    gap: AppTheme.spacing.xs,
    ...AppTheme.shadows.card,
  },
  title: {
    color: AppTheme.colors.textPrimary,
    fontSize: AppTheme.typography.title,
    fontWeight: "700",
  },
  artist: {
    color: AppTheme.colors.textSecondary,
    fontSize: AppTheme.typography.subtitle,
  },
  actions: {
    gap: AppTheme.spacing.sm,
  },
  actionButtonBase: {
    borderRadius: AppTheme.radius.md,
    borderWidth: AppTheme.borderWidth.thin,
    paddingVertical: AppTheme.spacing.md,
    alignItems: "center",
  },
  actionButtonPrimary: {
    backgroundColor: AppTheme.buttons.primary.backgroundColor,
    borderColor: AppTheme.buttons.primary.borderColor,
  },
  actionButtonSecondary: {
    backgroundColor: AppTheme.buttons.secondary.backgroundColor,
    borderColor: AppTheme.buttons.secondary.borderColor,
  },
  actionButtonDanger: {
    backgroundColor: AppTheme.buttons.danger.backgroundColor,
    borderColor: AppTheme.buttons.danger.borderColor,
  },
  actionButtonText: {
    fontSize: AppTheme.typography.button,
    fontWeight: "700",
  },
  actionButtonTextPrimary: {
    color: AppTheme.buttons.primary.textColor,
  },
  actionButtonTextSecondary: {
    color: AppTheme.buttons.secondary.textColor,
  },
  actionButtonTextDanger: {
    color: AppTheme.buttons.danger.textColor,
  },
  actionPressed: {
    opacity: 0.8,
  },
});
