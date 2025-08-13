// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export pages to static HTML (fast, no giant server bundle)
  output: "export",

  // Next/Image in static export mode
  images: { unoptimized: true },
};

export default nextConfig;
