"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NodeType } from "../app/page";

const icon = (color: "green" | "red") =>
  new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -40],
  });

export default function LeafletMap({ nodes }: { nodes: NodeType[] }) {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {nodes.map((n) => (
        <Marker
          key={n.id}
          position={[n.lat, n.lng]}
          icon={icon(n.status === "online" ? "green" : "red")}
        >
          <Popup minWidth={260}>
            <strong>{n.name}</strong>
            <br />
            ID: {n.id}
            <br />
            Status: {n.status.toUpperCase()}
            <br />
            Region: {n.region}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
