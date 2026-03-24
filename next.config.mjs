/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Permite abrir el dev server desde el celular/tablet en la misma red (LAN).
  // Sin esto, Next 16 puede devolver 403 en /_next/* al usar http://192.168.x.x:3000
  allowedDevOrigins: [
    '192.168.*.*',
    '10.*.*.*',
  ],
}

export default nextConfig
