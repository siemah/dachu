
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  // Adds support for framer-motion
  "mjs"
);

config.resolver.assetExts.push(
  "cjs"
);


module.exports = config;