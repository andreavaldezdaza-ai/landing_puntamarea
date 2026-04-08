"use client"

import Image from "next/image"

export function InvestmentBanner() {
  return (
    <section
      className="relative w-full aspect-[4/5] sm:aspect-video md:aspect-[21/9] overflow-hidden"
      aria-label="Puntamarea — sección de marca"
    >
      {/* ── Background image (reemplaza bg-fixed que falla en iOS Safari) ── */}
      <Image
        src="/renders/RENDER FINAL 15.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover md:[transform:translateZ(0)]"
      />

      {/* ── Overlay ── */}
      <div className="absolute inset-0 bg-brown/45 md:bg-brown/40" />

      {/* ── Centered Content ── */}
      <div className="relative flex h-full flex-col items-center justify-center gap-5 md:gap-6 px-6 text-center">

        {/* Logo — protagonista */}
        <Image
          src="/logo-puntamarea-tight.png"
          alt="Puntamarea"
          width={600}
          height={335}
          priority
          className="h-auto w-[260px] sm:w-[280px] md:w-[240px] lg:w-[280px] object-contain drop-shadow-xl"
        />

        {/* Overline — sans, light */}
        <p className="mt-1 font-sans text-[11px] sm:text-xs font-light tracking-[0.22em] sm:tracking-[0.25em] text-white/95 md:text-sm max-w-xs md:max-w-none">
          Naturaleza, exclusividad y visión
        </p>

        {/* Main line — serif italic */}
        <p className="font-serif text-3xl sm:text-4xl font-light italic text-white md:text-4xl lg:text-5xl">
          en un solo lugar
        </p>

      </div>
    </section>
  )
}
