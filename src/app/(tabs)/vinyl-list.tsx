import { useVinyls } from "@/hooks/useVinyls";
import { AppTheme } from "@/theme/appTheme";
import { getCoverUri } from "@/utils/pickAndStoreCover";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function VinylList() {
  const router = useRouter();
  const { vinyls, fetchVinyls } = useVinyls();

  const [searchQuery, setSearchQuery] = useState("");

  const [isCoverGridMode, setIsCoverGridMode] = useState(false);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleVinyls = vinyls.filter((item) => {
    if (!normalizedQuery) return true;

    const matchesTitle = item.title.toLowerCase().includes(normalizedQuery);
    const matchesArtist = item.artist.toLowerCase().includes(normalizedQuery);

    return matchesTitle || matchesArtist;
  });

  useFocusEffect(
    useCallback(() => {
      fetchVinyls();
    }, []),
  );

  return (
    <View style={styles.screen}>
      <View style={styles.toolbar}>
        <Pressable
          onPress={() => setIsCoverGridMode((prev) => !prev)}
          style={({ pressed }) => [
            styles.iconButton,
            isCoverGridMode && styles.iconButtonActive,
            pressed && styles.iconButtonPressed,
          ]}
        >
          <Ionicons
            name={isCoverGridMode ? "images" : "images-outline"}
            size={20}
            color={
              isCoverGridMode
                ? AppTheme.colors.background
                : AppTheme.colors.textPrimary
            }
          />
        </Pressable>
      </View>

      <View style={styles.searchWrapper}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Zoek op titel of artiest"
          placeholderTextColor={AppTheme.colors.textMuted}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        key={isCoverGridMode ? "grid" : "list"}
        data={visibleVinyls}
        numColumns={isCoverGridMode ? 2 : 1}
        columnWrapperStyle={isCoverGridMode ? styles.gridRow : undefined}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              {vinyls.length === 0
                ? "Geen vinyls gevonden"
                : "Geen vinyls met cover gevonden"}
            </Text>

            <Text style={styles.emptyText}>
              {vinyls.length === 0
                ? "Voeg je eerste vinyl toe met de plusknop in de header."
                : "Zet het filter uit of voeg covers toe aan je vinyls."}
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const coverUri = getCoverUri(item.coverPath);
          if (isCoverGridMode) {
            return (
              <Pressable
                onPress={() => router.push(`/vinyl-details/${item.id}`)}
                style={({ pressed }) => [
                  styles.gridCard,
                  pressed && styles.cardPressed,
                ]}
              >
                {coverUri ? (
                  <Image
                    source={{ uri: coverUri }}
                    style={styles.gridCoverImage}
                  />
                ) : (
                  <View style={styles.gridCoverPlaceholder}>
                    <Text style={styles.placeholderText} numberOfLines={2}>
                      {item.title}
                      {`\n- ${item.artist}`}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          }

          return (
            <Pressable
              onPress={() => router.push(`/vinyl-details/${item.id}`)}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              {coverUri ? (
                <Image source={{ uri: coverUri }} style={styles.coverImage} />
              ) : (
                <View style={styles.coverPlaceholder}>
                  <Text style={styles.placeholderText}>Geen cover</Text>
                </View>
              )}

              <View style={styles.meta}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                  {item.artist}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    paddingHorizontal: AppTheme.spacing.lg,
    paddingTop: AppTheme.spacing.md,
  },
  listContent: {
    gap: AppTheme.spacing.md,
    paddingBottom: AppTheme.spacing.xxl,
  },
  emptyCard: {
    marginTop: AppTheme.spacing.xl,
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.radius.lg,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.xl,
    gap: AppTheme.spacing.sm,
    alignItems: "center",
    ...AppTheme.shadows.card,
  },
  emptyTitle: {
    color: AppTheme.colors.textPrimary,
    fontSize: AppTheme.typography.title,
    fontWeight: "700",
  },
  emptyText: {
    color: AppTheme.colors.textMuted,
    fontSize: AppTheme.typography.body,
    textAlign: "center",
    lineHeight: 20,
  },
  card: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.radius.lg,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: AppTheme.spacing.md,
    ...AppTheme.shadows.card,
  },
  cardPressed: {
    opacity: 0.8,
  },
  coverImage: {
    width: 72,
    height: 72,
    borderRadius: AppTheme.radius.md,
    backgroundColor: AppTheme.colors.surfaceAlt,
  },
  coverPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: AppTheme.radius.md,
    backgroundColor: AppTheme.colors.surfaceAlt,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: AppTheme.colors.textMuted,
    fontSize: AppTheme.typography.caption,
    fontWeight: "700",
  },
  meta: {
    flex: 1,
    gap: AppTheme.spacing.xs,
  },
  title: {
    color: AppTheme.colors.textPrimary,
    fontSize: AppTheme.typography.subtitle,
    fontWeight: "700",
  },
  artist: {
    color: AppTheme.colors.textSecondary,
    fontSize: AppTheme.typography.body,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: AppTheme.spacing.md,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: AppTheme.radius.pill,
    backgroundColor: AppTheme.colors.surface,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    ...AppTheme.shadows.card,
  },
  iconButtonActive: {
    backgroundColor: AppTheme.colors.textPrimary,
  },
  iconButtonPressed: {
    opacity: 0.8,
  },
  gridRow: {
    gap: AppTheme.spacing.md,
  },
  gridCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: AppTheme.radius.lg,
    overflow: "hidden",
    backgroundColor: AppTheme.colors.surface,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadows.card,
  },
  gridCoverImage: {
    width: "100%",
    height: "100%",
  },
  gridCoverPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppTheme.colors.surfaceAlt,
  },
  searchWrapper: {
    marginBottom: AppTheme.spacing.xl,
  },
  searchInput: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.radius.lg,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    paddingHorizontal: AppTheme.spacing.md,
    paddingVertical: AppTheme.spacing.md,
    color: AppTheme.colors.textPrimary,
    fontSize: AppTheme.typography.body,
    ...AppTheme.shadows.card,
  },
});
