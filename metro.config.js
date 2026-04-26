const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const config = getDefaultConfig(__dirname);

// Add 'md' to asset extensions so Expo imports it as a static asset wrapper.
if (!config.resolver.assetExts.includes('md')) {
  config.resolver.assetExts.push('md');
}

module.exports = withNativeWind(config, { input: "./src/styles/global.css" });
