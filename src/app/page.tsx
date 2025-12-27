"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { nodes } from "@/data/nodes";

const LeafletMap = dynamic(
  () => import("@/components/LeafletMap"),
  { ssr: false }
);

const MapboxGlobe = dynamic(
  () => import("@/components/MapboxGlobe"),
  { ssr: false }
);

export default function Home() {
  const [view, setView] = useState<"map" | "globe">("map");
  const [region, setRegion] = useState("All");

  // ✅ Unique regions
  const regions = useMemo(() => {
    return ["All", ...Array.from(new Set(nodes.map(n => n.region)))];
  }, []);

  // ✅ Filtered nodes (single source of truth)
  const filteredNodes = useMemo(() => {
    if (region === "All") return nodes;
    return nodes.filter(n => n.region === region);
  }, [region]);

  return (
    <main style={{ padding: "24px" }}>
      <h1>Kadena Nexus</h1>
      <p>Global Node Map · v1</p>

      {/* 🔘 Controls */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <button onClick={() => setView("map")}>Map</button>
        <button onClick={() => setView("globe")}>Globe</button>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* 🗺️ Views */}
      <div style={{ height: "650px", width: "100%" }}>
        {view === "map" && <LeafletMap nodes={filteredNodes} />}
        {view === "globe" && <MapboxGlobe nodes={filteredNodes} />}
      </div>
    </main>
  );
}
