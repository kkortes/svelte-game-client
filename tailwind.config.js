/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      screens: {
        xs: {
          min: '0px',
          max: '766px'
        }
      }
    }
  },
  plugins: []
};
