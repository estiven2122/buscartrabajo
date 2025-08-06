/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Colores del desierto - tonos tierra
        desert: {
          50: '#fdf8f3',
          100: '#f9ede1',
          200: '#f2d7c2',
          300: '#e8ba97',
          400: '#dc956a',
          500: '#d4784a',
          600: '#c6633f',
          700: '#a54f36',
          800: '#854133',
          900: '#6c372c',
          950: '#3a1c16',
        },
        // Colores del oasis - tonos verdes y azules
        oasis: {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6e0',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Colores del camello - tonos marrones cálidos
        camel: {
          50: '#fdf7f0',
          100: '#faebd7',
          200: '#f4d5ae',
          300: '#ecb87a',
          400: '#e39944',
          500: '#dc7f1f',
          600: '#cd6815',
          700: '#aa5014',
          800: '#8a4018',
          900: '#703517',
          950: '#3e1a09',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'desert': '0 4px 6px -1px rgba(212, 120, 74, 0.1), 0 2px 4px -1px rgba(212, 120, 74, 0.06)',
        'oasis': '0 4px 6px -1px rgba(20, 184, 166, 0.1), 0 2px 4px -1px rgba(20, 184, 166, 0.06)',
      },
      backgroundImage: {
        'desert-gradient': 'linear-gradient(135deg, #fdf8f3 0%, #f2d7c2 100%)',
        'oasis-gradient': 'linear-gradient(135deg, #f0fdf9 0%, #ccfbef 100%)',
        'camel-gradient': 'linear-gradient(135deg, #fdf7f0 0%, #f4d5ae 100%)',
      }
    },
  },
  plugins: [],
}