"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
});

const MapboxGlobe = dynamic(() => import("../components/MapboxGlobe"), {
  ssr: false,
});

export default function Home() {
  const [view, setView] = useState<"map" | "globe">("map");
  const [filters, setFilters] = useState({
    region: "All",
    type: "All",
    status: "All",
  });

  return (
    <main
      style={{
        height: "100vh",
        background: "#070b12",
        color: "#e6edf3",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: "1rem",
          borderBottom: "1px solid #0e1629",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: "#4fd1c5" }}>Kadena Nexus</h1>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#9aa4b2" }}>
            Global Node Map · v1
          </p>
        </div>

        <div>
          <button
            onClick={() => setView("map")}
            style={{
              marginRight: "0.5rem",
              padding: "0.4rem 0.8rem",
              background: view === "map" ? "#4fd1c5" : "#0c1220",
              color: view === "map" ? "#000" : "#e6edf3",
              border: "1px solid #1f2937",
              cursor: "pointer",
            }}
          >
            Map
          </button>

          <button
            onClick={() => setView("globe")}
            style={{
              padding: "0.4rem 0.8rem",
              background: view === "globe" ? "#4fd1c5" : "#0c1220",
              color: view === "globe" ? "#000" : "#e6edf3",
              border: "1px solid #1f2937",
              cursor: "pointer",
            }}
          >
            Globe
          </button>
        </div>
      </header>

      {/* STATS BAR */}
      {view === "map" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
            padding: "12px",
            borderBottom: "1px solid #0e1629",
          }}
        >
          {[
            { label: "Total Nodes", value: 3 },
            { label: "Online", value: 3 },
            { label: "Regions", value: 3 },
            { label: "Avg Latency", value: "55 ms" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#0c1220",
                border: "1px solid #1f2937",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#9aa4b2" }}>
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#4fd1c5",
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FILTER BAR */}
      {view === "map" && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            padding: "12px",
            borderBottom: "1px solid #0e1629",
          }}
        >
          <select
            value={filters.region}
            onChange={(e) =>
              setFilters({ ...filters, region: e.target.value })
            }
          >
            <option>All</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value })
            }
          >
            <option>All</option>
            <option>Validator</option>
            <option>Full Node</option>
            <option>RPC Node</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option>All</option>
            <option>Online</option>
            <option>Offline</option>
          </select>
        </div>
      )}

      {/* MAP / GLOBE */}
      <section style={{ flex: 1 }}>
        {view === "map" ? (
          <LeafletMap filters={filters} />
        ) : (
          <MapboxGlobe />
        )}
      </section>
    </main>
  );
}
