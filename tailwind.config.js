/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './core/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                font: 'var(--color-font)',
                'bg-color': 'var(--color-bg)',
                btn: 'var(--color-btn-bg)',
                error: 'var(--color-btn-error)',
                warning: 'var(--color-btn-warning)',
                success: 'var(--color-btn-success)',
                'gray-primary': '#DEDEDE',
                'gray-secondary': '#B4B4B4',
                'gray-third': '#6E6E6E',
                'gray-light': '#F8F8F8',
                orange: '#FE5D26',
                green: '#46954D',
            },
        },
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
