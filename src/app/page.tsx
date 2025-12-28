"use client";

import { useState } from "react";
import LeafletMap from "@/components/LeafletMap";

export type NodeStatus = "online" | "offline";

export type Node = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  region: string;
  status: NodeStatus;
  type: string;
  latency: number;
};

const NODES: Node[] = [
  { id: 1, name: "USA West", lat: 37.77, lng: -122.41, region: "North America", status: "online", type: "Validator", latency: 40 },
  { id: 2, name: "USA East", lat: 40.71, lng: -74.0, region: "North America", status: "online", type: "Validator", latency: 50 },
  { id: 3, name: "Germany", lat: 52.52, lng: 13.4, region: "Europe", status: "online", type: "Full Node", latency: 35 },
  { id: 4, name: "UK", lat: 51.5, lng: -0.12, region: "Europe", status: "offline", type: "Validator", latency: 0 },
  { id: 5, name: "India", lat: 28.61, lng: 77.2, region: "Asia", status: "offline", type: "Validator", latency: 0 },
  { id: 6, name: "Japan", lat: 35.68, lng: 139.69, region: "Asia", status: "online", type: "Full Node", latency: 60 },
  { id: 7, name: "Nigeria", lat: 9.08, lng: 8.67, region: "Africa", status: "online", type: "Full Node", latency: 70 },
  { id: 8, name: "South Africa", lat: -30.56, lng: 22.94, region: "Africa", status: "online", type: "Validator", latency: 65 },
  { id: 9, name: "Brazil", lat: -15.78, lng: -47.93, region: "South America", status: "offline", type: "Full Node", latency: 0 },
  { id: 10, name: "Australia", lat: -33.86, lng: 151.2, region: "Oceania", status: "online", type: "Validator", latency: 80 },
];

export default function Page() {
  const [statusFilter, setStatusFilter] = useState<"all" | NodeStatus>("all");
  const [regionFilter, setRegionFilter] = useState("all");

  const filteredNodes = NODES.filter((node) => {
    const statusMatch = statusFilter === "all" || node.status === statusFilter;
    const regionMatch = regionFilter === "all" || node.region === regionFilter;
    return statusMatch && regionMatch;
  });

  const nodesToShow = filteredNodes.length ? filteredNodes : NODES;

  return (
    <main style={{ background: "#050b1a", minHeight: "100vh", color: "white" }}>
      <header style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Kadena Nexus</h1>
        <p style={{ opacity: 0.8 }}>Global Node Map · MVP</p>

        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
            <option value="all">All Regions</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </header>

      <LeafletMap nodes={nodesToShow} />
    </main>
  );
}
