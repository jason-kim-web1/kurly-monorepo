/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withImages = require('next-images');
const withTM = require('next-transpile-modules')([
  'sweetalert2',
  'pino',
  'yup',
  'nanoid',
  '@thefarmersfront/kpds-tokens',
  '@thefarmersfront/kpds-css',
  '@thefarmersfront/kpds-react',
]);
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_PUBLIC_ANALYZE_BUNDLE === 'true',
});

const STAGE_PRODUCTION = 'production';
const STAGE = process.env.NEXT_PUBLIC_STAGE;
const isProduction = STAGE === STAGE_PRODUCTION;
const productionAppVersion = process.env.APP_VERSION;

console.log(`NEXT_PUBLIC_STAGE = ${STAGE}`);
console.log(`APP_VERSION = ${productionAppVersion}`);

/**
 * @type {import('next').NextConfig}
 */
const baseConfig = {
  images: {
    disableStaticImages: true,
  },
  assetPrefix: isProduction ? `https://res.kurly.com/v/${productionAppVersion}` : undefined,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
      {
        source: '/beauty',
        destination: '/main/beauty',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    // 애플의 apple-app-site-association 의 경우 json이 붙어서 오지 않으며, .well-known 이 없는 경우도 있다고 한다
    return [
      {
        source: '/.well-known/apple-app-site-association',
        destination: '/.well-known/apple-app-site-association.json',
      },
      {
        source: '/apple-app-site-association',
        destination: '/.well-known/apple-app-site-association.json',
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  experimental: {
    outputStandalone: true,
  },
};

const imagesConfig = {
  esModule: true,
};

const tmConfig = {};

const pwaConfig = {
  pwa: {
    dest: 'public',
    sw: 'service-worker.js',
  },
};

const plugins = [
  [withPWA, pwaConfig],
  [withTM, tmConfig],
  [withImages, imagesConfig],
];

if (isProduction || process.env.NEXT_PUBLIC_ENABLE_SENTRY_IN_NON_PRODUCTION === 'true') {
  const sentryWebpackPluginOptions = {
    errorHandler: (error) => console.log(error),
    silent: true,
    org: 'marketkurly',
    project: 'kurlymall-nx',
  };
  const sentryOptions = {
    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,
    // Hides source maps from generated client bundles
    hideSourceMaps: true,
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  };
  plugins.push((nextConfig) => withSentryConfig(nextConfig, sentryWebpackPluginOptions, sentryOptions));
}

if (!isProduction) {
  plugins.push([withBundleAnalyzer]);
}

const nextConfigWithPlugins = withPlugins(plugins, baseConfig);

module.exports = nextConfigWithPlugins;
