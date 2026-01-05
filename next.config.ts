import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    allowedDevOrigins: [
      'https://9000-firebase-studio-1767544180542.cluster-va5f6x3wzzh4stde63ddr3qgge.cloudworkstations.dev',
      'https://6000-firebase-studio-1767544180542.cluster-va5f6x3wzzh4stde63ddr3qgge.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
