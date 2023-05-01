/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayColor: "#9BA4B5",
        darkBlue: "#212A3E",
        lightBlue: "#394867",
        offWhite: "#F1F6F9",
      },
    },
  },
  plugins: [],
};
