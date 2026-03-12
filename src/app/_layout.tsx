import { createDbIfNeeded } from "@/features/db/schema";
import { AppTheme } from "@/theme/appTheme";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

const RootLayout = () => {
  return (
    <SQLiteProvider databaseName="vinyls.db" onInit={createDbIfNeeded}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: AppTheme.colors.background },
          headerStyle: { backgroundColor: AppTheme.colors.background },
          headerTintColor: AppTheme.colors.textPrimary,
          headerTitleStyle: { fontSize: AppTheme.typography.subtitle, fontWeight: "700" },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="vinyl-details/[id]"
          options={{
            headerTitle: "Vinyl Details",
            title: "Vinyl Details",
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            headerTitle: "Vinyl",
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
};

export default RootLayout;
