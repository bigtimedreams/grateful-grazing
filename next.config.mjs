// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // tell Next to emit a static site into /out on `next build`
  output: 'export',

  // required when exporting and using <Image>
  images: { unoptimized: true },

  // makes URLs like /thank-you/ map to /out/thank-you/index.html
  trailingSlash: true,
};

export default nextConfig;
