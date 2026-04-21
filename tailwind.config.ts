import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          deep: "#0a0a1f",
          nebula: "#1a1133",
          text: "#e0e0ff",
          muted: "#a0a0cc",
          cyan: "#00f0ff",
          magenta: "#ff00aa",
          orange: "#ff9900",
        },
      },
      boxShadow: {
        glow: "0 0 28px rgba(0, 240, 255, 0.35)",
        magenta: "0 0 28px rgba(255, 0, 170, 0.28)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Orbitron", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

