/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Manrope", "sans-serif"],
        heading: ["Sora", "sans-serif"],
      },
      colors: {
        "text-main": "#13233a",
        "text-muted": "#4f6078",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(18px)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 12s ease-in-out infinite",
        fadeInUp: "fadeInUp 500ms ease",
        fadeInUpFast: "fadeInUp 420ms ease",
      },
    },
  },
  plugins: [],
}

