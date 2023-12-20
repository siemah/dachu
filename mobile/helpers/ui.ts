/**
 * Get tab icons
 * 
 * @param index index of the tab
 * @param isFocused tab state
 * @returns icon name using ionicon
 */
export function getIcon(index: number, isFocused: boolean): any {
  let icon: string = 'grid-outline';
  if (index === 0) {
    isFocused ? (icon = 'grid') : (icon = 'grid-outline');
  } else if (index === 1) {
    isFocused ? (icon = 'time') : (icon = 'time-outline');
  } else if (index === 2) {
    isFocused ? (icon = 'bookmarks') : (icon = 'bookmarks-outline');
  } else if (index === 3) {
    isFocused ? (icon = 'basketball') : (icon = 'basketball-outline');
  } else if (index === 4) {
    isFocused ? (icon = 'albums') : (icon = 'albums-outline');
  } else if (index === 5) {
    isFocused ? (icon = 'person') : (icon = 'person-outline');
  }
  return icon;
};

/**
 * Get a screen/actionbar(for android) background
 * 
 * @param pathname screen pathname
 * @returns background of the screen
 */
export function getScreenColor(pathname: string) {
  let color = "#c8c0ff";

  if (pathname.includes("/article/")) {
    color = "#bfecff";
  } else if (pathname.includes("prayer")) {
    color = "#f2f8fc";
  } else if (pathname.includes("bookmark")) {
    color = "#ceffd3";
  } else if(pathname.includes("games")) {
    color = "#f2f7bd";
  }

  return color;
}

/**
 * Generate a key for keextractor of a <Flatlist /> based on common data
 * 
 * @param prefix prefix of the new key
 * @param idName name of the prop to extract a unique value from
 * @returns new key based on the prefix
 */
const keyExtractor = (prefix: string, idName = "id") => {
  return (item: any, index: number) => `kx-${prefix}-${item?.[idName]}-${index.toString()}`
};
export default keyExtractor;