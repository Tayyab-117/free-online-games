import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { bgd:"#0f1530", panel:"#1b2246", accent:"#f39c12" } } },
  plugins: []
} satisfies Config;
