import {
  copyAsync,
  documentDirectory,
  getInfoAsync,
  makeDirectoryAsync,
} from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";

export async function pickAndStoreCover(vinylId: number) {
  console.log("[cover] start pickAndStoreCover", { vinylId });
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  console.log("[cover] media permission", permission);

  if (!permission.granted) {
    console.log("[cover] permission denied");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 0.8,
  });
  console.log("[cover] picker result canceled?", result.canceled);

  if (result.canceled) {
    console.log("[cover] user canceled image picking");
    return null;
  }

  if (!documentDirectory) {
    console.log("[cover] documentDirectory is missing");
    return null;
  }

  const pickedImage = result.assets[0];
  console.log("[cover] picked image", {
    uri: pickedImage.uri,
    fileName: pickedImage.fileName,
    width: pickedImage.width,
    height: pickedImage.height,
  });
  const coversDir = `${documentDirectory}covers/`;
  const relativePath = `covers/${vinylId}.jpg`;
  const newPath = `${documentDirectory}${relativePath}`;
  console.log("[cover] paths", { coversDir, relativePath, newPath });

  const dirInfo = await getInfoAsync(coversDir);
  console.log("[cover] covers dir info", dirInfo);
  if (!dirInfo.exists) {
    await makeDirectoryAsync(coversDir, { intermediates: true });
    console.log("[cover] created covers directory");
  }

  await copyAsync({
    from: pickedImage.uri,
    to: newPath,
  });
  console.log("[cover] copied image to local file");

  return relativePath;
}

export function getCoverUri(coverPath?: string | null) {
  console.log("[cover] getCoverUri input", { coverPath });
  if (!coverPath) {
    console.log("[cover] getCoverUri -> null (no coverPath)");
    return null;
  }

  if (coverPath.startsWith("file://")) {
    console.log("[cover] getCoverUri -> absolute uri");
    return coverPath;
  }

  if (!documentDirectory) {
    console.log("[cover] getCoverUri -> null (documentDirectory missing)");
    return null;
  }

  const uri = `${documentDirectory}${coverPath}`;
  console.log("[cover] getCoverUri -> built uri", { uri });
  return uri;
}
