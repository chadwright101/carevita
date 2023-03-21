/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      green: "#5C873C",
      lightGreen: "#94C36A",
      blue: "#134266",
      white: "#FFFFFF",
      black: "#222222",
      link: "#0000EE",
    },
    fontSize: {
      smaller: "1rem",
      paragraph: "1.125rem",
      larger: "1.25rem",
      subheading: "1.5rem",
      heading: "2.25rem",
    },
    screens: {
      phoneSmall: "425px",
      phoneLarge: "650px",
      tablet: "900px",
      tablet2: "1100px",
      tablet3: "1200px",
      desktop: "1400px",
    },
    extend: {},
  },
  plugins: [],
};
