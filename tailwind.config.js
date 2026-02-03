/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#93C5FD", // Soft Blue
        secondary: "#FCA5A5", // Soft Pink
        accent: "#86EFAC", // Soft Green
        background: "#F9FAFB", // Light Gray
        surface: "#FFFFFF",
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}

