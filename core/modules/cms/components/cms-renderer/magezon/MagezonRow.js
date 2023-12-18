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
                    }
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
