/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export a static site (no server function)
  output: "export",

  // Next/Image needs this when exporting static HTML
  images: { unoptimized: true }
};

module.exports = nextConfig;
