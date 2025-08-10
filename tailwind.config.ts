import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        bgd: "#0f1530",
        panel: "#1b2246",
        accent: "#f39c12",
        sky: "#8ab4ff",
        leaf: "#42d392"
      },
      boxShadow: { card: "0 8px 24px rgba(0,0,0,.25)" },
      borderRadius: { xl: "1rem" }
    }
  },
  plugins: []
} satisfies Config;
