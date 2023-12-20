import globalLinks from "../config/links";
import httpRequest from "../helpers/http";

export async function getGames() {
  const res = await httpRequest({
    url: globalLinks.games
  });

  return res;
}