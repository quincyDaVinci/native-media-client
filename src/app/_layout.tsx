import { Stack } from "expo-router";

const RootLayout = () => {
  return (
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
    </Stack>
  );
};

export default RootLayout;
