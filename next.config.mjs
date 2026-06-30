/** @type {import('next').NextConfig} */
const backUrl = process.env.NEXT_PUBLIC_BACK_URL || process.env.BACK_URL;
const remotePatterns = backUrl
  ? [
      {
        protocol: new URL(backUrl).protocol.replace(":", ""),
        hostname: new URL(backUrl).hostname,
        port: new URL(backUrl).port,
        pathname: "/**",
      },
    ]
  : [];

const nextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
