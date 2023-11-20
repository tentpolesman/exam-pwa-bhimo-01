import {
    BREAKPOINTS, COLORS, FONT_FAMILY, FONT_SIZE, LETTER_SPACING, LINE_HEIGHT, SPACING,
} from './core/theme/vars';

// full list https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './core/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                /**
                 * START store config value
                 */
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
                // END store config value
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
                accent: {
                    eucalyptus: {
                        ...COLORS.accent.eucalyptus,
                        DEFAULT: COLORS.accent.eucalyptus[300],
                    },
                    saffron_mango: {
                        ...COLORS.accent.saffron_mango,
                        DEFAULT: COLORS.accent.saffron_mango[300],
                    },
                    red_orange: {
                        ...COLORS.accent.red_orange,
                        DEFAULT: COLORS.accent.red_orange[200],
                    },
                },
            },
            letterSpacing: LETTER_SPACING,
            lineHeight: LINE_HEIGHT,
            fontSize: FONT_SIZE,
            fontFamily: FONT_FAMILY,
            spacing: SPACING,
        },
        screens: {
            xs: `${BREAKPOINTS.xs}px`,
            sm: `${BREAKPOINTS.sm}px`,
            md: `${BREAKPOINTS.md}px`,
            lg: `${BREAKPOINTS.lg}px`,
            xl: `${BREAKPOINTS.xl}px`,
        },
    },
    plugins: [],
};
