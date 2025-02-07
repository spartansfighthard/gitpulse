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
        'better-sqlite3': false
      };
    }
    
    // Add node-gyp-build to externals
    config.externals = [
      ...(config.externals || []),
      { ws: 'ws' },
      'better-sqlite3',
      'node-gyp-build'
    ];
    
    return config;
  },
  transpilePackages: [
    '@solana/wallet-adapter-react-ui',
    '@solana/web3.js',
    '@solana/pay',
    '@solana/wallet-adapter-base',
    '@solana/wallet-adapter-react',
    '@solana/wallet-adapter-wallets'
  ],
  experimental: {
    serverActions: true,
  }
};

module.exports = nextConfig; 