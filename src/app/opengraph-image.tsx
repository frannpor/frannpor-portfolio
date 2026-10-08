/* eslint-disable @next/next/no-img-element -- ImageResponse renders an image, not a browser page. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Francisco Porciel. Full Stack Developer. Interfaces, producto e infraestructura.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ShareImage() {
  const portrait = await readFile(join(process.cwd(), "public/brand/franpor-electric.png"));

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "48px 56px 38px", background: "#10150f", color: "#eef2e8", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 27, fontWeight: 700, letterSpacing: -1 }}>
          franpor<span style={{ color: "#cefa69" }}>.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", border: "1px solid #4d5b3a", borderRadius: 30, padding: "10px 18px", color: "#d2deb9", fontSize: 15, letterSpacing: 2 }}>
          FULL STACK DEVELOPER
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 86, fontWeight: 700, letterSpacing: -5, lineHeight: 1.05 }}>
            <span>Francisco</span>
            <span style={{ color: "#cefa69" }}>Porciel.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 28, lineHeight: 1.35, color: "#c0c7b7" }}>
            <span>Interfaces, producto</span>
            <span>e infraestructura.</span>
          </div>
        </div>

        <div style={{ width: 430, height: 430, display: "flex", position: "relative", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", position: "absolute", width: 408, height: 408, border: "1px solid #526332", borderRadius: "50%" }} />
          <div style={{ display: "flex", position: "absolute", width: 360, height: 360, border: "1px solid #2f3b22", borderRadius: "50%" }} />
          <div style={{ display: "flex", position: "absolute", width: 322, height: 322, borderRadius: "50%", background: "#182112" }} />
          <img src={`data:image/png;base64,${portrait.toString("base64")}`} width={392} height={392} alt="" style={{ objectFit: "contain" }} />
          <div style={{ display: "flex", position: "absolute", top: 62, right: 44, width: 18, height: 18, background: "#cefa69", transform: "rotate(45deg)" }} />
          <div style={{ display: "flex", position: "absolute", bottom: 80, left: 31, width: 8, height: 8, background: "#cefa69", transform: "rotate(45deg)" }} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #39402e", paddingTop: 23, fontSize: 19 }}>
        <div style={{ display: "flex", alignItems: "center", color: "#d8edac" }}>
          <span style={{ display: "flex", width: 25, height: 3, marginRight: 12, background: "#cefa69" }} />
          frannpor-dev.com
        </div>
        <span style={{ color: "#a4af96", fontSize: 16 }}>Ideas, interfaces y sistemas.</span>
      </div>
    </div>,
    size,
  );
}
