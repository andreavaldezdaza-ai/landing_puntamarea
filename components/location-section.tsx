"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView as useFramerInView, useScroll, useTransform } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"

type Stat = {
  label: string
  value: string
  prefix?: string
  suffix?: string
  target: number
  decimals?: number
  detail: string
}

const locations = [
  {
    key: "cartagena",
    heading: "Cartagena",
    subtitle: "El Hub del Lujo",
    description:
      "Asegura tu patrimonio en un destino que combina apreciación constante y una demanda turística excepcional. Puntamarea ocupa uno de los pocos frentes de mar disponibles con acceso directo.",
    image: "/cartagena.webp",
    stats: [
      { label: "Apreciación Récord", value: "12.7%", suffix: "%", target: 12.7, decimals: 1, detail: "Incremento anual promedio en propiedades frente al mar" },
      { label: "Demanda Premium",    value: "7.7M",  suffix: "M", target: 7.7,  decimals: 1, detail: "Pasajeros en 2025 consolidan a la ciudad como destino líder" },
      { label: "Hub Turístico",      value: "#1",    prefix: "#", target: 1,    decimals: 0, detail: "Mayor proyección para eventos de alto perfil en Colombia" },
    ] as Stat[],
  },
  {
    key: "baru",
    heading: "Isla Barú",
    subtitle: "La Isla en Transformación",
    description:
      "La inversión privada y pública más grande del Caribe colombiano. Un destino con infraestructura de clase mundial y conectividad privilegiada desde Cartagena.",
    image: "/baru.jpg",
    stats: [
      { label: "Inversión Masiva", value: "+$200M", prefix: "+$", suffix: "M", target: 200, decimals: 0, detail: "En infraestructura respaldado por Master Plan de Grupo Argos" },
      { label: "Conectividad",     value: "45 min", suffix: " min",            target: 45,  decimals: 0, detail: "Por vía terrestre desde Cartagena. 15 min acceso marítimo exclusivo" },
      { label: "Entorno Premium",  value: "×6",     prefix: "×",               target: 6,   decimals: 0, detail: "Cadenas hoteleras de ultra-lujo en el entorno inmediato" },
    ] as Stat[],
  },
]

/* Counter animado con requestAnimationFrame */
function useCountUp(target: number, trigger: boolean, decimals = 0, duration = 1600) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!trigger) return
    let rafId: number
    const start = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(target * ease(progress))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [trigger, target, duration])

  return value.toFixed(decimals)
}

/* Valor con counter (inline para el stat original) */
function AnimatedValue({ stat, trigger }: { stat: Stat; trigger: boolean }) {
  const display = useCountUp(stat.target, trigger, stat.decimals ?? 0)
  return <>{(stat.prefix ?? "") + display + (stat.suffix ?? "")}</>
}

/* Bloque individual con parallax de imagen + animación de textos */
function LocationBlock({ loc, index }: { loc: (typeof locations)[number]; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const inView = useFramerInView(blockRef, { once: true, margin: "-15% 0px" })

  // Parallax sutil: la imagen se desplaza mientras el bloque atraviesa el viewport
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  const reversed = index % 2 !== 0

  return (
    <div
      ref={blockRef}
      className={`flex flex-col gap-12 lg:gap-16 ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      {/* Imagen con parallax + reveal clip-path + hover zoom */}
      <motion.div
        ref={imageWrapRef}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        className="group relative aspect-[4/3] overflow-hidden rounded-[2px] md:w-1/2"
      >
        <motion.img
          src={loc.image}
          alt={loc.heading}
          style={{ y: imageY }}
          className="absolute inset-0 h-[112%] w-full object-cover transition-[transform,filter] duration-[1400ms] ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
        />
      </motion.div>

      {/* Contenido */}
      <div className="flex flex-col justify-between md:w-1/2 md:px-8 lg:px-12">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-serif italic text-viveloo-brown mb-4 capitalize"
          >
            {loc.heading}
          </motion.h2>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center rounded-full border border-viveloo-taupe/30 bg-viveloo-taupe/5 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-viveloo-brown mb-8"
          >
            {loc.subtitle}
          </motion.span>
        </div>

        {/* Stats con stagger + counter en los valores */}
        <div className="mt-10 space-y-0">
          {loc.stats.map((stat, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 + si * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group/stat relative border-t border-viveloo-taupe/20 py-5"
            >
              {/* Línea de acento izquierda que crece al entrar en viewport + hover */}
              <motion.span
                initial={{ width: 0 }}
                animate={inView ? { width: "40%" } : {}}
                transition={{ duration: 1, delay: 0.9 + si * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-px left-0 h-px bg-viveloo-brown transition-[width] duration-500 group-hover/stat:!w-full"
              />

              <h4 className="text-xl md:text-2xl font-sans text-viveloo-brown mb-1">
                {stat.label}
              </h4>
              <p className="text-sm md:text-base font-sans font-light text-viveloo-black/80 leading-relaxed">
                <span className="tabular-nums">
                  <AnimatedValue stat={stat} trigger={inView} />
                </span>
                {" — "}
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LocationSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="relative bg-sand py-24 lg:py-32"
      id="ubicacion"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Global Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 lg:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-light text-viveloo-black text-center">
            El valor de lo{" "}
            <span className="font-serif italic font-normal text-viveloo-brown lowercase">
              irrepetible.
            </span>
          </h2>
        </motion.div>

        {/* Alternating Location Blocks */}
        <div className="flex flex-col gap-24">
          {locations.map((loc, i) => (
            <LocationBlock key={loc.key} loc={loc} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 text-center"
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 bg-viveloo-taupe px-8 py-4 font-sans text-xs font-medium tracking-wide text-white uppercase transition-all duration-300 hover:bg-[#7a6852]"
          >
            Solicita tu análisis de inversión
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
