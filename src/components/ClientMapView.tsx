"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });
const MapboxGlobe = dynamic(() => import("./MapboxGlobe"), { ssr: false });

type Node = {
  id: number;
  lat: number;
  lng: number;
  name: string;
  region: string;
  status: string;
  latency: number;
};

export default function ClientMapView({ nodes }: { nodes: Node[] }) {
  const [view, setView] = useState<"map" | "globe">("map");

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setView("map")}>Map</button>
        <button onClick={() => setView("globe")} style={{ marginLeft: 8 }}>
          Globe
        </button>
      </div>

      {/* THIS HEIGHT IS NON-NEGOTIABLE */}
      <div style={{ width: "100%", height: 520 }}>
        {view === "map" ? (
          <LeafletMap nodes={nodes} />
        ) : (
          <MapboxGlobe nodes={nodes} />
        )}
      </div>
    </>
  );
}
