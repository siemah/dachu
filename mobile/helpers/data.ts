import he from 'he';

/**
 * Decode html entities to a charachter
 * 
 * @param encodedString string contain html entities
 * @returns decoded string by converting html entity to charachters
 */
export function decodeHTMLEntity(stringValue: null | string | undefined) {
  return he.decode(stringValue || "", {
    encodeEverything: true
  });
}

/**
 * Convert a string to a unique number
 * 
 * @param inputString the string to convert to a number
 * @returns a unique number based on a string
 */
export function stringToUniqueNumber(inputString) {
  let hash = 5381;

  for (let i = 0; i < inputString.length; i++) {
    hash = (hash * 33) ^ inputString.charCodeAt(i);
  }

  return hash >>> 0; // Ensure the result is an unsigned 32-bit integer
}