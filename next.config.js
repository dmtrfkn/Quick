/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ['localhost'],
  },
  audios: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
