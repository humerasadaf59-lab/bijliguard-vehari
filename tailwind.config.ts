import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        panel: "#0d1b2a",
        cyan: "#22d3ee",
        electric: "#facc15"
      },
      boxShadow: {
        glow: "0 0 35px rgba(34,211,238,.10)"
      }
    }
  },
  plugins: []
};
export default config;
