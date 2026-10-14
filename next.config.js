/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'nyeras.com' },
      { hostname: 'www.nyeras.com' },
      { hostname: 'upload.wikimedia.org' },
      { hostname: 'encrypted-tbn0.gstatic.com' },
      { hostname: 'selfmadewebdesigner.com' },
      { hostname: 'jbprca.in' },
      { hostname: 'rzp.io' },
      { hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: '**.licdn.com' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' }
    ]
  },
  reactStrictMode: true,
  output: 'standalone',
  async headers() {
    return [
      {
        // Apply these headers to all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
  // For better debugging in production
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

// Add environment variable handling
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })
  module.exports = withBundleAnalyzer(nextConfig)
} else {
  module.exports = nextConfig
}
