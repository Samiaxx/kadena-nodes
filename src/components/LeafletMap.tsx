"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { NodeItem } from "@/data/nodes";

export default function LeafletMap({ nodes }: { nodes: NodeItem[] }) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "650px", width: "100%" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      {nodes.map((n) => (
        <CircleMarker
          key={n.id}
          center={[n.lat, n.lng]}
          radius={8}
          pathOptions={{
            color: n.status === "Online" ? "lime" : "red",
            fillOpacity: 0.9,
          }}
        >
          <Popup>{n.name}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
