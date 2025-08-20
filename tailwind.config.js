/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // archivo: ['Archivo', 'sans-serif'], // Define your custom font family
        faustina: ["Faustina", 'serif'],
        Garamond: ["Cormorant Garamond", 'serif'],
        openSans: ["Open Sans", 'sans-serif']
      },
    },
  },
  plugins: [require("daisyui"), ('tailwind-scrollbar-hide')],
}

