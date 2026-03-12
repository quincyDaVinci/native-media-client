import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { AppTheme } from "@/theme/appTheme";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        sceneStyle: { backgroundColor: AppTheme.colors.background },
        headerStyle: { backgroundColor: AppTheme.colors.background },
        headerTintColor: AppTheme.colors.textPrimary,
        headerTitleStyle: { fontSize: AppTheme.typography.subtitle, fontWeight: "700" },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: AppTheme.colors.surface,
          borderTopColor: AppTheme.colors.border,
          borderTopWidth: AppTheme.borderWidth.thin,
          height: 64,
          paddingBottom: AppTheme.spacing.sm,
          paddingTop: AppTheme.spacing.sm,
        },
        tabBarActiveTintColor: AppTheme.colors.accent,
        tabBarInactiveTintColor: AppTheme.colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vinyl-list"
        options={{
          headerTitle: "Vinyls",
          title: "Vinyls",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="music" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
