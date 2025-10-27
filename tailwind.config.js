export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { inter: ["Inter", "sans-serif"] },
      colors: {
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          text: "#f8fafc",
          muted: "#94a3b8",
        },
        light: {
          bg: "#f5f8f6",        // very soft off-white
          surface: "#ffffff",   // card background
          text: "#1e293b",      // dark text
          muted: "#64748b",     // secondary text
        },
        accent: {
          blue: "#3b82f6",
          cyan: "#22d3ee",
          softBlue: "#60a5fa",   // softer accent for light mode
          softCyan: "#22d3ee",   // lighter cyan
          green: "#4ade80",       // soft green
          greenDark: "#22c55e",   // darker green for hover
        },
      },
      boxShadow: {
        glow: "0 0 12px rgba(59, 130, 246, 0.5)",
      },
    },
  },
  plugins: [],
};
