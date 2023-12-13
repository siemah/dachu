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