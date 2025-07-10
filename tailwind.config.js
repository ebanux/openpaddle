
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // Prevents Tailwind's base styles from conflicting with Docusaurus's
  },
  content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}", "./docs/**/*.{md,mdx}"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
};
