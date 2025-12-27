"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { nodes } from "@/data/nodes";

mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function MapboxGlobe() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!mapboxgl.accessToken) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      projection: { name: "globe" },
      center: [0, 20],
      zoom: 1.4,
      antialias: true,
    });

    mapInstance.current = map;

    map.on("style.load", () => {
      // 🌍 Soft globe atmosphere (NO harsh white ring)
      map.setFog({
        range: [0.8, 7],
        color: "rgba(255,255,255,0.15)",
        "high-color": "rgba(255,255,255,0.08)",
        "space-color": "#0b1220",
        "horizon-blend": 0.15,
        "star-intensity": 0.2,
      });

      // 📍 GeoJSON from nodes
      const geojson = {
        type: "FeatureCollection",
        features: nodes.map((node) => ({
          type: "Feature",
          properties: {
            id: node.id,
            name: node.name,
            region: node.region,
            status: node.status,
            latency: node.latency,
          },
          geometry: {
            type: "Point",
            coordinates: [node.lng, node.lat],
          },
        })),
      };

      map.addSource("nodes", {
        type: "geojson",
        data: geojson,
      });

      // 🔴 Base node dots
      map.addLayer({
        id: "nodes",
        type: "circle",
        source: "nodes",
        paint: {
          "circle-radius": 5,
          "circle-color": [
            "case",
            ["==", ["get", "status"], "Online"],
            "#22ff88",
            "#ff4444",
          ],
          "circle-opacity": 0.9,
        },
      });

      // 🌊 Pulse animation (online nodes only)
      map.addLayer({
        id: "nodes-pulse",
        type: "circle",
        source: "nodes",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            6,
            4,
            10,
          ],
          "circle-color": "#22ff88",
          "circle-opacity": 0.25,
        },
        filter: ["==", ["get", "status"], "Online"],
      });

      // 🧭 Hover tooltip
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mouseenter", "nodes", (e) => {
        map.getCanvas().style.cursor = "pointer";

        const feature = e.features?.[0];
        if (!feature) return;

        const { name, region, status, latency } =
          feature.properties as any;

        popup
          .setLngLat(
            (feature.geometry as any).coordinates
          )
          .setHTML(
            `<div style="font-size:12px">
              <strong>${name}</strong><br/>
              Region: ${region}<br/>
              Status: ${status}<br/>
              Latency: ${latency} ms
            </div>`
          )
          .addTo(map);
      });

      map.on("mouseleave", "nodes", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "600px",
      }}
    />
  );
}
