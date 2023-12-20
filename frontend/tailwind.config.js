/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      colors: {
         white: '#ffffff',
         'primary-black': '#2B2C35',
         'primary-blue': '#2B59FF',
         'secondary-blue': '#0429ac',
         'primary-green': '#39FF14',
         'primary-red': '#ee3434',
         'primary-white': '#f8fafc',
         'secondary-white': '#e2e8f0b3',
         'primary-grey': '#747A88',
         'secondary-grey': '#cbd5e1',
      },
      extend: {
         backgroundImage: {
            'hero-bg': 'url(hero-bg.png)',
         },
         screens: {
            xl: '1360px',
         },
      },
   },
   plugins: [],
};
