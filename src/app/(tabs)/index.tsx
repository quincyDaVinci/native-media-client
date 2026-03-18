import { useVinyls } from "@/hooks/useVinyls";
import { AppTheme } from "@/theme/appTheme";
import { getCoverUri } from "@/utils/pickAndStoreCover";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { vinyls, fetchVinyls } = useVinyls();

  useFocusEffect(
    useCallback(() => {
      fetchVinyls();
    }, []),
  );

  const totalVinyls = vinyls.length;

  const uniqueArtists = new Set(
    vinyls.map((item) => item.artist?.trim().toLowerCase()).filter(Boolean),
  ).size;

  const featuredVinyl = useMemo(() => {
    if (vinyls.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * vinyls.length);
    return vinyls[randomIndex];
  }, [vinyls]);

  const featuredCoverUri = featuredVinyl
    ? getCoverUri(featuredVinyl.coverPath)
    : null;

  const artistCounts: Record<string, number> = {};

  for (const vinyl of vinyls) {
    const artistName = vinyl.artist?.trim();

    if (!artistName) continue;

    artistCounts[artistName] = (artistCounts[artistName] ?? 0) + 1;
  }

  let topArtistName = "Nog geen artiesten";
  let topArtistCount = 0;

  for (const [artistName, count] of Object.entries(artistCounts)) {
    if (count > topArtistCount) {
      topArtistName = artistName;
      topArtistCount = count;
    }
  }

  const headerRight = () => {
    return (
      <Pressable
        onPress={() => router.push("/modal")}
        style={({ pressed }) => [
          styles.headerAction,
          pressed && styles.headerActionPressed,
        ]}
      >
        <FontAwesome
          name="plus-circle"
          size={26}
          color={AppTheme.colors.accent}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerRight }} />
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Vinyl Collectie</Text>
        <Text style={styles.heroSubtitle}>
          Een eenvoudige offline ruimte om je vinyls te verzamelen en beheren.
        </Text>
        <Text style={styles.heroHint}>
          Gebruik de plusknop in de header om een nieuwe vinyl toe te voegen.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalVinyls}</Text>
          <Text style={styles.statLabel}>Totaal vinyls</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{uniqueArtists}</Text>
          <Text style={styles.statLabel}>Artiesten</Text>
        </View>
      </View>

      <View style={styles.highlightCard}>
        <Text style={styles.highlightLabel}>Meest verzamelde artiest</Text>
        <Text style={styles.highlightTitle}>{topArtistName}</Text>
        <Text style={styles.highlightText}>
          {topArtistCount > 0
            ? `${topArtistCount} vinyl${topArtistCount > 1 ? "s" : ""} in collectie`
            : "Voeg vinyls toe om inzichten te zien."}
        </Text>
      </View>

      {featuredVinyl && (
        <Pressable
          onPress={() => router.push(`/vinyl-details/${featuredVinyl.id}`)}
          style={({ pressed }) => [
            styles.featuredCard,
            pressed && styles.featuredCardPressed,
          ]}
        >
          {featuredCoverUri ? (
            <Image
              source={{ uri: featuredCoverUri }}
              style={styles.featuredImage}
            />
          ) : (
            <View style={styles.featuredPlaceholder}>
              <Text style={styles.featuredPlaceholderText}>Geen cover</Text>
            </View>
          )}

          <View style={styles.featuredMeta}>
            <Text style={styles.featuredLabel}>Uitgelichte vinyl</Text>
            <Text style={styles.featuredTitle} numberOfLines={1}>
              {featuredVinyl.title}
            </Text>
            <Text style={styles.featuredArtist} numberOfLines={1}>
              {featuredVinyl.artist}
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    padding: AppTheme.spacing.lg,
  },
  headerAction: {
    marginRight: AppTheme.spacing.md,
    borderRadius: AppTheme.radius.pill,
  },
  headerActionPressed: {
    opacity: 0.75,
  },
  heroCard: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.radius.lg,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.xl,
    gap: AppTheme.spacing.md,
    ...AppTheme.shadows.card,
  },
  heroTitle: {
    fontSize: AppTheme.typography.hero,
    fontWeight: "700",
    color: AppTheme.colors.textPrimary,
  },
  heroSubtitle: {
    fontSize: AppTheme.typography.subtitle,
    color: AppTheme.colors.textSecondary,
    lineHeight: 22,
  },
  heroHint: {
    fontSize: AppTheme.typography.body,
    color: AppTheme.colors.textMuted,
  },
  statsRow: {
    flexDirection: "row",
    gap: AppTheme.spacing.md,
    marginTop: AppTheme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.radius.lg,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.lg,
    gap: AppTheme.spacing.xs,
    ...AppTheme.shadows.card,
  },
  statValue: {
    fontSize: AppTheme.typography.hero,
    fontWeight: "700",
    color: AppTheme.colors.textPrimary,
  },
  statLabel: {
    fontSize: AppTheme.typography.body,
    color: AppTheme.colors.textSecondary,
  },
  highlightCard: {
    marginTop: AppTheme.spacing.lg,
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.radius.lg,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.lg,
    gap: AppTheme.spacing.xs,
    ...AppTheme.shadows.card,
  },
  highlightLabel: {
    fontSize: AppTheme.typography.body,
    color: AppTheme.colors.textMuted,
  },
  highlightTitle: {
    fontSize: AppTheme.typography.title,
    fontWeight: "700",
    color: AppTheme.colors.textPrimary,
  },
  highlightText: {
    fontSize: AppTheme.typography.body,
    color: AppTheme.colors.textSecondary,
  },
  featuredCard: {
    marginTop: AppTheme.spacing.lg,
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
  featuredCardPressed: {
    opacity: 0.85,
  },
  featuredImage: {
    width: 88,
    height: 88,
    borderRadius: AppTheme.radius.md,
    backgroundColor: AppTheme.colors.surfaceAlt,
  },
  featuredPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: AppTheme.radius.md,
    backgroundColor: AppTheme.colors.surfaceAlt,
    borderWidth: AppTheme.borderWidth.thin,
    borderColor: AppTheme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredPlaceholderText: {
    color: AppTheme.colors.textMuted,
    fontSize: AppTheme.typography.caption,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: AppTheme.spacing.sm,
  },
  featuredMeta: {
    flex: 1,
    gap: AppTheme.spacing.xs,
  },
  featuredLabel: {
    fontSize: AppTheme.typography.body,
    color: AppTheme.colors.textMuted,
  },
  featuredTitle: {
    fontSize: AppTheme.typography.subtitle,
    fontWeight: "700",
    color: AppTheme.colors.textPrimary,
  },
  featuredArtist: {
    fontSize: AppTheme.typography.body,
    color: AppTheme.colors.textSecondary,
  },
});
