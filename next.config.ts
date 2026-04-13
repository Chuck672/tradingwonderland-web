import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async rewrites() {
    return [
      {
        source: '/resources/priceaction-course',
        destination: '/priceaction_course.html',
      },
      {
        source: '/resources/volumeprofile-course',
        destination: '/volumeprofile_course.html',
      },
      {
        source: '/resources/priceaction-manual',
        destination: '/priceaction_manual.html',
      },
      {
        source: '/resources/tradingsystem',
        destination: '/tradingsystemv2p0.html',
      },
      {
        source: '/resources/trading-journal',
        destination: '/trading-journal.html',
      },
      {
        source: '/resources/pretrade-checklist',
        destination: '/pretrade-checklist.html',
      },
    ];
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
  },
//  generateBuildId: async () => {
//    // Generate a unique build ID based on timestamp to force cache invalidation on deployment
//    return `build-${Date.now()}`;
//  },
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
