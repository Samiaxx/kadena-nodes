"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Node } from "@/app/page";

type Props = {
  nodes: Node[];
};

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LeafletMap({ nodes }: Props) {
  return (
    <div style={{ height: "75vh", width: "100%" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {nodes.map((node) => (
          <Marker
            key={node.id}
            position={[node.lat, node.lng]}
            icon={node.status === "online" ? greenIcon : redIcon}
          >
            <Popup>
              <strong>{node.name}</strong>
              <br />
              ID: {node.id}
              <br />
              Type: {node.type}
              <br />
              Status:{" "}
              <span style={{ color: node.status === "online" ? "green" : "red" }}>
                {node.status}
              </span>
              <br />
              Region: {node.region}
              <br />
              Latency: {node.latency ? `${node.latency} ms` : "N/A"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
