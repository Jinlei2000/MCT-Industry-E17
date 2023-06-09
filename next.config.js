/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/jaar-e17-ai.appspot.com/o/**',
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200, 1440, 1920, 2048, 3840, 4096],
    imageSizes: [320, 420, 768, 1024, 1200, 1440, 1920, 2048, 3840, 4096],
  },
}

module.exports = nextConfig
