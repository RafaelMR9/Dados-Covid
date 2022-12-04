/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/templates/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '8xl': '4em'
      },
      fontSize: {
        '2xl': '22px'
      },
      keyframes: {
        bounceLess: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' }
        }
       },
       animation: {
        'bounce-less': 'bounceLess 3s infinite',
       }
    },
  },
  plugins: [],
}
