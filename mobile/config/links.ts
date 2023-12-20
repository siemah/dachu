const isProductionEnv = process.env.NODE_ENV === "production";
const domain = isProductionEnv
  ? "https://dachu-app-api.zzenz.workers.dev"
  : "http://192.168.1.33:8787"; // you can change this to your LAN IP address
const globalLinks = {
  home: `${domain}/home`,
  games: `${domain}/games`,
  article: `${domain}/article`,
  prayerTimes: `${domain}/prayer`,
};

export default globalLinks;