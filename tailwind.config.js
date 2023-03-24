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
      smallest: "0.938rem",
      smaller: "1.063rem",
      paragraph: "1.125rem",
      larger: "1.25rem",
      subheading: "1.5rem",
      heading: "2.25rem",
    },
    fontWeight: {
      thin: "200",
      light: "300",
    },
    screens: {
      phone: "425px",
      tablet: "650px",
      tabletLarge: "900px",
      desktopSmall: "1100px",
      desktop: "1400px",
    },
    extend: {},
  },
  plugins: [],
};
