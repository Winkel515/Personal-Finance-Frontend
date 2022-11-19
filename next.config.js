/** @type {import('next').NextConfig} */
require('dotenv-defaults/config');

const dest = process.env.SERVER_URL || 'http://localhost:8080';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
