const colors = require('tailwindcss/colors');
function getSemanticColors(color) {
  return {
    light: color[100],
    DEFAULT: color[500],
    dark: color[700]
  }
}


module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '4/5': '80%',
    },
    maxHeight: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '4/5': '80%',
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    left: {
      '17': '4.2rem',
      '18': '4.4rem',
      '19': '4.6rem',
      '19.5': '4.8rem',
      '1/5': '20%',
      '1/5': '20%',
    },
    extend: {
      colors: {
        secondary: {
          light: "#686767",
          DEFAULT: "#292929",
          darkL: "#0f0f0f",
        },
        primary: {
          
        }
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        26: '26px',
        28: '28px',
        30: '30px',
        32: '32px',
        34: '34px',
        64: '64px',
        128: '128px',
      },
      backgroundColor: {

      },
      height: {
        98: '25rem',
        100: '26rem',
        102: '27rem',
        130: '28rem',
        134: '29rem',
        138: '30rem',
        142: '35rem',
        146: '39rem',
        150: '42rem',
        152: '44rem',
      },
      width: {
        '102': '26rem',
        '108': '28rem',
        '112': '30rem',
        '116': '32rem',
        '120': '34rem',
      },
      rorate: {
        '-360': '-360deg',
        '-180': '-180deg',
          '-90': '-90deg',
         '-45': '-45deg',
          '0': '0',
          '45': '45deg',
          '90': '90deg',
         '135': '135deg',
          '180': '180deg',
         "270": '270deg',
      },
      zIndex: {
        50: '50',
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
        200: '200',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fade: {
          from: { opacity: 0},
          to: { opacity: 1}
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(100%)' },
          to: { opacity: 1, transform: 'translateY(0%)' }
        },
        hidden: {
          from: { opacity: 1 },
          to: { opacity: 0 }
        },
        slideDown: {
          from: { opacity: 0, transform: 'translateY(0)' },
          to: { opacity: 1, transform: 'translateY(100%)' }
        },
        slideLeftToRight: {
          '0%': { left: '-100%'},
          '100%': { left: 0 }
        },
        slideRightToLeft: {
          '0%': { right: '-100%' },
          '100%': { right: 0 }
        }
      },
      animation: {
        wiggle: 'wiggle 1s cubic-bezier(0.17, 0.04, 0.03, 0.94) infinite',
        fade: 'fade 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-in forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'slide-left': 'slideLeftToRight 0.4s ease-in forwards',
        'slide-right': 'slideRightToLeft 0.4s ease-in forwards',
        hidden: 'hidden 0.4s ease-in forwards',
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ..
  ],
}
