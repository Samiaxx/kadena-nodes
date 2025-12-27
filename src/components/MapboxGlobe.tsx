"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { NodeItem } from "@/data/nodes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type Props = {
  nodes: NodeItem[];
};

export default function MapboxGlobe({ nodes }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      projection: "globe",
      zoom: 1.2,
      center: [0, 20],
    });

    map.on("load", () => {
      map.setFog({
        range: [-1, 2],
        color: "rgba(0,0,0,0.25)",
        highColor: "rgba(36,92,223,0.15)",
        horizonBlend: 0.2,
      });

      nodes.forEach((node) => {
        new mapboxgl.Marker({ color: "#ff4d4f" })
          .setLngLat([node.lng, node.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<strong>${node.name}</strong><br/>${node.region}`
            )
          )
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [nodes]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
