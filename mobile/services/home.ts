import globalLinks from "../config/links";
import httpRequest from "../helpers/http";

export async function getHomeData() {
  const res = await httpRequest({
    url: globalLinks.home
  });

  return res;
}