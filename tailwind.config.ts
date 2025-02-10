import type { Config } from "tailwindcss";


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'green-kelp': {
          '50': '#f3f7ee',
          '100': '#e4ecdb',
          '200': '#cbdbbb',
          '300': '#abc492',
          '400': '#8cad6e',
          '500': '#6f9151',
          '600': '#56723e',
          '700': '#425932',
          '800': '#38482c',
          '900': '#313f28',
          '950': '#1f2b18',
      },
      },
    },


  },
  plugins: [],
} satisfies Config;
