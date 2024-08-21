import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    { pattern: /text-tagColor-\d+/ },
    { pattern: /bg-tagBgColor-\d+/ },
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Do Hyeon', 'sans-serif'],
        serif: ['Acme', 'serif'],
      },

      colors: {
        blue: { DEFAULT: '#1d4ed8', dark: '#1e3a8a' },
        navy: '#172554',
        pink: { DEFAULT: '#be185d', dark: '#831843' },
        red: '#b91c1c',
        orange: { light: '#fff7ed', DEFAULT: '#ea580c', dark: '#c2410c' },
        gray: { light: '#d1d5db', DEFAULT: '#9ca3af', dark: '#273444' },
        black: '#09090b',
      },
    },
  },
  plugins: [],
} satisfies Config
export default config
