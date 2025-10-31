import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'berlin-white': '#ffffff',
        'berlin-light-gray': '#f7f7f7',
        'berlin-red': '#e30613',
        'berlin-dark': '#1b1b1b',
        'berlin-tech-green': '#00c48c',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
