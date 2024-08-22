import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        //기아 타이거즈
        'team-기아 타이거즈-background': '#b91c1c',

        //삼성 라이온즈
        'team-삼성 라이온즈-background': '#3b82f6',

        //LG 트윈스
        'team-LG 트윈스-background': '#9d174d',

        //두산 베어스
        'team-두산 베어스-background': '#312e81',

        //SSG 랜더스
        'team-SSG 랜더스-background': '#dc2626',

        //KT 위즈
        'team-KT 위즈-background': '#0a0a0a',

        //한화 이글스
        'team-한화 이글스-background': '#ea580c',

        //롯데 자이언츠
        'team-롯데 자이언츠-background': '#1e3a8a',

        //NC 다이노스
        'team-NC 다이노스-background': '#0369a1',

        //키움 히어로즈
        'team-키움 히어로즈-background': '#be185d',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
