/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  // Quick error handling that shows the user all topics for a borough even though they didn't go on that url
  async rewrites() {
    return [
      {
        source: "/:location",
        destination: "/:location/topic/All",
      },
    ];
  },
  // Adds html lang attribute
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
