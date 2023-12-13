import { useQuery } from "react-query";
import httpRequest from "../helpers/http";
import { useEffect } from "react";
import globalLinks from "../config/links";

type UsePrayerTimes = {
  latitude: number;
  longitude: number;
};

type Result = {
  name: string;
  time: string;
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
  return async () => {
    const response = await httpRequest<Result[]>({
      url: `${globalLinks.prayerTimes}?latitude=${config?.latitude}&longitude=${config?.longitude}`
    });

    return response;
  };
}

export function usePrayerTimes(config?: UsePrayerTimes) {
  const query = useQuery<any, unknown, Result[]>({
    queryKey: `prayer-times`,
    queryFn: getPrayerTimes(config),
    enabled: false
  });
  const data = query.data ?? [];

  useEffect(() => {
    if (config?.latitude !== undefined && config?.longitude !== undefined) {
      query.refetch({
        queryKey: `prayer-times`,
      });
    }
  }, [config]);

  return [{
    loading: query.isFetching,
    data
  }] as const;
}