import { extractGamesFromOnefootball, extractGamesFromSI } from "../utils/data";
import httpRequest from "../utils/http";
import { handleAllSettledResults } from "../utils/promises";

/**
 * Get games of LFC, rockets and celtics
 * @returns list of games
 */
export async function getGames() {
  const response = await Promise.allSettled([
    // LFC games
    httpRequest({
      url: "https://onefootball.com/_next/data/b32256f6afd2/en/team/liverpool-18/fixtures.json?team-id=liverpool-18&entity-page=fixtures"
    }),
    // rockets games
    httpRequest({
      url: "https://uswidgets.fn.sportradar.com/sportradarmlb/en_us/Etc:UTC/gismo/livescore_season_teamfixtures/106289/3412"
    }),
    // celtics games
    httpRequest({
      url: "https://uswidgets.fn.sportradar.com/sportradarmlb/en_us/Etc:UTC/gismo/livescore_season_teamfixtures/106289/3422"
    })
  ]);
  const [
    { pageProps: { containers: lfcContainer } },
    { doc: rocketsDoc },
    { doc: celticssDoc }
  ] = handleAllSettledResults(response);

  return {
    lfc: extractGamesFromOnefootball(lfcContainer),
    rockets: extractGamesFromSI(rocketsDoc),
    celtics: extractGamesFromSI(celticssDoc),
  }
}