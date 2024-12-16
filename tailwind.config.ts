import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        foreground: "#212121",
        background: "#f5f5f5",
        black: {
          100: "rgba(59,92,117,0.2)",
          900: "#1f1f1f",
        },
        white: {
          100: "#f5f5f5",
        },
      },
        boxShadow: {
          "card-light": "0 4px 6px rgba(0, 0, 0, 0.1)",
          "card-dark": "none",
        },
      },
    },
    plugins: [
      nextui({
        themes: {
          light: {
            layout: {},
            colors: {
              foreground: "#212121",
              background: "#f5f5f5",
            },
          },
          dark: {
            layout: {},
            colors: {
              foreground: "#f5f5f5",
              background: "#212121",
            },
          },
        },
      }),
    ],
};
export default config;
