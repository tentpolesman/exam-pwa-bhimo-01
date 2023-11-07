/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './core/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
        screens: {
            xs: '0px',
            xm: '480px',
            sm: '768px',
            md: '1024px',
            lg: '1200px',
            xl: '1920px',
        },
    },
    plugins: [],
};
