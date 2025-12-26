"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Filters = {
  region: string;
  type: string;
  status: string;
};

const nodes = [
  {
    id: 1,
    name: "Kadena Node – US East",
    city: "New York",
    country: "USA",
    region: "North America",
    chain: "Chain 1",
    type: "Validator",
    status: "Online",
    latency: 42,
    uptime: "99.98%",
    lastSeen: "3s ago",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: "Kadena Node – Europe",
    city: "Frankfurt",
    country: "Germany",
    region: "Europe",
    chain: "Chain 2",
    type: "Full Node",
    status: "Online",
    latency: 55,
    uptime: "99.91%",
    lastSeen: "6s ago",
    lat: 50.1109,
    lng: 8.6821,
  },
  {
    id: 3,
    name: "Kadena Node – Asia",
    city: "Singapore",
    country: "Singapore",
    region: "Asia",
    chain: "Chain 3",
    type: "RPC Node",
    status: "Online",
    latency: 68,
    uptime: "99.87%",
    lastSeen: "4s ago",
    lat: 1.3521,
    lng: 103.8198,
  },
];

export default function LeafletMap({ filters }: { filters: Filters }) {
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

    const filteredNodes = nodes.filter((node) => {
      return (
        (filters.region === "All" || node.region === filters.region) &&
        (filters.type === "All" || node.type === filters.type) &&
        (filters.status === "All" || node.status === filters.status)
      );
    });

    filteredNodes.forEach((node) => {
      const marker = L.circleMarker([node.lat, node.lng], {
        radius: 7,
        color: "#4fd1c5",
        fillColor: "#4fd1c5",
        fillOpacity: 0.9,
      }).addTo(map);

      marker.bindTooltip(
        `
        <div style="
          background:#0c1220;
          color:#e6edf3;
          padding:10px;
          border-radius:8px;
          border:1px solid #1f2937;
          min-width:180px;
          font-size:12px;
        ">
          <strong style="color:#4fd1c5">${node.name}</strong><br/>
          ${node.city}, ${node.country}<br/>
          <hr style="border-color:#1f2937"/>
          Type: ${node.type}<br/>
          Status: <b style="color:#22c55e">${node.status}</b><br/>
          Latency: ${node.latency} ms<br/>
          Uptime: ${node.uptime}
        </div>
        `,
        { sticky: true }
      );
    });

    return () => {
      map.remove();
    };
  }, [filters]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}
