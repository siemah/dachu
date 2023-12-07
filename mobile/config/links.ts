const isProductionEnv = process.env.NODE_ENV === "production";
const domain = isProductionEnv
  ? "http://localhost:8787"
  : "http://192.168.1.33:8787";
const globalLinks = {
  home: `${domain}/home`
};

export default globalLinks;