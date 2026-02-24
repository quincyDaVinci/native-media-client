import * as SecureStore from "expo-secure-store";

const KEY = "session.v1";

export async function saveSession(sessionJson: string) {
  await SecureStore.setItemAsync(KEY, sessionJson);
}

export async function loadSession() {
  return SecureStore.getItemAsync(KEY);
}

export async function clearSession() {
  await SecureStore.deleteItemAsync(KEY);
}
