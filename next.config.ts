import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    const securityHeaders = [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=()',
      },
      {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin',
      },
      {
        key: 'Cross-Origin-Resource-Policy',
        value: 'same-origin',
      },
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      ...(isProd
        ? [
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains; preload',
            },
          ]
        : []),
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "object-src 'none'",
          "img-src 'self' data: https:",
          "font-src 'self' data: https:",
          "style-src 'self' 'unsafe-inline' https:",
          `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"} https:`,
          "connect-src 'self' https:",
          ...(isProd ? ['upgrade-insecure-requests'] : []),
        ].join('; '),
      },
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable',
          },
        ],
      },
      {
        source: '/:file(.*\\.html)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
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
