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
    isFocused ? (icon = 'settings') : (icon = 'settings-outline');
  } else if (index === 2) {
    isFocused ? (icon = 'pricetags') : (icon = 'pricetags-outline');
  } else if (index === 3) {
    isFocused ? (icon = 'search') : (icon = 'search-outline');
  } else if (index === 4) {
    isFocused ? (icon = 'albums') : (icon = 'albums-outline');
  } else if (index === 5) {
    isFocused ? (icon = 'person') : (icon = 'person-outline');
  }
  return icon;
};