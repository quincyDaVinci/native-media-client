import { useVinyls } from "@/hooks/useVinyls";
import { AppTheme } from "@/theme/appTheme";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Stack, router } from "expo-router";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { vinyls, fetchVinyls } = useVinyls();

  useFocusEffect(
    useCallback(() => {
      fetchVinyls();
    }, []),
  );

  const totalVinyls = vinyls.length;
  const vinylsWithCover = vinyls.filter((item) =>
    Boolean(item.coverPath),
  ).length;

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
          <Text style={styles.statValue}>{vinylsWithCover}</Text>
          <Text style={styles.statLabel}>Met cover</Text>
        </View>
      </View>
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
});
