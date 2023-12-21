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
        row_type,
    } = props;
    const isContained = row_type === 'contained';
    const isFullWidth = row_type.indexOf('full_width') !== -1;
    const isNoPad = row_type.indexOf('no_paddings') !== -1;

    return (
        <>
            <div
                className={cx('mgz-row', 'flex', 'flex-wrap', row_type, {
                    'mgz-element-row-max-width': max_width && max_width !== '',
                    'max-sm:hidden': xs_hide,
                    'max-md:hidden': sm_hide,
                    'max-lg:hidden': md_hide,
                    'max-xl:hidden': lg_hide,
                    'w-full': isFullWidth,
                    '[&>.mgz-column>*]:!p-0': isFullWidth && isNoPad,
                    'w-[1220px] my-0 ml-[calc(50%)] -translate-x-[50%]': isContained,
                })}
            >
                {elements && elements.length > 0 && elements.map((item, key) => <MagezonColumn key={key} {...item} storeConfig={storeConfig} />)}
            </div>
            <style jsx>
                {`
                    .mgz-element-row-max-width {
                        width: ${max_width}px;
                        max-width: 100%;
                        margin: ${content_align === 'left' ? 'auto 0 0 0' : content_align === 'center' ? 'auto' : '0 0 0 auto'};
                    }
                `}
            </style>
        </>
    );
};

export default MagezonRow;
