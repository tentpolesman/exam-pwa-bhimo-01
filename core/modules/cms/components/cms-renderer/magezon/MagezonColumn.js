import React from 'react';
import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';
import { getColSpanTailwind, getFlexBasisTailwind } from '@root/core/helpers/style';

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
    } = props;
    let classColumn = 'mgz-column flex flex-col ';
    if (xs_size && xs_size !== '') classColumn += `${getFlexBasisTailwind(xs_size, 'xs')} `;
    if (sm_size && sm_size !== '') classColumn += `${getFlexBasisTailwind(sm_size, 'sm')} `;
    if (md_size && md_size !== '') classColumn += `${getFlexBasisTailwind(md_size, 'md')} `;
    if (lg_size && lg_size !== '') classColumn += `${getFlexBasisTailwind(lg_size, 'lg')} `;
    if (xl_size && xl_size !== '') classColumn += `${getFlexBasisTailwind(lg_size, 'xl')} `;

    if (xs_offset_size && xs_offset_size !== '') classColumn += `${getColSpanTailwind(xs_offset_size, 'xs')} `;
    if (sm_offset_size && sm_offset_size !== '') classColumn += `${getColSpanTailwind(sm_offset_size, 'sm')} `;
    if (md_offset_size && md_offset_size !== '') classColumn += `${getColSpanTailwind(md_offset_size, 'md')} `;
    if (lg_offset_size && lg_offset_size !== '') {
        classColumn += `${getColSpanTailwind(lg_offset_size, 'lg')} `;
    }
    if (xl_offset_size && xl_offset_size !== '') {
        classColumn += `${getColSpanTailwind(lg_offset_size, 'xl')} `;
    }

    if (xs_hide) classColumn += 'max-sm:hidden ';
    if (sm_hide) classColumn += 'max-md:hidden ';
    if (md_hide) classColumn += 'max-lg:hidden ';
    if (lg_hide || xl_hide) classColumn += 'max-xl:hidden ';

    if (!classColumn.includes('basis-')) {
        classColumn += 'xs:basis-full lg:basis-full';
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
                    }
                `}
            </style>
        </>
    );
};

export default MagezonColumn;
