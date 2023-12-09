import * as  Linking from "expo-linking";

/**
 * Open a given url using another app if there is an app
 * allowed to open the provided url
 * @param url url to open
 * @returns true if opened otherwise false
 */
export async function openURL(url: string) {
  try {
    await Linking.openURL(url);
    return true;
  } catch (error) {
    return false;
  }
}