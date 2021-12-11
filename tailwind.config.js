const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    cursor: {
      zoom: 'zoom-in',
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      crosshair: 'crosshair',
    },
    screens: {
      'print': {'raw': 'print'},
      'landscape': {'raw': '(orientation: landscape)'},
      'portrait': {'raw': '(orientation: portrait)'},

      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1536px',

      'mm-sm': {'max': '767px'},
      'mm-md': {'min': '768px', 'max': '1023px'},
      'mm-lg': {'min': '1024px', 'max': '1279px'},
      'mm-xl': {'min': '1280px', 'max': '1535px'},
      'mm-xxl': {'min': '1536px'},
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      green: colors.green,
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {
      width: {
        'wc': 'calc(100% - 375px)',
      },
      height: {
        'nn': 'calc(100vh - 80px)',
        'cart': 'calc(100% - 240px)',        
      },
      minHeight: {
        'foot': 'calc(100vh - 420px)',
      },
      lineHeight: {
      '20': '5.5rem',
      },
      keyframes: {
        horizontalTextScrolling: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          'to': { transform: 'translate3d(-50%, 0, 0)' },
        }
      },
      animation: {
        horizontalTextScrolling: 'horizontalTextScrolling 60s linear infinite',
      },
      transitionDelay: {
        '0': '0ms',
      },
      transitionDuration: {
        '0': '0ms',
        '5000': '5000ms',
      },
      fontFamily: {
        'title': ['"Yeseva One"'],
        'text': ['"Lexend"'],
        'fat': ['"Georgia"']
      }
    }
  },
  variants: {

  },
  plugins: [],
}
