
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                jpeg: { quality: 80 },
                png: { quality: 80 },
                webp: { quality: 80 },
              },
            },
          },
        })
      );

      return webpackConfig;
    },
  },

  jest: {
    configure: (jestConfig) => {
      jestConfig.collectCoverageFrom = [
        "src/**/*.{js,jsx}",
        "!src/index.js",
        "!src/reportWebVitals.js",
      ];

      return jestConfig;
    },
  },
};
