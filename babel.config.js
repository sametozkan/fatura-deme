module.exports = function (api) {
  // This caches the Babel config by environment.
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
  };
};