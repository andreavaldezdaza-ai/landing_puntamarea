/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },
  // Permite abrir el dev server desde el celular/tablet en la misma red (LAN).
  // Sin esto, Next 16 puede devolver 403 en /_next/* al usar http://192.168.x.x:3000
  allowedDevOrigins: [
    '192.168.*.*',
    '10.*.*.*',
  ],
}

export default nextConfig
