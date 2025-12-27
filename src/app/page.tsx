import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

const MapboxGlobe = dynamic(() => import("@/components/MapboxGlobe"), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#020617", color: "white" }}>
      <h1>Kadena Nexus</h1>
      <p>Global Node Map · v1</p>

      {/* Map */}
      <section style={{ height: "500px", marginBottom: "2rem" }}>
        <LeafletMap />
      </section>

      {/* Globe */}
      <section style={{ height: "500px" }}>
        <MapboxGlobe />
      </section>
    </main>
  );
}
