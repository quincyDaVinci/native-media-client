import { login } from "@/api/auth";
import { loadSession, saveSession } from "@/utils/sessionStorage";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  async function handleTestLogin() {
    try {
      const session = await login({
        baseUrl: "http://192.168.68.136:8096",
        username: "admin",
        password: "admin",
      });

      await saveSession(JSON.stringify(session));
      const saved = await loadSession();
      console.log(saved);
      const parsed = JSON.parse(saved!);
      console.log(parsed.sessionToken);

      console.log("Session saved:", session);
    } catch (err) {
      console.log("Login error:", err);
    }
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text>Auth test</Text>
      <Button title="Test Jellyfin login" onPress={handleTestLogin} />
    </View>
  );
}
