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
            <ContainerScroll showArrow={showArrow}>
                {data?.length > 0 && data.map((item, key) => (
                    <Item
                        className="carousel-item [&:not(:last-child)]:mr-4 !min-w-[145px] tablet:!min-w-[190px] desktop:!min-w-[273px] !h-[initial]"
                        key={key}
                        {...item}
                        storeConfig={storeConfig}
                        imageProps={{
                            className: cx(
                                'product-image',
                                '!w-[136px]',
                                '!h-[136px]',
                                'tablet:!w-[194px]',
                                'tablet:!h-[194px]',
                                'desktop:!w-[242px]',
                                'desktop:!h-[242px]',
                            ),
                            classContainer: cx(
                                'product-image-container',
                                '!w-[136px]',
                                '!h-[136px]',
                                'desktop:!w-[242px]',
                                'desktop:!h-[242px]',
                                'tablet:!w-[194px]',
                                'tablet:!h-[194px]',
                            ),
                        }}
                        {...other}
                        enableQuickView
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
