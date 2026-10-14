import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        glitten: ['Glitten', 'serif'],
      },
      keyframes: {
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(3%)' },
        },
      },
      animation: {
        'gentle-bounce': 'gentle-bounce 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
