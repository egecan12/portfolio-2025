/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint hatalarının build sürecini durdurmadığından emin olalım
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 