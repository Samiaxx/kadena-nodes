"use client";

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

export default function MapboxGlobe() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "globe",
      style: "mapbox://styles/mapbox/dark-v11",
      projection: "globe",
      zoom: 1.7,
    });

    map.on("style.load", () => {
      map.setFog({});
    });

    return () => map.remove();
  }, []);

  return <div id="globe" style={{ height: "100%", width: "100%" }} />;
}
