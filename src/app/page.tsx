export const dynamic = "force-dynamic";

import ClientMapView from "@/components/ClientMapView";
import { nodes } from "@/data/nodes";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#050b14", color: "#fff" }}>
      <ClientMapView nodes={nodes} />
    </main>
  );
}
