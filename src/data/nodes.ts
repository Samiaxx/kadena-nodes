export type NodeStatus = "online" | "offline";

export interface NodeItem {
  id: number;
  name: string;
  lat: number;
  lng: number;
  region: string;
  latency: number;
  status: NodeStatus;
}

export const nodes: NodeItem[] = [
  { id: 1, name: "US East", lat: 37.7749, lng: -122.4194, region: "North America", latency: 45, status: "online" },
  { id: 2, name: "US West", lat: 34.0522, lng: -118.2437, region: "North America", latency: 52, status: "online" },
  { id: 3, name: "EU Central", lat: 50.1109, lng: 8.6821, region: "Europe", latency: 60, status: "online" },
  { id: 4, name: "UK", lat: 51.5074, lng: -0.1278, region: "Europe", latency: 58, status: "offline" },
  { id: 5, name: "Asia East", lat: 35.6895, lng: 139.6917, region: "Asia", latency: 70, status: "online" },
  { id: 6, name: "Asia South", lat: 1.3521, lng: 103.8198, region: "Asia", latency: 68, status: "online" },
  { id: 7, name: "Africa", lat: -1.2921, lng: 36.8219, region: "Africa", latency: 95, status: "offline" },
  { id: 8, name: "South America", lat: -23.5505, lng: -46.6333, region: "South America", latency: 88, status: "online" },
  { id: 9, name: "Australia", lat: -33.8688, lng: 151.2093, region: "Oceania", latency: 92, status: "online" },
  { id: 10, name: "Canada", lat: 45.4215, lng: -75.6972, region: "North America", latency: 50, status: "online" },
];
