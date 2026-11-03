import type { NextConfig } from "next";

// Static export for GitHub Pages on the custom domain rusith.dev (no basePath).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
