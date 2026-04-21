import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import path from "path"

export const runtime = "nodejs"

// Opción B — Split editorial: panel izquierdo marrón con copy + render a la derecha
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
          background: "#66523c",
        }}
      >
        {/* Render lado derecho (55%) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "55%",
            height: "100%",
            display: "flex",
          }}
        >
          <img
            src={imgBase64}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Leve degradado en el borde izquierdo del render para unificar */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              background:
                "linear-gradient(90deg, rgba(102,82,60,0.55) 0%, rgba(102,82,60,0) 15%)",
            }}
          />
        </div>

        {/* Panel izquierdo marrón (45%) */}
        <div
          style={{
            width: "45%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 52px",
            color: "#F7F3EC",
          }}
        >
          {/* Top: brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 6,
                color: "#E7D5B9",
                textTransform: "uppercase",
              }}
            >
              <span>VIVELOO</span>
              <span style={{ opacity: 0.45 }}>·</span>
              <span>PUNTAMAREA</span>
            </div>
            <div
              style={{
                width: 56,
                height: 1,
                background: "#E7D5B9",
                opacity: 0.6,
                display: "flex",
              }}
            />
          </div>

          {/* Middle: title */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 8,
                color: "#E7D5B9",
                textTransform: "uppercase",
                marginBottom: 22,
              }}
            >
              Barú · Cartagena
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 62,
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: -1,
                color: "#FFFFFF",
              }}
            >
              <span>Residencias</span>
              <span>de lujo</span>
              <span style={{ fontStyle: "italic", color: "#E7D5B9" }}>frente al mar.</span>
            </div>
          </div>

          {/* Bottom: KPIs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              fontSize: 18,
              color: "#F7F3EC",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "baseline",
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 500, color: "#E7D5B9" }}>209</span>
              <span style={{ opacity: 0.85 }}>Residencias exclusivas</span>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
              <span style={{ fontSize: 26, fontWeight: 500, color: "#E7D5B9" }}>150 m</span>
              <span style={{ opacity: 0.85 }}>Playa privada</span>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
              <span style={{ fontSize: 26, fontWeight: 500, color: "#E7D5B9" }}>29.9%</span>
              <span style={{ opacity: 0.85 }}>ROI proyectado Año 1</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
