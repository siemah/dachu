import { usePathname } from "expo-router";
import { getScreenColor } from "../helpers/ui";

/**
 * Get screen color(background) as well as navigation bar(on android) as well
 * 
 * @returns screen color(background) and the background of navigation bar on android
 */
export default function useScreenColor() {
  const pathname = usePathname();
  const screenColor = getScreenColor(pathname);

  return screenColor;
}