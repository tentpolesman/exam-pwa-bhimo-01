import React from 'react';
import Button from '@common_button';
import Show from '@common_show';
import cx from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ContainerScroll = ({
    variant = 'horizontal',
    itemsLength = 10,
    className,
    children,
    maxHeight = '100%',
    maxWidth = '100%',
    showArrow,
    arrowSize = 10,
}) => {
    const containerRef = React.useRef(null);
    const isHorizontal = variant === 'horizontal';
    const isVertical = variant === 'vertical';

    const onClickArrowLeft = () => {
        const scrollTo = containerRef.current.clientWidth / itemsLength;
        containerRef.current.scrollLeft -= scrollTo;
    };

    const onClickArrowRight = () => {
        const scrollTo = containerRef.current.clientWidth / itemsLength;
        containerRef.current.scrollLeft += scrollTo;
    };

    return (
        <div
            className="container-scroll relative"
            style={{
                ...(maxHeight ? { maxHeight } : null),
                ...(maxWidth ? { maxWidth } : null),
            }}
        >
            <Show when={showArrow}>
                <div
                    style={{ zIndex: 999 }}
                    className={cx(
                        'container-scroll-arrow flex justify-between w-[100%]',
                        'px-[5px]',
                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                    )}
                >
                    <Button variant="tertiary" className="container-scroll-arrow-left !px-[10px]" onClick={onClickArrowLeft}>
                        <ChevronLeftIcon style={{ width: arrowSize, height: arrowSize }} />
                    </Button>
                    <Button variant="tertiary" className="container-scroll-arrow-right !px-[10px]" onClick={onClickArrowRight}>
                        <ChevronRightIcon style={{ width: arrowSize, height: arrowSize }} />
                    </Button>
                </div>
            </Show>
            <div
                ref={containerRef}
                style={{
                    ...(maxHeight ? { maxHeight } : null),
                    ...(maxWidth ? { maxWidth } : null),
                }}
                className={
                    cx(
                        'container-scroll-data',
                        'relative',
                        isHorizontal && 'overflow-x-auto flex scroll-smooth',
                        isVertical && 'overflow-y-auto',
                        className,
                    )
                }
            >
                {children}
            </div>
        </div>
    );
};

export default ContainerScroll;
