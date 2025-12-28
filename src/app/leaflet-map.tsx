"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* ---------------- TYPES ---------------- */

export type NodeData = {
  id: number;
  name: string;
  type: string;
  status: "online" | "offline";
  region: string;
  latency?: number;
  lat: number;
  lng: number;
};

type Props = {
  nodes: NodeData[];
};

/* ---------------- SVG ICON FACTORY ---------------- */

const createIcon = (color: "green" | "red") =>
  L.divIcon({
    className: "",
    html: `
      <svg width="26" height="26" viewBox="0 0 24 24" fill="${color}">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -22],
  });

/* ---------------- COMPONENT ---------------- */

export default function LeafletMap({ nodes }: Props) {
  return (
    <div style={{ height: "520px", width: "100%", borderRadius: "12px" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        {/* DARK MAP */}
        <TileLayer
          attribution="© CartoDB"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {nodes.map((node) => (
          <Marker
            key={node.id}
            position={[node.lat, node.lng]}
            icon={createIcon(node.status === "online" ? "green" : "red")}
          >
            <Popup>
              <strong>{node.name}</strong>
              <br />
              ID: {node.id}
              <br />
              Type: {node.type}
              <br />
              Status:{" "}
              <span
                style={{
                  color: node.status === "online" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {node.status}
              </span>
              <br />
              Region: {node.region}
              <br />
              Latency:{" "}
              {node.latency ? `${node.latency} ms` : "N/A"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
