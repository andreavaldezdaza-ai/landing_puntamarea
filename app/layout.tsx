import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
  variable: "--font-sans"
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-5W347F4H"

export const metadata: Metadata = {
  title: 'PUNTAMAREA | Residencias de Lujo en Barú, Cartagena',
  description: '209 residencias de lujo con más de 150 metros de playa privada en Barú, Colombia. ROI proyectado 29.9% en Año 1. Inversión exclusiva Viveloo — Fase 1 en lanzamiento.',
  keywords: ['residencias de lujo Barú', 'inversión inmobiliaria Cartagena', 'Puntamarea', 'Viveloo', 'playa privada Colombia', 'ROI inmobiliario'],
  openGraph: {
    title: 'PUNTAMAREA | Residencias de Lujo en Barú, Cartagena',
    description: '209 residencias de lujo con más de 150 metros de playa privada en Barú. ROI proyectado 29.9%.',
    type: 'website',
    locale: 'es_CO',
    siteName: 'PUNTAMAREA',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "PUNTAMAREA — Residencias de Lujo en Barú",
  "description": "209 residencias de lujo frente al Caribe en Barú, Colombia. Playa privada de 150m. Operación hotelera por Ahead.",
  "url": "https://puntamarea.com",
  "numberOfRooms": "209",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Barú",
    "addressRegion": "Bolívar",
    "addressCountry": "CO"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "COP",
    "availability": "https://schema.org/LimitedAvailability"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* Google Tag Manager — lo más arriba posible; beforeInteractive evita problemas de hidratación */}
        <Script
          id="gtm-head"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
