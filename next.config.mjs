// next.config.js

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 5000, // Delay before rebuilding
      };
    }
    return config;
  },
};
export default nextConfig;
