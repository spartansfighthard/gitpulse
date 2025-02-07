/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        path: false,
        'rpc-websockets': require.resolve('rpc-websockets')
      };
    }
    config.externals = [...(config.externals || []), 'ws'];
    return config;
  },
  transpilePackages: ['@solana/wallet-adapter-react-ui']
};

export default nextConfig; 