/** @type {import('tailwindcss').Config} config */
const config = {
    content: [
        "./views/**/*.twig", 
        "./static/**/*.js"
        ],
    theme: {
        extend: {
            colors: {
                'ms-black': '#0E0E0E',
                'ms-light-black': '#262626',
                'ms-white': '#F5F5F5',
                'ms-gold': '#F5CB5C',
            },
            fontFamily: {
                sans: ['Manrope', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
                display: ['"Playwrite New Zealand Basic"', 'serif'],
            },
        },
    },
    plugins: [],
};

export default config;