/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  async rewrites() {
    return [
      {
        source: "/:location",
        destination: "/:location/topic/All",
      },
    ];
  },
};
