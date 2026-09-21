import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // §10 / D10 — all photography is Picsum grayscale placeholders, deterministic per seed.
    // Pattern is pinned to the exact path shape and query PlaceholderImage builds, rather
    // than allowing the whole host: omitting `pathname`/`search` implies `**` and would let
    // arbitrary URLs through our optimiser.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/seed/**",
        search: "?grayscale",
      },
    ],
  },
};

export default nextConfig;
