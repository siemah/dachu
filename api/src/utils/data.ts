/**
 * Extract and format games from onefootball.com
 * 
 * @param containers contains games details 
 * @returns list of games
 */
export function extractGamesFromOnefootball(containers: any[]) {
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

/**
 * Extract and format games from si.com
 * 
 * @param prop contains games details 
 * @returns list of games
 */
export function extractGamesFromSI([{ data: { matches } }]: any[]) {
  let gamesResults = [];

  Object.keys(matches).forEach((key): any => {
    const { _id, _dt, teams, result } = matches[key];
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