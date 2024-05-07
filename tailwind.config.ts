import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        upDown: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(15px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'header-logo': 'https://gaviaspreview.com/wp/gowilds/wp-content/uploads/2022/12/pattern-topbar.png',
      },
    },
  },
  plugins: [],
};
export default config;
