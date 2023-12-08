import Scraper from "./scraper";

/**
 * Initialize a new instance of a Scraper
 * 
 * @param req Received request
 * @returns an instance from the scraper
 */
export async function initScraper(req: Request, url: string) {
  const scraper = await (new Scraper()).fetch(
    url,
    {
      headers: req.headers
    }
  );
  return scraper;
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