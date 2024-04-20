import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'
import { CSSRuleObject } from 'tailwindcss/types/config'

const config: Config = {
  prefix: '',
  mode: 'jit',
  important: false,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        header: '110',
        overlay: '120',
        modal: '121',
        sidebar: '130',
        spinner: '140'
      },
      transitionProperty: {
        spacing: 'transform, margin, padding, width, height, opacity'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)'
          }
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)'
          }
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out'
      },
      boxShadow: {
        custom: '10px 10px 20px 0px rgb(0 0 0 / 25%)',
        dark: '10px 10px 10px 0px rgb(255 255 255 / 10%)'
      },
      colors: {
        primary: colors.blue,
        info: colors.yellow,
        danger: colors.red,
        success: colors.green
      },
      backgroundImage: {
        'conic-gradient': 'conic-gradient(var(--tw-gradient-stops))',
        'label-gradient-input':
          'linear-gradient(to bottom, transparent 55%, white 55%, white 70%, transparent 70%)',
        'label-gradient-input-dark':
          'linear-gradient(to bottom, transparent 55%, #26272F 55%, #26272F 70%, transparent 70%)'
      }
    },
    fontFamily: {
      poppins: ['Poppins'],
      nunito: ['Nunito Sans', 'sans-serif']
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    }
  },
  button: {
    base: 'flex-none font-semibold ',
    variants: {
      size: {
        default: 'px-4 py-2.5 text-xs'
      },
      colors: {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white',
        success: 'bg-success-500 hover:bg-success-600 text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        info: 'bg-yellow-500 hover:bg-yellow-600 text-white'
      },
      rounded: {
        default: 'rounded-md'
      }
    },
    defaultVariants: {
      size: 'default',
      rounded: 'default',
      colors: 'primary'
    }
  },
  variants: {
    extend: {},
    scrollbar: ['dark', 'rounded']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
    plugin(({ theme, addUtilities }) => {
      const neonUtilities: CSSRuleObject = {}
      const colors = theme('colors')
      neonUtilities[`.neon-none`] = {
        boxShadow: `none`
      }

      if (colors) {
        for (const color in colors) {
          if (typeof colors[color] === 'string') {
            neonUtilities[`.neon-${color}`] = {
              boxShadow: `10px 10px 20px 0px ${color}25, 0 0 5px ${color}25`
            }
          }
          if (typeof colors[color] === 'object') {
            neonUtilities[`.neon-${color}-50`] = {
              boxShadow: `10px 10px 20px 0px ${colors[color]['50']}25, 0 0 5px ${colors[color]['100']}25`
            }
            neonUtilities[`.neon-${color}-100`] = {
              boxShadow: `10px 10px 20px 0px ${colors[color]['100']}25, 0 0 5px ${colors[color]['200']}25`
            }
            neonUtilities[`.neon-${color}-200`] = {
              boxShadow: `5px 5px 20px 0px ${colors[color]['200']}25, 0 0 5px ${colors[color]['300']}25`
            }
            neonUtilities[`.neon-${color}-300`] = {
              boxShadow: `5px 5px 20px 0px ${colors[color]['300']}25, 0 0 5px ${colors[color]['400']}25`
            }
            neonUtilities[`.neon-${color}-400`] = {
              boxShadow: `5px 5px 20px 0px ${colors[color]['400']}25, 0 0 5px ${colors[color]['500']}25`
            }
            neonUtilities[`.neon-${color}-500`] = {
              boxShadow: `5px 5px 20px 0px ${colors[color]['500']}25, 0 0 5px ${colors[color]['600']}25`
            }
            neonUtilities[`.neon-${color}-600`] = {
              boxShadow: `5px 5px 20px 0px ${colors[color]['600']}25, 0 0 5px ${colors[color]['700']}25`
            }
            neonUtilities[`.neon-${color}-700`] = {
              boxShadow: `5px 5px 20px 0px ${colors[color]['700']}25, 0 0 5px ${colors[color]['800']}25`
            }
            neonUtilities[`.neon-${color}-800`] = {
              boxShadow: `5px 5px 20px 0px ${colors[color]['800']}25, 0 0 5px ${colors[color]['900']}25`
            }
            neonUtilities[`.neon-${color}-900`] = {
              boxShadow: `5px 5px 20px 0px ${colors[color]['900']}25, 0 0 5px ${colors[color]['900']}25`
            }
            neonUtilities[`.neon-${color}-950`] = {
              boxShadow: `5px 5px 20px 0px ${colors[color]['950']}25, 0 0 5px ${colors[color]['950']}25`
            }
          }
        }
      }
      addUtilities(neonUtilities)
    })
  ]
}

export default config
