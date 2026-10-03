const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/mmt-portfolio" : "",
  },

  ...(isGithubPages
    ? {
        basePath: "/mmt-portfolio",
        assetPrefix: "/mmt-portfolio/",
      }
    : {}),

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;