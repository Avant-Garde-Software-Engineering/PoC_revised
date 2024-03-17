/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkest': 'var(--darkest)',
        'dark': 'var(--dark)',
        'light': 'var(--light)',
        'mask': 'var(--mask)',
        'textColor': 'var(--textColor)',
        'textDarkColor': 'var(--textDarkColor)'
      }
    },
  },
  plugins: [],
};
