import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

const RootLayout = () => {
  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    console.log("Creating database if needed...");
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS vinyls (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, artist TEXT)`,
    );
  };

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
