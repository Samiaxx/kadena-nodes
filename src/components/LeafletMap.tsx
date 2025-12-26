"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const nodes = [
  {
    id: 1,
    name: "Kadena Node – US East",
    region: "North America",
    status: "Online",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: "Kadena Node – Europe",
    region: "Europe",
    status: "Online",
    lat: 50.1109,
    lng: 8.6821,
  },
  {
    id: 3,
    name: "Kadena Node – Asia",
    region: "Asia",
    status: "Online",
    lat: 1.3521,
    lng: 103.8198,
  },
];

export default function LeafletMap() {
  useEffect(() => {
    const map = L.map("map", {
      center: [20, 0],
      zoom: 2,
      worldCopyJump: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "© OpenStreetMap, © Carto",
      }
    ).addTo(map);

    nodes.forEach((node) => {
      const marker = L.circleMarker([node.lat, node.lng], {
        radius: 7,
        color: "#4fd1c5",
        fillColor: "#4fd1c5",
        fillOpacity: 0.9,
      }).addTo(map);

      marker.bindTooltip(
        `
        <div style="
          font-family: Inter, sans-serif;
          background: #0c1220;
          color: #e6edf3;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #1f2937;
          min-width: 160px;
        ">
          <strong style="color:#4fd1c5">${node.name}</strong><br/>
          <span>Region: ${node.region}</span><br/>
          <span>Status: <b style="color:#22c55e">${node.status}</b></span>
        </div>
        `,
        {
          direction: "top",
          opacity: 1,
          sticky: true,
        }
      );
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}
