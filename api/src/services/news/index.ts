import { Context } from "hono";
import getRocketsNews from "./rockets";
import getCelticsNews from "./celtics";
import getLfcNews from "./lfc";
import { handleAllSettledResults } from "../../utils/promises";

/**
 * 
 * @param req user request
 * @returns 
 */
export async function getNews(req: Context["req"]) {
  const response = await Promise.allSettled([
    getRocketsNews(req),
    getCelticsNews(),
    getLfcNews(req)
  ]);

  const [rockets, celtics, lfc] = handleAllSettledResults(response);

  return {
    rockets,
    celtics,
    lfc
  };
}