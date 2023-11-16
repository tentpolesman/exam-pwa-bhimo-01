import React from 'react';
import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';

const MagezonColumn = (props) => {
    const {
        elements,
        xs_size,
        sm_size,
        md_size,
        lg_size,
        xl_size,
        xs_offset_size,
        sm_offset_size,
        md_offset_size,
        lg_offset_size,
        xl_offset_size,
        xs_hide,
        sm_hide,
        md_hide,
        lg_hide,
        xl_hide,
        storeConfig,
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
    let classColumn = 'mgz-column ';
    if (xs_size && xs_size !== '') classColumn += `col-xs-${xs_size} `;
    if (sm_size && sm_size !== '') classColumn += `col-sm-${sm_size} `;
    if (md_size && md_size !== '') classColumn += `col-md-${md_size} `;
    if ((lg_size && lg_size !== '') || (xl_size && xl_size !== '')) classColumn += `col-lg-${lg_size} `;

    if (xs_offset_size && xs_offset_size !== '') classColumn += `col-xs-offset-${xs_offset_size} `;
    if (sm_offset_size && sm_offset_size !== '') classColumn += `col-sm-offset-${sm_offset_size} `;
    if (md_offset_size && md_offset_size !== '') classColumn += `col-md-offset-${md_offset_size} `;
    if ((lg_offset_size && lg_offset_size !== '') || (xl_offset_size && xl_offset_size !== '')) classColumn += `col-lg-offset-${lg_offset_size} `;

    if (xs_hide) classColumn += 'max-sm:hidden ';
    if (sm_hide) classColumn += 'max-md:hidden ';
    if (md_hide) classColumn += 'max-lg:hidden ';
    if (lg_hide || xl_hide) classColumn += 'max-xl:hidden ';

    if (!classColumn.includes('col-')) {
        classColumn += 'col-xs-12 col-lg-12';
    }

    return (
        <>
            <div className={classColumn}>
                {elements && elements.length > 0 && elements.map((item, key) => <MagezonElement key={key} {...item} storeConfig={storeConfig} />)}
            </div>
            <style jsx>
                {`
                    .mgz-column {
                        width: 100%;
                        border-style: ${border_style || 'solid'};
                        background-position: ${background_position?.split('-').join(' ')};
                        background-color: ${background_color || 'transparent'};
                        border-width: ${border_top_width || 0}px ${border_right_width || 0}px ${border_bottom_width || 0}px
                            ${border_left_width || 0}px;
                        margin: ${margin_top || 0}px ${margin_right || 0}px ${margin_bottom || 0}px ${margin_left || 0}px;
                        padding: ${padding_top || 0}px ${padding_right || 0}px ${padding_bottom || 0}px ${padding_left || 0}px;
                    }
                    .col-md-15 {
                        flex: 1 20%;
                        max-width: 20%;
                    }
                    .col-md-25 {
                        flex: 1 40%;
                        max-width: 40%;
                    }
                    .col-md-35 {
                        flex: 1 60%;
                        max-width: 60%;
                    }
                    .col-md-45 {
                        flex: 1 80%;
                        max-width: 80%;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonColumn;
