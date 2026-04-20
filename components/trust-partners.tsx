import Image from "next/image"

export function TrustPartners() {
  return (
    <section className="w-full py-20 md:py-28 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Title — dual typography matching landing pattern */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light text-viveloo-black mb-16 leading-tight text-center">
          Nuestros{" "}
          <span className="font-serif italic font-normal text-viveloo-brown lowercase">
            aliados.
          </span>
        </h2>

        {/* Partner Logos — optically balanced, unified visual weight */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-8 md:gap-16 w-full mb-12 max-w-4xl mx-auto px-6">
          <Image
            src="/logo-aliado-1.png"
            alt="Inspira Diseño & Construcción"
            width={200}
            height={200}
            className="order-2 md:order-1 h-14 md:h-20 w-auto object-contain filter grayscale brightness-0 opacity-50 hover:opacity-80 transition-all duration-300"
          />
          <Image
            src="/logo-aliado-2.png"
            alt="Viveloo Inmobiliaria"
            width={200}
            height={200}
            className="order-1 md:order-2 h-7 md:h-10 w-auto object-contain filter grayscale brightness-0 opacity-50 hover:opacity-80 transition-all duration-300"
          />
          <Image
            src="/logo-aliado-3.png"
            alt="Ahead"
            width={200}
            height={200}
            className="order-3 h-16 md:h-24 w-auto object-contain filter grayscale brightness-0 opacity-50 hover:opacity-80 transition-all duration-300"
          />
        </div>

        {/* Operational Text */}
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-sm md:text-base font-sans font-light text-gray-500 leading-relaxed">
            <strong className="font-medium text-gray-700">Gestión & Operación:</strong>{" "}
            Accede de forma voluntaria a nuestro operador aliado (Ahead). Una solución profesional para una inversión sin esfuerzo y retornos sostenibles.
          </p>
        </div>
      </div>
    </section>
  )
}
