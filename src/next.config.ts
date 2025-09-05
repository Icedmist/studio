
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    allowedDevOrigins: ["*.cloudworkstations.dev"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // No images configured, as per user request to disable image handling
  images: {},
  webpack: (config, { isServer }) => {
    // Genkit uses Handlebars, which in turn uses a feature not supported by
    // Webpack. We mark it as external to avoid this error.
    if (isServer) {
      config.externals.push('handlebars');
    }
    return config;
  },
};

export default nextConfig;
