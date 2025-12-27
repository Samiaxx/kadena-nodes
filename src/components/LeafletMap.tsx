"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Node = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  region: string;
  status: string;
  latency: number;
};

export default function LeafletMap({ nodes }: { nodes: Node[] }) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {nodes.map((node) => (
        <CircleMarker
          key={node.id}
          center={[node.lat, node.lng]}
          radius={6}
          pathOptions={{
            color: node.status === "Online" ? "#22ff88" : "#ff4444",
          }}
        >
          <Popup>
            <strong>{node.name}</strong><br />
            Region: {node.region}<br />
            Status: {node.status}<br />
            Latency: {node.latency} ms
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
