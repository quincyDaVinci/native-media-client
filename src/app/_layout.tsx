import { createDbIfNeeded } from "@/features/db/schema";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

const RootLayout = () => {
  return (
    <SQLiteProvider databaseName="vinyls.db" onInit={createDbIfNeeded}>
      <Stack>
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
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
};

export default RootLayout;
