"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mock node data (v1)
const nodes = [
  {
    id: 1,
    name: "US-East Node",
    lat: 37.7749,
    lng: -122.4194,
    region: "North America",
    status: "Online",
    latency: 45,
  },
  {
    id: 2,
    name: "EU-West Node",
    lat: 50.1109,
    lng: 8.6821,
    region: "Europe",
    status: "Online",
    latency: 60,
  },
  {
    id: 3,
    name: "Asia-Pacific Node",
    lat: 1.3521,
    lng: 103.8198,
    region: "Asia",
    status: "Online",
    latency: 70,
  },
];

export default function LeafletMap() {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
    >
      {/* Dark tile layer */}
      <TileLayer
        attribution="© OpenStreetMap, © Carto"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* Node dots */}
      {nodes.map((node) => (
        <CircleMarker
          key={node.id}
          center={[node.lat, node.lng]}
          radius={8}
          pathOptions={{
            color: "#2dd4bf",
            fillColor: "#2dd4bf",
            fillOpacity: 0.9,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={1}>
            <div style={{ fontSize: "0.8rem" }}>
              <strong>{node.name}</strong>
              <br />
              Region: {node.region}
              <br />
              Status: {node.status}
              <br />
              Latency: {node.latency} ms
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
