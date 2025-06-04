import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 如果你的 GitHub Pages 不是在根域名，需要設定 basePath
  basePath: '/Wolke-demo-v0-1',
  assetPrefix: '/Wolke-demo-v0-1/',
};

export default nextConfig;
