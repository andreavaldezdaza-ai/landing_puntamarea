import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import path from "path"

export const runtime = "nodejs"
export const alt = "PUNTAMAREA — Residencias de Lujo en Barú, Cartagena"
export const size = { width: 1200, height: 630 }
export const contentType = "image/jpeg"

// Cambia OG_RENDER a "og-render-9.jpg" para usar el render del balcón con palmeras
const OG_RENDER = "og-render-21.jpg"

export default async function OpengraphImage() {
  const imgPath = path.join(process.cwd(), "public", OG_RENDER)
  const imgBuffer = await readFile(imgPath)
  const imgBase64 = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background image */}
        <img
          src={imgBase64}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt=""
        />

        {/* Dark gradient overlay for contrast */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(17,17,17,0.15) 0%, rgba(17,17,17,0.35) 45%, rgba(102,82,60,0.85) 100%)",
            display: "flex",
          }}
        />

        {/* Top-right brand chip */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 48,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 20px",
            background: "rgba(17,17,17,0.35)",
            border: "1px solid rgba(255,255,255,0.25)",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 6,
            color: "#F7F3EC",
            textTransform: "uppercase",
          }}
        >
          <span>VIVELOO</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>PUNTAMAREA</span>
        </div>

        {/* Content block */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "56px 72px",
            color: "#F7F3EC",
          }}
        >
          {/* Overline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 8,
              color: "#D4BE9C",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 48, height: 1, background: "#D4BE9C", display: "flex" }} />
            <span>Barú · Cartagena</span>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 76,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: "#FFFFFF",
              marginBottom: 28,
            }}
          >
            <span>Residencias de lujo</span>
            <span style={{ marginLeft: 18, fontStyle: "italic", color: "#E7D5B9" }}>
              frente al mar.
            </span>
          </div>

          {/* 3 pillars */}
          <div
            style={{
              display: "flex",
              gap: 48,
              fontSize: 22,
              fontWeight: 400,
              color: "#F7F3EC",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 500, color: "#E7D5B9" }}>209</span>
              <span style={{ opacity: 0.85 }}>Residencias exclusivas</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 500, color: "#E7D5B9" }}>150 m</span>
              <span style={{ opacity: 0.85 }}>Playa privada</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 500, color: "#E7D5B9" }}>29.9%</span>
              <span style={{ opacity: 0.85 }}>ROI proyectado Año 1</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
