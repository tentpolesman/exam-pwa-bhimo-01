import { COLORS } from './core/theme/vars';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './core/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                // this refers to colors set in store config
                pwa: {
                    primary: 'var(--color-pwa-primary_color)',
                    secondary: 'var(--color-pwa-secondary_color)',
                    font: 'var(--color-pwa-font_color)',
                    background: 'var(--color-pwa-background_color)',
                    error: 'var(--color-pwa-error_color)',
                    warning: 'var(--color-pwa-warning_msg_color)',
                    success: 'var(--color-pwa-success_msg_color)',
                    link: 'var(--color-pwa-link_color)',
                    link_hover: 'var(--color-pwa-link_hover_color)',
                    button_text: 'var(--color-pwa-button_text_color)',
                    button_text_hover: 'var(--color-pwa-button_text_hover_color)',
                    button_background: 'var(--color-pwa-button_background_color)',
                    button_background_hover: 'var(--color-pwa-button_background_hover_color)',
                    button_border: 'var(--color-pwa-button_border_color)',
                    button_border_hover: 'var(--color-pwa-button_border_hover_color)',
                    button_disabled_text: 'var(--color-pwa-button_disabled_text_color)',
                    button_disabled_background: 'var(--color-pwa-button_disabled_background_color)',
                },
                // main colors
                primary: {
                    ...COLORS.primary,
                    DEFAULT: COLORS.primary[300],
                },
                secondary: {
                    ...COLORS.secondary,
                    DEFAULT: COLORS.secondary[400],
                },
                neutral: {
                    ...COLORS.neutral,
                    DEFAULT: COLORS.neutral[400],
                },
                label: {
                    eucalyptus: {
                        ...COLORS.label.eucalyptus,
                        DEFAULT: COLORS.label.eucalyptus[300],
                    },
                    saffron_mango: {
                        ...COLORS.label.saffron_mango,
                        DEFAULT: COLORS.label.saffron_mango[300],
                    },
                    red_orange: {
                        ...COLORS.label.red_orange,
                        DEFAULT: COLORS.label.red_orange[200],
                    },
                },
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
