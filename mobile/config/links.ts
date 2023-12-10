const isProductionEnv = process.env.NODE_ENV === "production";
const domain = isProductionEnv
  ? "https://dachu-app-api.zzenz.workers.dev"
  : "http://localhost:8787"; // you can change this to your LAN IP address
const globalLinks = {
  home: `${domain}/home`,
  article: `${domain}/article`,
};

export default globalLinks;