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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig; 