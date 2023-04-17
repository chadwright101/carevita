/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "the-wright-designs-website-images.s3.af-south-1.amazonaws.com",
        port: "",
        pathname: "/carevita/**",
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
