export type NodeItem = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  region: string;
  status: "Online" | "Offline";
  latency: number;
};

export const nodes: NodeItem[] = [
  { id: 1, name: "US West", lat: 37.77, lng: -122.41, region: "North America", status: "Online", latency: 42 },
  { id: 2, name: "US East", lat: 40.71, lng: -74.00, region: "North America", status: "Online", latency: 48 },
  { id: 3, name: "Europe", lat: 48.85, lng: 2.35, region: "Europe", status: "Online", latency: 55 },
  { id: 4, name: "UK", lat: 51.50, lng: -0.12, region: "Europe", status: "Online", latency: 52 },
  { id: 5, name: "Asia", lat: 35.68, lng: 139.69, region: "Asia", status: "Online", latency: 80 },
  { id: 6, name: "India", lat: 28.61, lng: 77.20, region: "Asia", status: "Offline", latency: 120 },
  { id: 7, name: "Africa", lat: -1.29, lng: 36.82, region: "Africa", status: "Online", latency: 95 },
  { id: 8, name: "Brazil", lat: -23.55, lng: -46.63, region: "South America", status: "Offline", latency: 110 },
  { id: 9, name: "Australia", lat: -33.86, lng: 151.21, region: "Oceania", status: "Online", latency: 130 },
  { id: 10, name: "Indonesia", lat: -6.20, lng: 106.85, region: "Asia", status: "Online", latency: 90 },
];
