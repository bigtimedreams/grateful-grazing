/** @type {import('next').NextConfig} */
const nextConfig = {
  // This rewrite rule serves the admin panel's HTML file for the /admin route.
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },

  // This is the latest standard for configuring remote images.
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

module.exports = nextConfig;