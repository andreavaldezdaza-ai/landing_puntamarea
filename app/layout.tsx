import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-5W347F4H"
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "2036629853904012"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://puntamarea.viveloo.co"

const TITLE = "PUNTAMAREA | Residencias de Lujo en Barú, Cartagena"
const DESCRIPTION = "209 residencias de lujo con más de 150 metros de playa privada en Barú, Colombia. ROI proyectado 29.9% en Año 1. Inversión exclusiva Viveloo. Fase 1 en lanzamiento."
const SHORT_DESCRIPTION = "209 residencias de lujo frente al mar en Barú. ROI proyectado 29.9% Año 1. Inversión exclusiva Viveloo."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'residencias de lujo Barú',
    'inversión inmobiliaria Cartagena',
    'Puntamarea',
    'Viveloo',
    'playa privada Colombia',
    'ROI inmobiliario',
    'visa inversionista Colombia',
    'segunda vivienda Barú',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: TITLE,
    description: SHORT_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
    locale: 'es_CO',
    siteName: 'PUNTAMAREA',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SHORT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Viveloo Inmobiliaria' }],
  creator: 'Viveloo Inmobiliaria',
  publisher: 'Viveloo Inmobiliaria',
  category: 'real estate',
}

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#viveloo`,
      "name": "Viveloo Inmobiliaria",
      "url": "https://viveloo.co",
      "logo": `${SITE_URL}/logo-viveloo.png`,
      "sameAs": ["https://viveloo.co"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "PUNTAMAREA",
      "description": "Residencias de Lujo en Barú, Cartagena",
      "inLanguage": "es-CO",
      "publisher": { "@id": `${SITE_URL}/#viveloo` },
    },
    {
      "@type": ["RealEstateListing", "Residence"],
      "@id": `${SITE_URL}/#puntamarea`,
      "name": "PUNTAMAREA — Barú Residences",
      "description": "209 residencias de lujo frente al Caribe colombiano. Playa privada de 150 metros, amenidades de clase mundial y gestión por Ahead. Desarrollo exclusivo de Viveloo en Barú, a 45 minutos de Cartagena.",
      "url": SITE_URL,
      "numberOfRooms": 209,
      "image": [
        `${SITE_URL}/og-render-21.jpg`,
        `${SITE_URL}/renders/RENDER FINAL 2.png`,
        `${SITE_URL}/renders/RENDER FINAL 18.jpg`,
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Barú",
        "addressRegion": "Bolívar",
        "addressCountry": "CO",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 10.1167,
        "longitude": -75.6833,
      },
      "developer": { "@id": `${SITE_URL}/#viveloo` },
      "brand": { "@id": `${SITE_URL}/#viveloo` },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Playa privada de 150 metros" },
        { "@type": "LocationFeatureSpecification", "name": "Beach Club frente al mar" },
        { "@type": "LocationFeatureSpecification", "name": "Piscinas y amenidades" },
        { "@type": "LocationFeatureSpecification", "name": "Gestión hotelera por Ahead" },
      ],
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "COP",
        "lowPrice": "280000000",
        "highPrice": "1200000000",
        "offerCount": 209,
        "availability": "https://schema.org/LimitedAvailability",
        "seller": { "@id": `${SITE_URL}/#viveloo` },
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${montserrat.variable}`}>
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
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
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
