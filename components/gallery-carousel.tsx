"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Image from "next/image"

const galleryImages = [
  { id: 1,  src: "/carrusel/RENDER FINAL 1.png",  caption: "Vista exterior — frente al Caribe" },
  { id: 2,  src: "/carrusel/RENDER FINAL 2.png",  caption: "Acceso y jardines tropicales" },
  { id: 3,  src: "/carrusel/RENDER FINAL 3.png",  caption: "Piscina principal — área social" },
  { id: 4,  src: "/carrusel/RENDER FINAL 5.png",  caption: "Playa privada — 150 metros lineales" },
  { id: 5,  src: "/carrusel/RENDER FINAL 6.jpg",  caption: "Terraza residencial — vista al mar" },
  { id: 6,  src: "/carrusel/RENDER FINAL 7.jpg",  caption: "Área de bienestar y spa" },
  { id: 7,  src: "/carrusel/RENDER FINAL 11.jpg", caption: "Beach Club & Restaurante" },
  { id: 8,  src: "/carrusel/RENDER FINAL 13.jpg", caption: "Lobby de acceso — arquitectura de autor" },
  { id: 9,  src: "/carrusel/RENDER FINAL 14.jpg", caption: "Sala de estar — Tipo D" },
  { id: 10, src: "/carrusel/RENDER FINAL 19.jpg", caption: "Atardecer desde la terraza" },
  { id: 11, src: "/carrusel/RENDER FINAL 25.jpg", caption: "Vegetación nativa y paisajismo" },
  { id: 12, src: "/carrusel/RENDER FINAL 30.jpg", caption: "Atardecer sobre el horizonte" },
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
    setCurrent(((index % total) + total) % total)
    setTimeout(() => setAnimating(false), 700)
  }, [animating, total])

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  // Autoplay
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 5000)
    return () => clearInterval(t)
  }, [paused, total])

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

  const leftIndex = (current - 1 + total) % total
  const rightIndex = (current + 1) % total

  return (
    <section
      className="relative bg-sand"
      aria-label="Galería de renders Puntamarea"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Section header ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-12 lg:pt-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-3 font-sans text-[10px] font-medium tracking-[0.4em] text-viveloo-taupe uppercase">
              La Visión
            </p>
            <h2 className="text-4xl font-sans font-light text-viveloo-black tracking-wide md:text-5xl lg:text-[3.5rem]">
              Espacios que <span className="font-serif italic font-normal text-viveloo-brown lowercase">inspiran</span>
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

      {/* ── Stage horizontal — 3 imágenes (mobile: 1) ────────────── */}
      <div
        className="relative mx-auto w-full max-w-[1400px] px-4 lg:px-16"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (diff > 50) next()
          else if (diff < -50) prev()
        }}
      >
        <div className="flex items-center justify-center gap-3 md:gap-5">
          {/* ── Imagen izquierda — solo desktop ── */}
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="hidden md:block relative w-[26%] aspect-[4/3] overflow-hidden rounded-[6px] opacity-65 hover:opacity-95 transition-all duration-700 cursor-pointer"
          >
            <Image
              src={galleryImages[leftIndex].src}
              alt={galleryImages[leftIndex].caption}
              fill
              sizes="(max-width: 768px) 0vw, 26vw"
              quality={75}
              className="object-cover"
              draggable={false}
            />
          </button>

          {/* ── Imagen central — protagonista ── */}
          <div className="relative w-full md:w-[40%] aspect-[4/3] overflow-hidden rounded-[8px] shadow-xl shadow-viveloo-brown/15">
            {galleryImages.map((img, i) => (
              <Image
                key={img.id}
                src={img.src}
                alt={img.caption}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={80}
                loading={i === 0 ? "eager" : "lazy"}
                className={`object-cover transition-opacity duration-700 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
              />
            ))}
            {/* Subtle bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-viveloo-black/35 to-transparent pointer-events-none" />
          </div>

          {/* ── Imagen derecha — solo desktop ── */}
          <button
            onClick={next}
            aria-label="Siguiente imagen"
            className="hidden md:block relative w-[26%] aspect-[4/3] overflow-hidden rounded-[6px] opacity-65 hover:opacity-95 transition-all duration-700 cursor-pointer"
          >
            <Image
              src={galleryImages[rightIndex].src}
              alt={galleryImages[rightIndex].caption}
              fill
              sizes="(max-width: 768px) 0vw, 26vw"
              quality={75}
              className="object-cover"
              draggable={false}
            />
          </button>
        </div>

        {/* ── Flechas flotantes — desktop ── */}
        <button
          onClick={prev}
          aria-label="Imagen anterior"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center bg-sand/90 backdrop-blur-sm border border-viveloo-taupe/30 hover:border-viveloo-taupe hover:bg-sand transition-all duration-300 group"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-viveloo-brown group-hover:text-viveloo-taupe transition-colors">
            <path d="M10 2L4 8l6 6" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Siguiente imagen"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center bg-sand/90 backdrop-blur-sm border border-viveloo-taupe/30 hover:border-viveloo-taupe hover:bg-sand transition-all duration-300 group"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-viveloo-brown group-hover:text-viveloo-taupe transition-colors">
            <path d="M6 2l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* ── Caption + Controls ───────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-20 lg:px-12 lg:pb-24">
        <div className="flex flex-col items-center gap-6">
          {/* Mobile arrows */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center border border-viveloo-taupe/30 hover:border-viveloo-taupe transition-all duration-300"
              aria-label="Imagen anterior"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-viveloo-brown">
                <path d="M10 2L4 8l6 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center border border-viveloo-taupe/30 hover:border-viveloo-taupe transition-all duration-300"
              aria-label="Siguiente imagen"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-viveloo-brown">
                <path d="M6 2l6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-1 w-full max-w-md">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="group relative h-px flex-1 bg-caramel/20 transition-all duration-300"
                aria-label={`Imagen ${i + 1}`}
              >
                <span
                  className="absolute inset-y-0 left-0 bg-viveloo-taupe transition-all duration-500"
                  style={{ width: i === current ? "100%" : i < current ? "100%" : "0%" }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
