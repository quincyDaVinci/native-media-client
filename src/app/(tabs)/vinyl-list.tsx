import { useVinyls } from "@/hooks/useVinyls";
import { AppTheme } from "@/theme/appTheme";
import { getCoverUri } from "@/utils/pickAndStoreCover";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function VinylList() {
  const router = useRouter();
  const { vinyls, fetchVinyls } = useVinyls();

  useFocusEffect(
    useCallback(() => {
      fetchVinyls();
    }, []),
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={vinyls}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No vinyls yet</Text>
            <Text style={styles.emptyText}>
              Add your first record with the plus button in the header.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const coverUri = getCoverUri(item.coverPath);

          return (
            <Pressable
              onPress={() => router.push(`/vinyl-details/${item.id}`)}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              {coverUri ? (
                <Image
                  source={{ uri: coverUri }}
                  style={styles.coverImage}
                />
              ) : (
                <View style={styles.coverPlaceholder}>
                  <Text style={styles.placeholderText}>No Cover</Text>
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
    fontWeight: "600",
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
});
