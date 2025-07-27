/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    deviceSizes: [425, 900, 1400],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "wordpress.carevita.co.za",
        port: "",
        pathname: "/wp-content/**",
      },
    ],
  },
};
