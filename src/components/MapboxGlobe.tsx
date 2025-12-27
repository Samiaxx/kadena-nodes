"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import type { NodeItem } from "@/data/nodes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapboxGlobe({ nodes }: { nodes: NodeItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/dark-v11",
      projection: "globe",
      zoom: 1.3,
      center: [0, 20],
    });

    map.on("load", () => {
      map.addSource("nodes", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: nodes.map((n) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [n.lng, n.lat] },
            properties: { status: n.status },
          })),
        },
      });

      map.addLayer({
        id: "nodes-layer",
        type: "circle",
        source: "nodes",
        paint: {
          "circle-radius": 6,
          "circle-color": [
            "match",
            ["get", "status"],
            "Online",
            "#22c55e",
            "#ef4444",
          ],
        },
      });
    });

    return () => map.remove();
  }, [nodes]);

  return <div ref={ref} style={{ height: "650px" }} />;
}
