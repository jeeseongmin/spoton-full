/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#96C2FF",
          DEFAULT: "#06367A",
        },
        black: "#1A1A1A",
        white: {
          DEFAULT: "#FFFFFF",
          dull: "#F9F9F9",
        },
        gray: {
          light: "#F2F2F2",
          tinted: "#E6E6E6",
          middle: "#CCCCCC",
          dull: "#9C9C9C",
          dark: "#616161",
        },
        red: {
          DEFAULT: "#FF6161",
          light: "#FF8080",
        },
        yellow: {
          light: "#FFD79B",
        },
        saturday: "#4D54FF",
        kakaoBG: "#FFE502",
        kakaoFont: "#3C1E1D",
        loginBG: "#06367A",
      },
      fontSize: {
        base: "15px",
        small: "13px",
      },
      fontFamily: {
        sans: ["Noto Sans KR"],
      },
      keyframes: {
        dropdownOpen: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      dropShadow: {
        base: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "dropdown-open": "dropdownOpen 0.4s ease",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
