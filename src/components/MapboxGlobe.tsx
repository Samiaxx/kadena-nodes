"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function MapboxGlobe() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    mapboxgl.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    if (!mapboxgl.accessToken) {
      console.error("Mapbox token missing");
      return;
    }

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [0, 20],
      zoom: 1.2,
      projection: "globe",
    });

    return () => map.remove();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
