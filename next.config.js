/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint hatalarının build sürecini durdurmadığından emin olalım
    ignoreDuringBuilds: true,
  },
  // Typescript hatalarını da görmezden gelelim
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig; 