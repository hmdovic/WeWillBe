import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so this deploys to GitHub Pages (wewillbe.store via CNAME)
  // with zero server. If this ever moves to Vercel/Netlify instead, this
  // whole block can just be deleted — those platforms run Next.js natively.
  output: "export",
  images: {
    // No image-optimization server available under static export.
    // Source images are already pre-sized/compressed in public/images.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
