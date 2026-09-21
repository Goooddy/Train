import type { NextConfig } from "next";

/**
 * GitHub Pages serves static files from a subpath (/Train/) and has no image
 * optimiser, so the Pages build differs from the local one. It is gated behind
 * an env var rather than applied always — a basePath would break local dev,
 * where the site is served from the root.
 *
 * Set by .github/workflows/deploy.yml.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "Train";

const nextConfig: NextConfig = {
  images: {
    /*
     * No optimiser on Pages, so images are served as authored. This also
     * removes the server-side fetch to Picsum that was timing out and taking
     * images down on mobile — the browser now fetches them directly.
     */
    unoptimized: isPages,
    // §10 / D10 — photography is Picsum grayscale placeholders, deterministic
    // per seed. Pinned to the exact path shape and query PlaceholderImage
    // builds: omitting `pathname`/`search` implies `**` and would let
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

  ...(isPages
    ? {
        output: "export" as const,
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        // Pages resolves /path/ to /path/index.html; without this, routes
        // other than the homepage 404.
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
