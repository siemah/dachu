import httpRequest from "../utils/http";

function extractGamesFromOnefootbal(containers: any[]) {
  let games = containers[containers.length - 1]
    ?.type
    ?.fullWidth
    ?.component
    ?.contentType
    ?.matchCardsListsAppender
    ?.lists;
  const results = games.map(game => {
    const { sectionHeader: { subtitle: title }, matchCards } = game;
    const matches = matchCards.map(({ uiKey, competitionName, competitionLogo, kickoff, homeTeam, awayTeam, matchId, kickoffFormatted, kickoffTimeFormatted }) => ({
      id: matchId,
      uiKey,
      competition: {
        name: competitionName,
        image: competitionLogo?.path,
      },
      homeTeam: {
        name: homeTeam?.name,
        image: homeTeam?.image,
        score: homeTeam?.score,
      },
      awayTeam: {
        name: awayTeam?.name,
        image: awayTeam?.image,
        score: awayTeam?.score,
      },
      kickoff: {
        global: kickoff,
        formatted: kickoffFormatted,
        timeFormatted: kickoffTimeFormatted
      },
    }));
    return {
      title,
      matches
    }
  })

  return results;
}

function extractGamesFromSI([{ data: { matches } }]: any[]) {
  let gamesResults = [];

  Object.keys(matches).forEach((key): any => {
    const { _id, _dt, teams, result } = matches[key];
console.log(
  Object.keys(matches[key]),
  JSON.stringify(result,null,2))
    gamesResults.push({
      id: _id,
      uiKey: _id,
      competition: {
        name: "Regular season",
        image: "https://duckduckgo.com/i/77f82172.png"
      },
      kickoff: {
        global: `${_dt?.date}`,
        formatted: `${_dt?.date}`,
        timeFormatted: _dt?.time
      },
      homeTeam: {
        name: teams?.home?.mediumname,
        image: `https://img.sportradar.com/ls/crest/medium/${teams?.home?.uid}.png`,
        score: result?.home,
      },
      awayTeam: {
        name: teams?.away?.mediumname,
        image: `https://img.sportradar.com/ls/crest/medium/${teams?.away?.uid}.png`,
        score: result?.away,
      },
    });
  });

  return gamesResults;
}

export async function getGames() {
  // todo: start with LFC
  const { pageProps: { containers: lfcContainer } } = await httpRequest({
    url: "https://onefootball.com/_next/data/b32256f6afd2/en/team/liverpool-18/fixtures.json?team-id=liverpool-18&entity-page=fixtures"
  });
  // todo: rockets games
  const { doc: rocketsDoc } = await httpRequest({
    url: "https://uswidgets.fn.sportradar.com/sportradarmlb/en_us/Etc:UTC/gismo/livescore_season_teamfixtures/106289/3412"
  });
  const { doc: celticssDoc } = await httpRequest({
    url: "https://uswidgets.fn.sportradar.com/sportradarmlb/en_us/Etc:UTC/gismo/livescore_season_teamfixtures/106289/3422"
  })
  return {
    lfc: extractGamesFromOnefootbal(lfcContainer),
    rockets: extractGamesFromSI(rocketsDoc),
    celtics: extractGamesFromSI(celticssDoc),
  }
}