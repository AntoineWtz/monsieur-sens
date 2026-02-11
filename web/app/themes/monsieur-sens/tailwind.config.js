/** @type {import('tailwindcss').Config} config */
const config = {
    content: [
        "./views/**/*.twig", 
        "./static/**/*.js", 
        "./node_modules/flowbite/**/*.js"
        ],
    theme: {
        extend: {
            colors: {
                'brand-darkest': '#0E0E0E',
                'brand-darker': '#141414',
                'brand-dark': '#262626',
                'muted': '#8A8A8A',
                'muted-light': '#B5B5B5',
                'gold': '#C6A97E',
                'snow': '#F5F5F5',
            },
            fontFamily: {
                sans: ['Manrope', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
                display: ['"Playwrite New Zealand Basic"', 'serif'],
            },
        },
    },
    plugins: [
        import('flowbite/plugin.js')
    ],
};

export default config;