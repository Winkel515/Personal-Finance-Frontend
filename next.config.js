/** @type {import('next').NextConfig} */
require('dotenv-defaults/config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.SERVER_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
