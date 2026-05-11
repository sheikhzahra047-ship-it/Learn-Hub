/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff8ff",
          100: "#daeefd",
          200: "#bde0fb",
          300: "#90cbf8",
          400: "#5bafF2",
          500: "#3a95ea",
          600: "#2478d6",
          700: "#1f63b3",
          800: "#1f5491",
          900: "#1f4778",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.06)",
        card: "0 2px 8px rgba(15,23,42,0.06)",
      },
    },
  },
  plugins: [],
};
