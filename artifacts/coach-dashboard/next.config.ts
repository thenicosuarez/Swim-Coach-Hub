import type { NextConfig } from "next";

const rawBasePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  basePath: rawBasePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: rawBasePath,
  },
};

export default nextConfig;
