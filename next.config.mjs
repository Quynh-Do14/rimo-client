/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['giphy.com', 'media.giphy.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'autofusion.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'autofusion.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: '103.130.213.26',
        port: '8000',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'api.autofusion.vn',
        pathname: '/api/uploads/**'
      }
    ]
  },
  reactStrictMode: true, // Khuyến nghị bật chế độ strict mode
  swcMinify: true // Bật SWC để tối ưu hóa build
}

export default nextConfig
