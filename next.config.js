/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1400],
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "the-wright-designs-website-images.s3.af-south-1.amazonaws.com",
        port: "",
        pathname: "/carevita/**",
      },
      {
        protocol: "https",
        hostname:
          "the-wright-designs-website-images.s3.af-south-1.amazonaws.com",
        port: "",
        pathname: "/carevita-fit/**",
      },
      {
        protocol: "http",
        hostname: "wordpress.carevita.co.za",
        port: "",
        pathname: "/wp-content/**",
      },
    ],
  },
};
