/* eslint-disable no-nested-ternary */
import MagezonColumn from '@core_modules/cms/components/cms-renderer/magezon/MagezonColumn';
import cx from 'classnames';
import React from 'react';

const MagezonRow = (props) => {
    const {
        elements,
        xs_hide,
        sm_hide,
        md_hide,
        lg_hide,
        storeConfig,
        max_width,
        content_align,
        border_style,
        background_position,
        background_color,
        border_top_width,
        border_right_width,
        border_bottom_width,
        border_left_width,
        margin_top,
        margin_right,
        margin_bottom,
        margin_left,
        padding_top,
        padding_right,
        padding_bottom,
        padding_left,
    } = props;

    return (
        <>
            <div
                className={cx('mgz-row', 'flex', 'flex-wrap', {
                    'mgz-element-row-max-width': max_width && max_width !== '',
                    'max-sm:hidden': xs_hide,
                    'max-md:hidden': sm_hide,
                    'max-lg:hidden': md_hide,
                    'max-xl:hidden': lg_hide,
                })}
            >
                {elements && elements.length > 0 && elements.map((item, key) => <MagezonColumn key={key} {...item} storeConfig={storeConfig} />)}
            </div>
            <style jsx>
                {`
                    .mgz-row {
                        width: 100%;
                        border-style: ${border_style || 'solid'};
                        background-position: ${background_position?.split('-').join(' ')};
                        background-color: ${background_color || 'transparent'};
                        border-width: ${border_top_width || 0}px ${border_right_width || 0}px ${border_bottom_width || 0}px
                            ${border_left_width || 0}px;
                        margin: ${margin_top || 0}px ${margin_right || 0}px ${margin_bottom || 0}px ${margin_left || 0}px;
                        padding: ${padding_top || 0}px ${padding_right || 0}px ${padding_bottom || 0}px ${padding_left || 0}px;
                    }
                    .mgz-element-row-max-width {
                        width: ${max_width}px;
                        max-width: 100%;
                        margin: ${content_align === 'left' ? 'auto 0 0 0' : content_align === 'center' ? 'auto' : '0 0 0 auto'};
                    }
                    .mgz-row :global(.mgz-element.inline-block) {
                        width: initial;
                        margin-left: -10px;
                        margin-right: -10px;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonRow;
