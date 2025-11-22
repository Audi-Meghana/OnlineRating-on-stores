/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FBF8FF",
          100: "#F5F1FF",
          200: "#EADFFF",
          300: "#D3C2FF",
          400: "#B492FF",
          500: "#7B3CFF", // primary purple
          600: "#6A2FE6",
          700: "#5326B2",
          800: "#3B1A80",
          900: "#23104D",
        },
        neutral: {
          50: "#FBFBFD",
          100: "#F5F5F8",
          200: "#ECECF2",
          300: "#D9D9E6",
          400: "#BFBFD0",
          500: "#9E9EAF",
          600: "#6F6F7F",
          700: "#4A4A59",
          800: "#2B2B37",
          900: "#111019",
        }
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "Poppins", "Inter", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft-lg': '0 18px 40px rgba(31, 24, 79, 0.08)',
        'purple-glow': '0 10px 40px rgba(123,60,255,0.12)',
        'lift': '0 8px 30px rgba(17,24,39,0.06)',
      },
      borderRadius: {
        'xl': '1rem',
      },
      keyframes: {
        floaty: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        glow: {
          '0%': { boxShadow: '0 6px 30px rgba(123,60,255,0.06)' },
          '50%': { boxShadow: '0 18px 60px rgba(123,60,255,0.12)' },
          '100%': { boxShadow: '0 6px 30px rgba(123,60,255,0.06)' },
        }
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        fadeUp: 'fadeUp 420ms cubic-bezier(.2,.9,.2,1) both',
        marquee: 'marquee 28s linear infinite',
        glow: 'glow 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
