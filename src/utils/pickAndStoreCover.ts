import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export async function pickAndStoreCover(vinylId: number) {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 0.8,
  });

  if (result.canceled) {
    return null;
  }

  if (!FileSystem.documentDirectory) {
    return null;
  }

  const pickedImage = result.assets[0];
  const coversDir = `${FileSystem.documentDirectory}covers/`;
  const relativePath = `covers/${vinylId}.jpg`;
  const newPath = `${FileSystem.documentDirectory}${relativePath}`;

  const dirInfo = await FileSystem.getInfoAsync(coversDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(coversDir, { intermediates: true });
  }

  await FileSystem.copyAsync({
    from: pickedImage.uri,
    to: newPath,
  });

  return relativePath;
}

export function getCoverUri(coverPath?: string | null) {
  if (!coverPath) {
    return null;
  }

  if (coverPath.startsWith("file://")) {
    return coverPath;
  }

  if (!FileSystem.documentDirectory) {
    return null;
  }

  return `${FileSystem.documentDirectory}${coverPath}`;
}
