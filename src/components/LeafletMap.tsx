"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const nodes = [
  {
    id: "KDN-001",
    location: "New York, USA",
    lat: 40.7128,
    lng: -74.006,
    status: "Active (mock)",
  },
  {
    id: "KDN-002",
    location: "London, UK",
    lat: 51.5074,
    lng: -0.1278,
    status: "Active (mock)",
  },
  {
    id: "KDN-003",
    location: "Frankfurt, DE",
    lat: 50.1109,
    lng: 8.6821,
    status: "Active (mock)",
  },
  {
    id: "KDN-004",
    location: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    status: "Active (mock)",
  },
];

export default function LeafletMap() {
  useEffect(() => {
    const map = L.map("map", {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      worldCopyJump: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap & Carto",
      }
    ).addTo(map);

    nodes.forEach((node) => {
      const marker = L.circleMarker([node.lat, node.lng], {
        radius: 6,
        color: "#67e8f9",
        fillColor: "#4fd1c5",
        fillOpacity: 0.9,
        weight: 1,
      });

      marker
        .bindTooltip(
          `
          <div style="font-size:12px">
            <strong>${node.id}</strong><br/>
            ${node.location}<br/>
            Status: ${node.status}
          </div>
          `,
          {
            direction: "top",
            offset: [0, -6],
            opacity: 0.95,
          }
        )
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}
