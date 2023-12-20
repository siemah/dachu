import dayjs from "dayjs";
import { Game } from "../types/data";

/**
 * Extract remaining games
 * 
 * @param games list of games
 * @returns the remaining games
 * @note before using this function make sure that you imports all required dayjs plugins
 * @see https://day.js.org/docs/en/display/from-now#docsNav
 */
export function getRemainingGames(games: Game[] | undefined | null) {
  if (games === undefined || games === null) return [];

  const _res = games
    .sort((a, b) => a.kickoff.global - b.kickoff.global)
    .reduce((acc, game) => {
      const { global, timeFormatted } = game.kickoff;
      const gameTime = new Date(global);
      gameTime.setHours(gameTime.getHours());
      const withinADayMs = 48 * 3600 * 1000;
      gameTime.setTime(gameTime.getTime() + withinADayMs);
      const isBefore = dayjs().isBefore(dayjs(gameTime), "hours");

      return isBefore ? [...acc, game] : acc;
    }, []);

  return _res;
}