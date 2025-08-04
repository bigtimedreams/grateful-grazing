import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This rewrite rule is the fix for the /admin 404 error.
  // It tells Next.js to serve the admin panel's HTML file for the /admin route.
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },

  // This updates your existing image configuration to the latest standard.
  // The old `domains` config is deprecated.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
        port: '',
        pathname: '/**',
      },
      // You can add other domains here in the future if needed
    ],
  },
};

export default nextConfig;
