import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import path from "path"

export const runtime = "nodejs"

// Opción A — Gradiente oscuro dramático + contenido en bottom-left
export async function GET() {
  const imgPath = path.join(process.cwd(), "public", "og-render-21.jpg")
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
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={imgBase64}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Gradiente oscuro dramático: del top transparente a bottom casi opaco */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.2) 35%, rgba(40,30,22,0.82) 65%, rgba(17,13,9,0.95) 100%)",
          }}
        />

        {/* Brand chip top-right */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 48,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 22px",
            background: "rgba(17,17,17,0.55)",
            border: "1px solid rgba(231,213,185,0.3)",
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

        {/* Content bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            padding: "0 72px 52px 72px",
            color: "#F7F3EC",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 22,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 8,
              color: "#E7D5B9",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 48, height: 1, background: "#E7D5B9", display: "flex" }} />
            <span>Barú · Cartagena</span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 80,
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: -1.5,
              color: "#FFFFFF",
              marginBottom: 32,
            }}
          >
            <span>Residencias de lujo</span>
            <span style={{ marginLeft: 18, fontStyle: "italic", color: "#E7D5B9" }}>
              frente al mar.
            </span>
          </div>

          <div style={{ display: "flex", gap: 56, fontSize: 22, color: "#F7F3EC" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 34, fontWeight: 500, color: "#E7D5B9" }}>209</span>
              <span style={{ opacity: 0.85 }}>Residencias exclusivas</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 34, fontWeight: 500, color: "#E7D5B9" }}>150 m</span>
              <span style={{ opacity: 0.85 }}>Playa privada</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 34, fontWeight: 500, color: "#E7D5B9" }}>29.9%</span>
              <span style={{ opacity: 0.85 }}>ROI proyectado Año 1</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
