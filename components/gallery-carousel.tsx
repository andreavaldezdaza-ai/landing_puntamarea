"use client"

import { useState, useCallback, useEffect, useRef } from "react"

const galleryImages = [
  { id: 1,  src: "/renders/RENDER FINAL 14.jpg", caption: "Vista exterior — frente al Caribe" },
  { id: 2,  src: "/renders/RENDER FINAL 15.jpg", caption: "Acceso y jardines tropicales" },
  { id: 3,  src: "/renders/RENDER FINAL 16.jpg", caption: "Piscina principal — área social" },
  { id: 4,  src: "/renders/RENDER FINAL 17.jpg", caption: "Playa privada — 150 metros lineales" },
  { id: 5,  src: "/renders/RENDER FINAL 18.jpg", caption: "Terraza residencial — vista al mar" },
  { id: 6,  src: "/renders/RENDER FINAL 19.jpg", caption: "Área de bienestar y spa" },
  { id: 7,  src: "/renders/RENDER FINAL 20.jpg", caption: "Beach Club & Restaurante" },
  { id: 8,  src: "/renders/RENDER FINAL 21.jpg", caption: "Lobby de acceso — arquitectura de autor" },
  { id: 9,  src: "/renders/RENDER FINAL 22.jpg", caption: "Sala de estar — Tipo D" },
  { id: 10, src: "/renders/RENDER FINAL 23.jpg", caption: "Atardecer desde la terraza" },
]

export function GalleryCarousel() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(0)
  const total = galleryImages.length

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent((index + total) % total)
    setTimeout(() => setAnimating(false), 600)
  }, [animating, total])

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  // Autoplay
  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, next])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <section
      className="relative bg-sand"
      aria-label="Galería de renders Puntamarea"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Section header ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 lg:px-12 lg:pt-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-3 font-sans text-[10px] font-medium tracking-[0.4em] text-gold uppercase">
              La Visión
            </p>
            <h2 className="font-serif text-4xl font-light text-brown md:text-5xl lg:text-[3.5rem]">
              Espacios que <em>inspiran</em>
            </h2>
          </div>
          {/* Counter */}
          <div className="hidden items-baseline gap-1 md:flex">
            <span className="font-serif text-3xl font-light text-brown">
              {pad(current + 1)}
            </span>
            <span className="font-sans text-xs font-light text-caramel/50">
              / {pad(total)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main image — full width, no border radius ─────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "21/9" }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (diff > 50) next()
          else if (diff < -50) prev()
        }}
      >
        {galleryImages.map((img, i) => (
          <div
            key={img.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
            aria-hidden={i !== current}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="h-full w-full object-cover"
              draggable="false"
            />
            {/* Very subtle bottom gradient for caption legibility */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brown/30 to-transparent pointer-events-none" />
          </div>
        ))}

        {/* Caption overlay — bottom left */}
        <div className="absolute bottom-5 left-6 z-10 lg:left-12">
          <p className="font-sans text-[11px] font-light tracking-wide text-white/80">
            {galleryImages[current].caption}
          </p>
        </div>
      </div>

      {/* ── Controls row ─────────────────────────────────────────── */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">

        {/* Progress bar */}
        <div className="hidden flex-1 items-center gap-1 md:flex">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative h-px flex-1 bg-caramel/20 transition-all duration-300"
              aria-label={`Imagen ${i + 1}`}
            >
              <span
                className="absolute inset-y-0 left-0 bg-gold transition-all duration-500"
                style={{ width: i === current ? "100%" : i < current ? "100%" : "0%" }}
              />
            </button>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="flex flex-1 items-center justify-center gap-2 md:hidden">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 transition-all duration-300 ${
                i === current ? "w-6 bg-gold" : "w-1.5 bg-caramel/30"
              }`}
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow navigation — right side */}
        <div className="flex items-center gap-4 md:ml-10">
          <button
            onClick={prev}
            className="group flex h-11 w-11 items-center justify-center border border-caramel/30 transition-all duration-300 hover:border-gold"
            aria-label="Imagen anterior"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-caramel group-hover:text-gold transition-colors">
              <path d="M10 2L4 8l6 6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="group flex h-11 w-11 items-center justify-center border border-caramel/30 transition-all duration-300 hover:border-gold"
            aria-label="Siguiente imagen"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-caramel group-hover:text-gold transition-colors">
              <path d="M6 2l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
