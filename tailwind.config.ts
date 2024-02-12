/* eslint-disable global-require */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      Poppins: ['Poppins', 'sans-serif'],
      Dancing: ['Dancing Script', 'cursive'],
    },
  },
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'nord',
      {
        mytheme: {
          primary: '#404764',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
export default config;
