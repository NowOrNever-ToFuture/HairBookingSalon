/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-', // Thêm tiền tố 'tw-' cho tất cả các lớp Tailwind
  content: [
    "./index.html",
    "./src/***/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],

}

