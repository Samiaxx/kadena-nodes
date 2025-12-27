export interface NodeItem {
  id: number;
  name: string;
  lat: number;
  lng: number;
  region: string;
  status: "Online" | "Offline";
  latency: number;
}

export const nodes: NodeItem[] = [
  {
    id: 1,
    name: "US West",
    lat: 37.7749,
    lng: -122.4194,
    region: "North America",
    status: "Online",
    latency: 45,
  },
  {
    id: 2,
    name: "US East",
    lat: 40.7128,
    lng: -74.006,
    region: "North America",
    status: "Online",
    latency: 52,
  },
  {
    id: 3,
    name: "Europe Central",
    lat: 50.1109,
    lng: 8.6821,
    region: "Europe",
    status: "Online",
    latency: 60,
  },
  {
    id: 4,
    name: "UK London",
    lat: 51.5074,
    lng: -0.1278,
    region: "Europe",
    status: "Online",
    latency: 58,
  },
  {
    id: 5,
    name: "Asia Singapore",
    lat: 1.3521,
    lng: 103.8198,
    region: "Asia",
    status: "Online",
    latency: 70,
  },
  {
    id: 6,
    name: "Asia Tokyo",
    lat: 35.6895,
    lng: 139.6917,
    region: "Asia",
    status: "Offline",
    latency: 0,
  },
  {
    id: 7,
    name: "Africa Nairobi",
    lat: -1.2921,
    lng: 36.8219,
    region: "Africa",
    status: "Online",
    latency: 85,
  },
  {
    id: 8,
    name: "South Africa",
    lat: -26.2041,
    lng: 28.0473,
    region: "Africa",
    status: "Offline",
    latency: 0,
  },
  {
    id: 9,
    name: "South America Brazil",
    lat: -23.5505,
    lng: -46.6333,
    region: "South America",
    status: "Online",
    latency: 95,
  },
  {
    id: 10,
    name: "Australia Sydney",
    lat: -33.8688,
    lng: 151.2093,
    region: "Asia",
    status: "Online",
    latency: 110,
  },
];
