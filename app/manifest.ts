import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PUNTAMAREA — Barú Residences",
    short_name: "PUNTAMAREA",
    description:
      "209 residencias de lujo frente al mar en Barú, Cartagena. Desarrollo exclusivo de Viveloo Inmobiliaria.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EC",
    theme_color: "#66523c",
    lang: "es-CO",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
