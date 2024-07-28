/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors:{

        "card":"rgba(229,223,223)",
        "search-bar":"rgba(237, 237,237)",
        
      
      },


    },
  },
  plugins: [],
}