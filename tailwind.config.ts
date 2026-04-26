import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          deep: "#0a0a1f",
          nebula: "#1a1133",
          cyan: "#00f0ff",
          magenta: "#ff00aa",
          orange: "#ff9900",
          text: "#e0e0ff",
          muted: "#a0a0cc"
        }
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;

