import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function VinylDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Vinyl Details for ID: {id}</Text>
    </View>
  );
}
