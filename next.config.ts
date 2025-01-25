import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // untuk Google profile images
      "graph.facebook.com", // untuk Facebook profile images
      "platform-lookaside.fbsbx.com", // untuk Facebook profile images alternatif
      "ik.imagekit.io",
    ],
  },
};

export default nextConfig;
