/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //Primary Colors

        "ecnmy-skyblue": "#19C2FA",
        "ecnmy-mint": "#43D5A6",
        "ecnmy-black": "#1D1D1B",

        //Primary Colors

        //background color
        "ecnmy-charcoal": "#142A37",
        "ecnmy-breeze": "#EEF0F1",
        "ecnmy-white": "#FFFFFF",
        //background color

        //secondary highlight colors
        "ecnmy-cranberry": "#EA4D4E",
        "ecnmy-tawny": "#9E6214",
        "ecnmy-slate": "#A0AFB5",
        "ecnmy-mustard": "#DCBB06",
        "ecnmy-grape": "#6F50FF",
        "ecnmy-rose": "#ED7A8A",
        "ecnmy-navy": "#036384",
        "ecnmy-pumpkin": "#E57333",
        //secondary highlight colors
      },
    },
  },
  plugins: [],
};
