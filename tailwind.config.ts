import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        layout:{},
        colors: {
          foreground: "#212121",
          background: "#f5f5f5",
      }},
      dark: {
        layout:{},
        colors: {
          foreground: "#f5f5f5",
          background: "#212121",
      }
    }
      },})],

};
export default config;
