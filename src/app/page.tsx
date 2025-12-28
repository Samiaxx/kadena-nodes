"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
});

export default function Page() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* Toggle Button */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 16,
          right: 16,
          padding: "8px 14px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          background: theme === "dark" ? "#e5e7eb" : "#111827",
          color: theme === "dark" ? "#111827" : "#ffffff",
        }}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      {/* Map */}
      <LeafletMap theme={theme} />
    </div>
  );
}
