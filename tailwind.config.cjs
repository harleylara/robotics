/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
             fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
                mono: ['Roboto Mono', 'sans-serif'],
                pt: ['PT Serif', 'serif'],
                cormorant: ['Cormorant Garamond', 'serif'], /* I'm leaving cormorant due to the elegancy, but is not in use yet */
            },
            colors: {
                'primary-dark': '#101010',
                'dark-50': '#181818',
                'dark-100': '#333333',
                'dark-200': '#494949',
                'primary-white': '#d1d5db'
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}
