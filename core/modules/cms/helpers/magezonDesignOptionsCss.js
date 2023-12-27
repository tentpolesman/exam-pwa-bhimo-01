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
                        tempMappedValues += `padding-left: ${otherDeviceSizeDesignOpts[_opt]}px;`;
                    }
                    if (_opt.indexOf('padding_right') !== -1) {
                        tempMappedValues += `padding-right: ${otherDeviceSizeDesignOpts[_opt]}px;`;
                    }
                    if (_opt.indexOf('padding_top') !== -1) {
                        tempMappedValues += `padding-top: ${otherDeviceSizeDesignOpts[_opt]}px;`;
                    }
                    if (_opt.indexOf('padding_bottom') !== -1) {
                        tempMappedValues += `padding-bottom: ${otherDeviceSizeDesignOpts[_opt]}px;`;
                    }

                    if (_opt.indexOf('margin_left') !== -1) {
                        tempMappedValues += `margin-left: ${otherDeviceSizeDesignOpts[_opt]}px;`;
                    }
                    if (_opt.indexOf('margin_right') !== -1) {
                        tempMappedValues += `margin-right: ${otherDeviceSizeDesignOpts[_opt]}px;`;
                    }
                    if (_opt.indexOf('margin_top') !== -1) {
                        tempMappedValues += `margin-top: ${otherDeviceSizeDesignOpts[_opt]}px;`;
                    }
                    if (_opt.indexOf('margin_bottom') !== -1) {
                        tempMappedValues += `margin-bottom: ${otherDeviceSizeDesignOpts[_opt]}px;`;
                    }
                });

                tempObj[screenOpt] = tempMappedValues;
                Object.assign(generatedStyles, tempObj);
            });
        }

        return generatedStyles;
    };

    // prettier-ignore
    if (classSelector === 'mgz-column') {
        return css.resolve`
            .mgz-column :global(.mgz-element-inner) {
                ${(margin_top || margin_right || margin_bottom || margin_left) ? `
                    margin: ${margin_top || 0}px ${margin_right || 0}px ${margin_bottom || 0}px ${margin_left || 0}px;
                ` : ''}
                ${(padding_top || padding_right || padding_bottom || padding_left) ? `
                    padding: ${padding_top || 0}px ${padding_right || 0}px ${padding_bottom || 0}px ${padding_left || 0}px;
                ` : ''}
                ${border_top_left_radius ? `border-top-left-radius: ${border_top_left_radius || 0}px;` : ''}
                ${border_top_right_radius ? `border-top-right-radius: ${border_top_right_radius || 0}px;` : ''}
                ${border_bottom_left_radius ? `border-bottom-left-radius: ${border_bottom_left_radius || 0}px;` : ''}
                ${border_bottom_right_radius ? `border-bottom-right-radius: ${border_bottom_left_radius || 0}px;` : ''}
                ${border_style ? `border-style: ${border_style};` : ''}
                ${background_position ? `background-position: ${background_position?.split('-').join(' ')};` : ''}
                ${border_top_width ? `border-top-width: ${border_top_width || 0}px;` : ''}
                ${border_right_width ? `border-right-width: ${border_right_width || 0}px;` : ''}
                ${border_bottom_width ? `border-bottom-width: ${border_bottom_width || 0}px;` : ''}
                ${border_left_width ? `border-left-width: ${border_left_width || 0}px;` : ''}
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
    return css.resolve`
        .${classSelector} {
            ${(margin_top || margin_right || margin_bottom || margin_left) ? `
                margin: ${margin_top || 0}px ${margin_right || 0}px ${margin_bottom || 0}px ${margin_left || 0}px;
            ` : ''}
            ${(padding_top || padding_right || padding_bottom || padding_left) ? `
                padding: ${padding_top || 0}px ${padding_right || 0}px ${padding_bottom || 0}px ${padding_left || 0}px;
            ` : ''}
            ${border_top_left_radius ? `border-top-left-radius: ${border_top_left_radius || 0}px;` : ''}
            ${border_top_right_radius ? `border-top-right-radius: ${border_top_right_radius || 0}px;` : ''}
            ${border_bottom_left_radius ? `border-bottom-left-radius: ${border_bottom_left_radius || 0}px;` : ''}
            ${border_bottom_right_radius ? `border-bottom-right-radius: ${border_bottom_left_radius || 0}px;` : ''}
            ${border_style ? `border-style: ${border_style};` : ''}
            ${background_position ? `background-position: ${background_position?.split('-').join(' ')};` : ''}
            ${border_top_width ? `border-top-width: ${border_top_width || 0}px;` : ''}
            ${border_right_width ? `border-right-width: ${border_right_width || 0}px;` : ''}
            ${border_bottom_width ? `border-bottom-width: ${border_bottom_width || 0}px;` : ''}
            ${border_left_width ? `border-left-width: ${border_left_width || 0}px;` : ''}
            ${background_color ? `background-color: ${background_color};` : ''}
        }

        @media screen and (min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl}px) {
            .${classSelector} {
                ${generateStyles()?.lg || ''}
            }
        }
        @media screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px) {
            .${classSelector} {
                ${generateStyles()?.md || ''}
            }
        }
        @media screen and (min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px) {
            .${classSelector} {
                ${generateStyles()?.sm || ''}
            }
        }
        @media screen and (min-width: ${BREAKPOINTS.xs}px) and (max-width: ${BREAKPOINTS.sm}px) {
            .${classSelector} {
                ${generateStyles()?.xs || ''}
            }
        }
    `;
};

export default generateDesignOptions;
