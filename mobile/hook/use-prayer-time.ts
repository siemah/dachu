import { useQuery } from "react-query";
import httpRequest from "../helpers/http";
import { useEffect } from "react";

type UsePrayerTimes = {
  latitude: number;
  longitude: number;
};

type Result = {
  results: Record<string, string>;
  success: boolean
}

/**
 * Get prayer times of the day
 * 
 * @param config user gps coordinate
 * @returns prayer times of the current day
 * @see http://islamicfinder.us/index.php/api/index
 * @xample http://islamicfinder.us/index.php/api/prayer_times?latitude=36.410172&longitude=4.894720&timezone=Africa/Algiers&method=5&juristic=Maliki&time_format=0
 */
function getPrayerTimes(config: UsePrayerTimes) {
  return () => {
    const response = httpRequest({
      url: `http://islamicfinder.us/index.php/api/prayer_times?latitude=${config?.latitude}&longitude=${config?.longitude}&timezone=Africa/Algiers&method=5&juristic=Maliki&time_format=0`
    });

    return response;
  };
}

export function usePrayerTimes(config?: UsePrayerTimes) {
  const query = useQuery<any, unknown, Result>({
    queryKey: `prayer-times`,
    queryFn: getPrayerTimes(config),
    enabled: false
  });

  const data = typeof query.data === "object"
    ? Object
      .entries(query.data.results)
      .map(([name, time]) => ({
        name: name.toLocaleLowerCase(),
        time
      }))
    : [];

  useEffect(() => {
    if (config?.latitude !== undefined && config?.longitude !== undefined) {
      query.refetch();
    }
  }, [config])

  return [{
    loading: query.isFetching,
    data
  }] as const;
}