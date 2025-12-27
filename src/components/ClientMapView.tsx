"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { NodeItem } from "@/data/nodes";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });
const MapboxGlobe = dynamic(() => import("./MapboxGlobe"), { ssr: false });

type Props = {
  nodes: NodeItem[];
};

export default function ClientMapView({ nodes }: Props) {
  const [view, setView] = useState<"map" | "globe">("map");
  const [region, setRegion] = useState<string>("All");

  const filteredNodes =
    region === "All"
      ? nodes
      : nodes.filter((n) => n.region === region);

  return (
    <>
      {/* CONTROLS */}
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setView("map")}>Map</button>
        <button onClick={() => setView("globe")}>Globe</button>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          <option value="All">All</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>
      </div>

      {/* MAPS */}
      {view === "map" && <LeafletMap nodes={filteredNodes} />}
      {view === "globe" && <MapboxGlobe nodes={filteredNodes} />}
    </>
  );
}
