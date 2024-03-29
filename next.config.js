const nextPwaPlugin = require("next-pwa");

const withPWA = nextPwaPlugin({ dest: "public" });

module.exports = withPWA({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
});
