import { FontAwesome } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const headerRight = () => {
    return (
      <Pressable
        onPress={() => router.push("/modal")}
        style={{ marginRight: 16 }}
      >
        <FontAwesome name="plus-circle" size={28} color="#007AFF" />
      </Pressable>
    );
  };
  return (
    <View>
      <Stack.Screen options={{ headerRight }} />
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Welcome to the Home Screen!
        </Text>
      </View>
    </View>
  );
}
