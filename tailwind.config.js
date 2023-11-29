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
                    badge: COLORS.badge,
                },
                // END store config value
                primary: COLORS.primary,
                secondary: COLORS.secondary,
                neutral: COLORS.neutral,
            },
            letterSpacing: LETTER_SPACING,
            lineHeight: LINE_HEIGHT,
            fontSize: FONT_SIZE,
            fontFamily: FONT_FAMILY,
            spacing: SPACING,
            boxShadow: {
                base: `0px 1px 2px 0px ${COLORS.neutral[900]}0F, 0px 1px 3px 0px ${COLORS.neutral[900]}1A`,
                sm: `0px 1px 2px 0px ${COLORS.neutral[900]}0D`,
                md: `0px 2px 4px -1px ${COLORS.neutral[900]}0F, 0px 4px 6px -1px ${COLORS.neutral[900]}1A`,
                lg: `0px 4px 6px -2px ${COLORS.neutral[900]}0D, 0px 10px 15px -3px ${COLORS.neutral[900]}1A`,
                xl: `0px 10px 10px -5px ${COLORS.neutral[900]}0A, 0px 20px 25px -5px ${COLORS.neutral[900]}1A`,
            },
        },
        screens: {
            xs: `${BREAKPOINTS.xs}px`,
            sm: `${BREAKPOINTS.sm}px`,
            md: `${BREAKPOINTS.md}px`,
            lg: `${BREAKPOINTS.lg}px`,
            xl: `${BREAKPOINTS.xl}px`,
        },
        colors: {
            red: COLORS.red,
            yellow: COLORS.yellow,
            green: COLORS.green,
        },
    },
    plugins: [
        // eslint-disable-next-line global-require
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
};
