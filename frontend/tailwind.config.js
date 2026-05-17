/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0A0F1A",
        card: "#0F172A",
        primary: "#A259FF",
        secondary: "#20C997",
        textPrimary: "#F5F7FA",
        textSecondary: "#94A3B8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
