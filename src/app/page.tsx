"use client";

import { useState, useMemo } from "react";
import LeafletMap from "@/components/LeafletMap";
import MapboxGlobe from "@/components/MapboxGlobe";
import { nodes } from "@/data/nodes";

export default function Home() {
  const [view, setView] = useState<"map" | "globe">("map");
  const [region, setRegion] = useState<string>("All");

  // ✅ CORRECT FILTER LOGIC (this fixes the 2-node bug)
  const filteredNodes = useMemo(() => {
    if (region === "All") return nodes;
    return nodes.filter((node) => node.region === region);
  }, [region]);

  return (
    <main style={{ padding: "24px", color: "#fff" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Kadena Nexus</h1>
      <p style={{ marginBottom: "12px" }}>Global Node Map · v1</p>

      {/* CONTROLS */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <button onClick={() => setView("map")}>Map</button>
        <button onClick={() => setView("globe")}>Globe</button>

        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="All">All</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="South America">South America</option>
        </select>
      </div>

      {/* STATS */}
      <div style={{ marginBottom: "12px" }}>
        <strong>Total Nodes:</strong> {filteredNodes.length}
      </div>

      {/* MAP AREA */}
      <div style={{ height: "650px", width: "100%" }}>
        {view === "map" && <LeafletMap nodes={filteredNodes} />}
        {view === "globe" && <MapboxGlobe nodes={filteredNodes} />}
      </div>
    </main>
  );
}
