/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { BREAKPOINTS } from '@root/core/theme/vars';
import css from 'styled-jsx/css';

const generateDesignOptions = (classSelector, designOptions) => {
    const {
        margin_top,
        margin_right,
        margin_bottom,
        margin_left,
        padding_top,
        padding_right,
        padding_bottom,
        padding_left,
        border_top_left_radius,
        border_top_right_radius,
        border_bottom_left_radius,
        border_bottom_right_radius,
        border_style,
        border_top_width,
        border_right_width,
        border_left_width,
        border_bottom_width,
        background_position,
        background_color,
        device_type,
        type,
        ...otherDeviceSizeDesignOpts
    } = designOptions;
    const prefixes = ['lg', 'md', 'sm', 'xs'];

    const generateOtherDesignOptions = (opts) => {
        const mappedValues = {};
        prefixes.forEach((prefix) => {
            const filteredOpts = Object.keys(opts).filter((k) => k.indexOf(prefix) !== -1);
            Object.assign(mappedValues, { [prefix]: filteredOpts });
        });
        return mappedValues;
    };

    const generateStyles = () => {
        const generatedStyles = {};
        if (device_type === 'custom') {
            const opts = generateOtherDesignOptions(otherDeviceSizeDesignOpts);
            Object.keys(opts).forEach((screenOpt) => {
                const tempObj = {};
                let tempMappedValues = '';

                opts[screenOpt].forEach((_opt) => {
                    if (_opt.indexOf('padding_left') !== -1) {
                        tempMappedValues += `padding-left: ${Number(otherDeviceSizeDesignOpts[_opt]) || 0}px;`;
                    }
                    if (_opt.indexOf('padding_right') !== -1) {
                        tempMappedValues += `padding-right: ${Number(otherDeviceSizeDesignOpts[_opt]) || 0}px;`;
                    }
                    if (_opt.indexOf('padding_top') !== -1) {
                        tempMappedValues += `padding-top: ${Number(otherDeviceSizeDesignOpts[_opt]) || 0}px;`;
                    }
                    if (_opt.indexOf('padding_bottom') !== -1) {
                        tempMappedValues += `padding-bottom: ${Number(otherDeviceSizeDesignOpts[_opt]) || 0}px;`;
                    }

                    if (_opt.indexOf('margin_left') !== -1) {
                        tempMappedValues += `margin-left: ${Number(otherDeviceSizeDesignOpts[_opt]) || 0}px;`;
                    }
                    if (_opt.indexOf('margin_right') !== -1) {
                        tempMappedValues += `margin-right: ${Number(otherDeviceSizeDesignOpts[_opt]) || 0}px;`;
                    }
                    if (_opt.indexOf('margin_top') !== -1) {
                        tempMappedValues += `margin-top: ${Number(otherDeviceSizeDesignOpts[_opt]) || 0}px;`;
                    }
                    if (_opt.indexOf('margin_bottom') !== -1) {
                        tempMappedValues += `margin-bottom: ${Number(otherDeviceSizeDesignOpts[_opt]) || 0}px;`;
                    }
                });

                tempObj[screenOpt] = tempMappedValues;
                Object.assign(generatedStyles, tempObj);
            });
        }

        return generatedStyles;
    };

    // prettier-ignore
    if (type === 'column') {
        return css.resolve`
            .mgz-column :global(.mgz-element-inner) {
                ${(margin_top || margin_right || margin_bottom || margin_left) ? `
                    margin: ${Number(margin_top) || 0}px ${Number(margin_right) || 0}px ${Number(margin_bottom) || 0}px ${Number(margin_left) || 0}px;
                ` : ''}
                ${(padding_top || padding_right || padding_bottom || padding_left) ? `
                    padding: ${Number(padding_top) || 0}px ${Number(padding_right) || 0}px ${Number(padding_bottom) || 0}px ${Number(padding_left) || 0}px;
                ` : 'padding: 10px;'}
                ${border_top_left_radius ? `border-top-left-radius: ${Number(border_top_left_radius) || 0}px;` : ''}
                ${border_top_right_radius ? `border-top-right-radius: ${Number(border_top_right_radius) || 0}px;` : ''}
                ${border_bottom_left_radius ? `border-bottom-left-radius: ${Number(border_bottom_left_radius) || 0}px;` : ''}
                ${border_bottom_right_radius ? `border-bottom-right-radius: ${Number(border_bottom_left_radius) || 0}px;` : ''}
                ${border_style ? `border-style: ${border_style};` : ''}
                ${background_position ? `background-position: ${background_position?.split('-').join(' ')};` : ''}
                ${border_top_width ? `border-top-width: ${Number(border_top_width) || 0}px;` : ''}
                ${border_right_width ? `border-right-width: ${Number(border_right_width) || 0}px;` : ''}
                ${border_bottom_width ? `border-bottom-width: ${Number(border_bottom_width) || 0}px;` : ''}
                ${border_left_width ? `border-left-width: ${Number(border_left_width) || 0}px;` : ''}
                ${background_color ? `background-color: ${background_color};` : ''}
            }

            @media screen and (min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl}px) {
                .mgz-column :global(.mgz-element-inner) {
                    ${generateStyles()?.lg || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px) {
                .mgz-column :global(.mgz-element-inner) {
                    ${generateStyles()?.md || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px) {
                .mgz-column :global(.mgz-element-inner) {
                    ${generateStyles()?.sm || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.xs}px) and (max-width: ${BREAKPOINTS.sm}px) {
                .mgz-column :global(.mgz-element-inner) {
                    ${generateStyles()?.xs || ''}
                }
            }
        `;
    }
    if (type === 'row') {
        return css.resolve`
            .mgz-row {
                ${(margin_top || margin_right || margin_bottom || margin_left) ? `
                    margin: ${Number(margin_top) || 0}px ${Number(margin_right) || 0}px ${Number(margin_bottom) || 0}px ${Number(margin_left) || 0}px;
                ` : 'margin: 0 -10px;'}
                ${(padding_top || padding_right || padding_bottom || padding_left) ? `
                    padding: ${Number(padding_top) || 0}px ${Number(padding_right) || 0}px ${Number(padding_bottom) || 0}px ${Number(padding_left) || 0}px;
                ` : ''}
                ${border_top_left_radius ? `border-top-left-radius: ${Number(border_top_left_radius) || 0}px;` : ''}
                ${border_top_right_radius ? `border-top-right-radius: ${Number(border_top_right_radius) || 0}px;` : ''}
                ${border_bottom_left_radius ? `border-bottom-left-radius: ${Number(border_bottom_left_radius) || 0}px;` : ''}
                ${border_bottom_right_radius ? `border-bottom-right-radius: ${Number(border_bottom_left_radius) || 0}px;` : ''}
                ${border_style ? `border-style: ${border_style};` : ''}
                ${background_position ? `background-position: ${background_position?.split('-').join(' ')};` : ''}
                ${border_top_width ? `border-top-width: ${Number(border_top_width) || 0}px;` : ''}
                ${border_right_width ? `border-right-width: ${Number(border_right_width) || 0}px;` : ''}
                ${border_bottom_width ? `border-bottom-width: ${Number(border_bottom_width) || 0}px;` : ''}
                ${border_left_width ? `border-left-width: ${Number(border_left_width) || 0}px;` : ''}
                ${background_color ? `background-color: ${background_color};` : ''}
            }

            @media screen and (min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl}px) {
                .mgz-row {
                    ${generateStyles()?.lg || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px) {
                .mgz-row {
                    ${generateStyles()?.md || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px) {
                .mgz-row {
                    ${generateStyles()?.sm || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.xs}px) and (max-width: ${BREAKPOINTS.sm}px) {
                .mgz-row {
                    ${generateStyles()?.xs || ''}
                }
            }
        `;
    }
    return css.resolve`
        .${classSelector} :global(> *) {
            ${(margin_top || margin_right || margin_bottom || margin_left) ? `
                margin: ${Number(margin_top) || 0}px ${Number(margin_right) || 0}px ${Number(margin_bottom) || 0}px ${Number(margin_left) || 0}px;
            ` : ''}
            ${(padding_top || padding_right || padding_bottom || padding_left) ? `
                padding: ${Number(padding_top) || 0}px ${Number(padding_right) || 0}px ${Number(padding_bottom) || 0}px ${Number(padding_left) || 0}px;
            ` : ''}
            ${border_top_left_radius ? `border-top-left-radius: ${Number(border_top_left_radius) || 0}px;` : ''}
            ${border_top_right_radius ? `border-top-right-radius: ${Number(border_top_right_radius) || 0}px;` : ''}
            ${border_bottom_left_radius ? `border-bottom-left-radius: ${Number(border_bottom_left_radius) || 0}px;` : ''}
            ${border_bottom_right_radius ? `border-bottom-right-radius: ${Number(border_bottom_left_radius) || 0}px;` : ''}
            ${border_style ? `border-style: ${border_style};` : ''}
            ${background_position ? `background-position: ${background_position?.split('-').join(' ')};` : ''}
            ${border_top_width ? `border-top-width: ${Number(border_top_width) || 0}px;` : ''}
            ${border_right_width ? `border-right-width: ${Number(border_right_width) || 0}px;` : ''}
            ${border_bottom_width ? `border-bottom-width: ${Number(border_bottom_width) || 0}px;` : ''}
            ${border_left_width ? `border-left-width: ${Number(border_left_width) || 0}px;` : ''}
            ${background_color ? `background-color: ${background_color};` : ''}
        }

        @media screen and (min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl}px) {
            .${classSelector} :global(> *) {
                ${generateStyles()?.lg || ''}
            }
        }
        @media screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px) {
            .${classSelector} :global(> *) {
                ${generateStyles()?.md || ''}
            }
        }
        @media screen and (min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px) {
            .${classSelector} :global(> *) {
                ${generateStyles()?.sm || ''}
            }
        }
        @media screen and (min-width: ${BREAKPOINTS.xs}px) and (max-width: ${BREAKPOINTS.sm}px) {
            .${classSelector} :global(> *) {
                ${generateStyles()?.xs || ''}
            }
        }
    `;
};

export default generateDesignOptions;
