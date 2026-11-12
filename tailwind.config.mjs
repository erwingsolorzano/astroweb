/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Anton', 'Impact', 'Arial Narrow', 'sans-serif'],
        sans: ['Archivo', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        mandarin: '#F0560A',
        forest: {
          DEFAULT: '#015D47',
          line: '#2E7A66',
          muted: '#BFD6CD',
          body: '#DCE8E2',
        },
        crest: '#E8F354',
        cream: {
          DEFAULT: '#F5ECDC',
          2: '#EADDC5',
        },
        ink: '#011A13',
      },
      backgroundImage: {
        checker: 'repeating-linear-gradient(90deg, #015D47 0 44px, #F5ECDC 44px 88px)',
      },
      transitionTimingFunction: {
        snap: 'cubic-bezier(.2,.7,.1,1)',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(232, 243, 84, 0.7)' },
          '100%': { boxShadow: '0 0 0 9px rgba(232, 243, 84, 0)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.6s ease-out infinite',
      },
    },
  },
  plugins: [],
};
