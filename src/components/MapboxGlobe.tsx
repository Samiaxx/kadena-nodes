"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface NodeItem {
  id: number;
  lat: number;
  lng: number;
  name: string;
  region: string;
  status: string;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapboxGlobe({ nodes }: { nodes: NodeItem[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      projection: "globe",
      zoom: 1.5,
      center: [0, 20],
    });

    map.on("load", () => {
      nodes.forEach((node) => {
        const el = document.createElement("div");
        el.style.width = "10px";
        el.style.height = "10px";
        el.style.borderRadius = "50%";
        el.style.background =
          node.status === "Online" ? "#00ff88" : "#ff4444";

        new mapboxgl.Marker(el)
          .setLngLat([node.lng, node.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<strong>${node.name}</strong><br/>${node.region}<br/>${node.status}`
            )
          )
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [nodes]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
