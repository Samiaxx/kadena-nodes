"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface NodeItem {
  id: number;
  lat: number;
  lng: number;
  name: string;
  region: string;
  status: string;
}

export default function LeafletMap({ nodes }: { nodes: NodeItem[] }) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      {nodes.map((node) => (
        <CircleMarker
          key={node.id}
          center={[node.lat, node.lng]}
          radius={8}
          pathOptions={{
            color: node.status === "Online" ? "#00ff88" : "#ff4444",
          }}
        >
          <Popup>
            <strong>{node.name}</strong>
            <br />
            {node.region}
            <br />
            Status: {node.status}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
