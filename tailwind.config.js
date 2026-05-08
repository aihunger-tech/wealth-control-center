/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Added just in case
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: '#000000',
          dark: '#0a0a0a',
          gray: '#1a1a1a',
          lightGray: '#2d2d2d',
          accent: '#3b82f6', 
          up: '#10b981',     
          down: '#ef4444',   
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
