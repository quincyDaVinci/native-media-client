import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Auth debug</Text>

      <Text>Status:</Text>

      <Text>Session: </Text>
      <Text>Je bent niet ingelogd.</Text>
    </View>
  );
}
