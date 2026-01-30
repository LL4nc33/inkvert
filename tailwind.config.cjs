const kindlePreset = require('@oidanice/ink-ui/preset')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [kindlePreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@oidanice/ink-ui/dist/**/*.{js,mjs}',
  ],
  theme: { extend: {} },
  plugins: [],
}
