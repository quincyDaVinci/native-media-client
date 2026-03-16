import { AppTheme } from "@/theme/appTheme";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
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
});
