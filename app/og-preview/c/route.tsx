import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import path from "path"

export const runtime = "nodejs"

// Opción C — Card flotante dark con alta legibilidad, render limpio de fondo
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

        {/* Overlay sutil uniforme para dar profundidad */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "rgba(17,13,9,0.35)",
          }}
        />

        {/* Brand chip top center */}
        <div
          style={{
            position: "absolute",
            top: 34,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 24px",
              background: "rgba(17,13,9,0.6)",
              border: "1px solid rgba(231,213,185,0.4)",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 8,
              color: "#E7D5B9",
              textTransform: "uppercase",
            }}
          >
            <span>VIVELOO</span>
            <span style={{ opacity: 0.55 }}>·</span>
            <span>PUNTAMAREA</span>
          </div>
        </div>

        {/* Card flotante bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 50,
            right: 50,
            display: "flex",
            flexDirection: "column",
            padding: "40px 48px",
            background: "rgba(17,13,9,0.78)",
            border: "1px solid rgba(231,213,185,0.25)",
            color: "#F7F3EC",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 18,
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: 8,
              color: "#E7D5B9",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 40, height: 1, background: "#E7D5B9", display: "flex" }} />
            <span>Barú · Cartagena · Colombia</span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 56,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: -0.8,
              color: "#FFFFFF",
              marginBottom: 26,
            }}
          >
            <span>Residencias de lujo</span>
            <span style={{ marginLeft: 14, fontStyle: "italic", color: "#E7D5B9" }}>
              frente al mar.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 48,
              paddingTop: 22,
              borderTop: "1px solid rgba(231,213,185,0.2)",
              fontSize: 20,
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
    { width: 1200, height: 630 }
  )
}
