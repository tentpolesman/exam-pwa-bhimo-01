/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import ContainerScroll from '@common/ContainerScroll';
import cx from 'classnames';
import React from 'react';

const Caraousel = (props) => {
    const {
        data = [],
        showArrow = true,
        Item,
        storeConfig = {},
        className = '',
        ...other
    } = props;

    return (
        <div className={cx('carousel', 'w-full', 'h-full', 'relative', 'xs:max-w-[100vw]', 'sm:h-auto group', className)}>
            <ContainerScroll itemsLength={data.length} showArrow={showArrow}>
                {data?.length > 0 && data.map((item, key) => (
                    <Item
                        key={key}
                        {...item}
                        storeConfig={storeConfig}
                        className="[&:not(:first-child)]:mx-3 carousel-item"
                        {...other}
                    />
                ))}
            </ContainerScroll>
            <style jsx>
                {`
                    .carousel :global(.carousel-item) {
                        overflow: unset;
                        width: auto;
                    }
                `}
            </style>
        </div>
    );
};

export default Caraousel;
