import type { NextConfig } from "next";

const isGhPages = process.env.BUILD_TARGET === "gh-pages";
const repoName = "AIEGIS_RESEARCH";

const nextConfig: NextConfig = isGhPages
  ? {
      output: "export",
      basePath: `/${repoName}`,
      assetPrefix: `/${repoName}/`,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      output: "standalone",
    };

export default nextConfig;
