import httpRequest from "../utils/http";

/**
 * Get prayer time using externel api
 * 
 * @param config contains user coordinates
 * @returns current day prayer times
 */
export async function getPrayerTimes(config: Record<string, string>) {
  const response = await httpRequest({
    url: `https://islamicfinder.us/index.php/api/prayer_times?latitude=${config?.latitude}&longitude=${config?.longitude}&timezone=Africa/Algiers&method=5&juristic=Maliki&time_format=0`
  });
  let prayerTimes = [];

  if (response?.results) {
    prayerTimes = Object.entries(response.results)
      .map(([name, time]) => ({
        name: name.toLocaleLowerCase(),
        time
      }));
  }

  return prayerTimes;
}