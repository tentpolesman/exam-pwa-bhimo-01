/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import ContainerScroll from '@common/ContainerScroll';
import cx from 'classnames';
import React from 'react';

const Caraousel = (props) => {
    const {
        data = [], showArrow = true, Item, storeConfig = {}, className = '', ...other
    } = props;

    return (
        <div className={cx('carousel', className)}>
            <ContainerScroll itemsLength={data.length} showArrow={showArrow}>
                {data?.length > 0 && data.map((item, key) => (
                    <Item
                        className="carousel-item [&:not(:last-child)]:mr-4 !max-w-[288px]"
                        key={key}
                        {...item}
                        storeConfig={storeConfig}
                        imageProps={{
                            className: 'desktop:!w-64 desktop:!h-64',
                            classContainer: 'desktop:!w-64 desktop:!h-64',
                        }}
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
