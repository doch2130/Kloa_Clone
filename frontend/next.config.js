/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_URL_DEV: `${process.env.NEXTAUTH_URL}`,
    API_URL_PROD: `${process.env.PRODUCTION_NEXTAUTH_URL}`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: 'https',
        hostname: 'cdn-lostark.game.onstove.com',
      }
    ],
  },
}

module.exports = nextConfig
