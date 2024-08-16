import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // or http
        hostname: "localhost", // if your website has no www, drop it
      },
    ],
},
};

export default nextConfig;
