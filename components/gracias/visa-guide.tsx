"use client"

import Image from "next/image"

const PDF_URL = process.env.NEXT_PUBLIC_VISA_GUIDE_URL || "/guia-visa-puntamarea.pdf"

export function VisaGuide() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573108125075"
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hola, me interesa aplicar a la Visa de Inversionista con una residencia en PUNTAMAREA. Quisiera agendar una asesoría."
  )}`

  return (
    <div className="relative overflow-hidden bg-sand-deep">

      {/* Decorative roseta */}
      <div
        className="pointer-events-none absolute -right-20 top-20 h-[420px] w-[420px] opacity-[0.035] md:-right-32 md:h-[620px] md:w-[620px]"
        style={{
          maskImage: "url(/puntamarea-mark.png)",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "contain",
          WebkitMaskImage: "url(/puntamarea-mark.png)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
          backgroundColor: "#66523c",
        }}
      />

      <div className="relative px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="mb-10 text-center md:mb-12">
            <h2 className="mb-5 font-sans text-[26px] font-light leading-[1.1] text-viveloo-black md:text-4xl lg:text-5xl">
              Vivir en Colombia,{" "}
              <span className="font-serif italic font-normal text-viveloo-brown lowercase">
                legalmente.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl font-sans text-sm font-light leading-relaxed text-caramel/75 md:text-base">
              Adquirir una residencia en PUNTAMAREA abre la puerta a la Visa de Inversionista Inmobiliario que otorga el Estado colombiano. Residencia legal, renovable, con ruta directa a la residencia permanente.
            </p>
          </div>

          {/* Banner image horizontal */}
          <div className="relative mb-10 h-[200px] w-full overflow-hidden md:mb-12 md:h-[260px]">
            <Image
              src="/renders/RENDER FINAL 18.jpg"
              alt="Residencia PUNTAMAREA en Barú"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-viveloo-brown/75 via-viveloo-brown/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 md:px-8 md:pb-7">
              <p className="mb-2 font-sans text-[10px] font-semibold tracking-[0.3em] text-white/80 uppercase md:text-[11px]">
                Tu residencia en Barú
              </p>
              <p className="font-serif text-xl font-light leading-tight text-white md:text-2xl">
                Una propiedad. Un estilo de vida.{" "}
                <span className="italic">una visa.</span>
              </p>
            </div>
          </div>

          {/* Cards stack */}
          <div className="mb-10 grid gap-px bg-viveloo-taupe/20 md:mb-12">

            <VisaCard
              num="01"
              title="Visa M Inversionista Inmobiliario"
              body="Permite vivir en Colombia mientras eres propietario de tu residencia. Vigencia hasta tres años, renovable. Aplica para extranjeros de cualquier nacionalidad que adquieran inmueble a nombre propio y registren la inversión ante el Banco de la República."
              pills={["Renovable hasta 3 años", "Cualquier nacionalidad", "Cónyuge e hijos incluidos"]}
            />

            <VisaCard
              num="02"
              title="Inversión mínima 2026"
              body="La normativa exige una inversión inmobiliaria equivalente a 350 salarios mínimos mensuales, lo que en 2026 representa aproximadamente USD $161.000. Los tickets superiores de PUNTAMAREA cumplen el umbral, y es posible consolidar varias unidades para alcanzarlo."
              pills={["COP $612.816.750", "≈ USD $161.300", "Resolución 5477 / 2022"]}
            />

            <VisaCard
              num="03"
              title="Camino a la Residencia Permanente"
              body="Tras cinco años continuos como titular de la Visa M Inversionista, puedes aplicar a la Visa R de Residente. Permanencia indefinida, sin trámites de renovación, con derecho a trabajar y estudiar sin restricciones."
              pills={["5 años acumulados", "Visa R indefinida", "Ruta a ciudadanía"]}
            />

          </div>

        {/* CTA block */}
        <div className="border-t border-viveloo-taupe/20 pt-10 md:pt-14">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
            <div className="text-center md:text-left">
              <p className="mb-3 font-sans text-[10px] font-semibold tracking-[0.3em] text-viveloo-taupe uppercase md:text-[11px]">
                Nota Importante
              </p>
              <p className="mx-auto max-w-xl font-sans text-sm font-light leading-relaxed text-caramel/75 md:mx-0 md:text-base">
                Esta guía es informativa. El trámite debe realizarse con un asesor migratorio certificado que valide tu caso particular. En tu cita privada conectamos con nuestra firma aliada, sin costo adicional.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto md:min-w-[320px]">
              <a
                href={PDF_URL}
                download
                className="inline-flex w-full items-center justify-center gap-3 bg-viveloo-taupe px-8 py-4 font-sans text-xs font-semibold tracking-[0.2em] text-white uppercase transition-all hover:bg-viveloo-brown"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2v13M7 11l5 5 5-5M4 20h16" />
                </svg>
                Descargar Guía Completa
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 border border-viveloo-taupe/40 px-8 py-4 font-sans text-xs font-semibold tracking-[0.2em] text-viveloo-taupe uppercase transition-all hover:border-viveloo-taupe hover:bg-viveloo-taupe/5"
              >
                Agendar asesoría migratoria
              </a>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}

function VisaCard({
  num,
  title,
  body,
  pills,
}: {
  num: string
  title: string
  body: string
  pills: string[]
}) {
  return (
    <div className="bg-sand-deep p-6 md:p-10">
      <div className="flex items-start gap-5 md:gap-8">
        <span className="shrink-0 font-serif text-3xl italic font-light text-viveloo-taupe md:text-4xl">
          {num}
        </span>
        <div className="flex-1">
          <h3 className="mb-3 font-sans text-xl font-light leading-tight text-viveloo-black md:text-2xl">
            {title}
          </h3>
          <p className="mb-5 font-sans text-sm font-light leading-relaxed text-caramel/80 md:text-[15px]">
            {body}
          </p>
          <div className="flex flex-wrap gap-2">
            {pills.map((p) => (
              <span
                key={p}
                className="inline-flex items-center border border-viveloo-taupe/30 bg-white/50 px-3 py-1 font-sans text-[10px] font-medium tracking-[0.1em] text-viveloo-brown uppercase"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
