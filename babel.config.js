module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: "./src",
          alias: {
            "@components": "./src/components",
            "@shared": "./src/shared",
            "@api": "./src/api",
            "@consts": "./src/consts",
            "@utils": "./src/utils",
            "@screens": "./src/screens",
          },
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".json",
            ".tsx",
            ".ts",
            ".jsx",
          ],
        },
      ],
    ],
  };
};
