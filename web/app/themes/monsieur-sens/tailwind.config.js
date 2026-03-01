/** @type {import('tailwindcss').Config} config */
import plugin from "tailwindcss/plugin";
const config = {
  content: ["./views/**/*.twig", "./static/**/*.js"],
  theme: {
    extend: {
      colors: {
        "ms-black": "#0E0E0E",
        "ms-light-black": "#262626",
        "ms-white": "#F5F5F5",
        "ms-gold": "#F5CB5C",
      },
      letterSpacing: {
        display: "0.01em",
      },
      lineHeight: {
        display: "1.5",
      },
      fontFamily: {
        sans: [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Roboto",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        display: ["Gabriela", "serif"],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      addUtilities(
        {
          ".font-display": {
            letterSpacing: `${theme("letterSpacing.display")} !important`,
            lineHeight: `${theme("lineHeight.display")} !important`,
          },
        },
        {
          variants: ["responsive"],
        },
      );
    }),
  ],
};

export default config;
