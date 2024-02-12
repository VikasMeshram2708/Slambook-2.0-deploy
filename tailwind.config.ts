import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      Poppins: ['Poppins', 'sans-serif'],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          'base-100': '#1a1c26',
        },
      },
    ],
  },
  // @ts-ignore
  plugins: [daisyui],
};
export default config;
