import ClientMapView from "@/components/ClientMapView";
import { nodes } from "@/data/nodes";

export default function Home() {
  return <ClientMapView nodes={nodes} />;
}
