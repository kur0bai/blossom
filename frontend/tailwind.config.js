/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#eee3ff",
          600: "#8054c7",
          700: "#5a3696",
        },
        secondary: {
          600: "#63d838",
        },
      },
    },
  },
  plugins: [],
};
