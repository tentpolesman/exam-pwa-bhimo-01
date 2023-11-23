/* eslint-disable react/no-danger */
import React from 'react';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';

const MagezonText = (props) => {
    const {
        content,
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
        ...other
    } = props;

    return (
        <div className="mgz-text">
            <WidgetRenderer content={content} {...other} />
            <style jsx>
                {`
                    .mgz-text {
                            width: 100%,
                            border-style: ${border_style || 'solid'};
                            background-position: ${background_position?.split('-').join(' ')};
                            background-color: ${background_color || 'transparent'};
                            border-width: ${border_top_width || 0}px ${border_right_width || 0}px ${border_bottom_width || 0}px
                                ${border_left_width || 0}px;
                            margin: ${margin_top || 0}px ${margin_right || 0}px ${margin_bottom || 0}px ${margin_left || 0}px;
                            padding: ${padding_top || 0}px ${padding_right || 0}px ${padding_bottom || 0}px ${padding_left || 0}px;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonText;
