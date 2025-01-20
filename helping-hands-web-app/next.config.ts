import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },

        {
            protocol: 'https',
            hostname: 'static.vecteezy.com',
        }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://helping-hand-backend.vercel.app/:path*', // Replace with your backend domain
      },
    ];
  },
};

export default nextConfig;
