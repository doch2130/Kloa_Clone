import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      // 'sm': '576px',
      // => @media (min-width: 576px) { ... }
      'sm': {'max': '500px'},
      // max-width: 500px
      'smlg': {'min': '500px', 'max': '1069px'},
      // min-width: 500px and max-width: 1069px
      'md': '960px',
      // => @media (min-width: 960px) { ... }
      'mlg': {'max': '1069px'},
      // max-width: 1069px
      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
}
export default config
