/* eslint-disable indent */
// eslint-disable-next-line import/prefer-default-export
export const frontendConfig = (pwaConfig) => {
    if (pwaConfig) {
        const {
            primary_color,
            secondary_color,
            font_color,
            background_color,
            button_background_color,
            error_color,
            warning_msg_color,
            success_msg_color,
            link_color,
            link_font_decoration,
            link_hover_color,
            link_font_hover_decoration,
            button_text_color,
            default_font,
            button_background_hover_color,
            button_disabled_text_color,
            button_border_color,
            button_disabled_background_color,
            button_border_hover_color,
            button_text_hover_color,
            heading_font,
        } = pwaConfig;

        return `
            :root {
                --color-pwa-primary_color: ${primary_color || '#000000'};
                --color-pwa-secondary_color: ${secondary_color || '#818181'};
                --color-pwa-font_color: ${font_color || '#000000'};
                --color-pwa-background_color: ${background_color || '#FFFFFF'};
                --color-pwa-button_background_color: ${button_background_color || '#000000'};
                --color-pwa-error_color: ${error_color || '#FF0000'};
                --color-pwa-warning_msg_color: ${warning_msg_color || '#FE5D26'};
                --color-pwa-success_msg_color: ${success_msg_color || '#46954D'};
                --color-pwa-link_color: ${link_color};
                --color-pwa-link_hover_color: ${link_hover_color};
                --color-pwa-button_text_color: ${button_text_color};
                --color-pwa-button_background_hover_color: ${button_background_hover_color};
                --color-pwa-button_disabled_text_color: ${button_disabled_text_color};
                --color-pwa-button_border_color: ${button_border_color};
                --color-pwa-button_disabled_background_color: ${button_disabled_background_color};
                --color-pwa-button_border_hover_color: ${button_border_hover_color};
                --color-pwa-button_text_hover_color: ${button_text_hover_color};

                --font-pwa-default_font: ${default_font};
                --font-pwa-heading_font: ${heading_font};
                --font-pwa-link_font_decoration: ${link_font_decoration};
                --font-pwa-link_font_hover_decoration: ${link_font_hover_decoration};


            }
        `;
    }
    return `
        body {
            background-color: #FFFFFF !important;
            color: #000000 !important;
        }

        main {
            background-color: #FFFFFF !important;
        }
        .nav > li > a {
            background-color: #FFFFFF !important;
            color: #000000 !important;
        }
        a {
            color: #000000 !important;
        }
        a:hover {
            color: #000000 !important;
        }
    `;
};
