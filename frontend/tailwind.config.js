/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E378B', // Logo Royal Blue
          dark: '#112361', // Darker navy for hovers
          light: '#314FA7', // Lighter blue for active borders
        },
        secondary: {
          DEFAULT: '#75BB3F', // Logo Leaf Green
          dark: '#5C9430', // Darker green for hovers
          light: '#91D15C', // Lighter green for glow effects
        },
        light: {
          DEFAULT: '#F6F9FA', // White / Neutral light background
          dark: '#E2E8F0', // Slate 200 equivalent for borders/text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"General Sans"', 'sans-serif'],
        serif: ['"General Sans"', 'sans-serif'],
        poppins: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 8px 32px 0 rgba(30, 55, 139, 0.08)',
        'glow-primary': '0 0 20px 2px rgba(30, 55, 139, 0.15)',
        'glow-secondary': '0 0 20px 2px rgba(117, 187, 63, 0.2)',
      }
    },
  },
  plugins: [],
}
