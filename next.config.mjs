/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cấu hình headers riêng
  async headers () {
    return [
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Signal',
            value: 'search=yes, ai-train=no' // Giá trị bạn muốn
          },
          {
            key: 'X-Robots-Tag',
            value: 'all'
          }
        ]
      },
      // Có thể thêm các headers cho paths khác
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all'
          }
        ]
      }
    ]
  },

  // Cấu hình images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'giphy.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'rimo.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'rimo.vn',
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
        hostname: 'api.rimo.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**'
      }
    ]
  },

  reactStrictMode: true,
  swcMinify: true
}

export default nextConfig
