import React from 'react';
import Button from '@common_button';
import Show from '@common_show';
import cx from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ContainerScroll = ({
    variant = 'horizontal',
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

    // calculates the width of the first child from the list rendered
    const containerChildrenWidth = containerRef?.current?.children[0]?.clientWidth || 0;

    const onClickArrowLeft = () => {
        containerRef.current.scrollLeft -= containerChildrenWidth;
    };

    const onClickArrowRight = () => {
        containerRef.current.scrollLeft += containerChildrenWidth;
    };

    return (
        <div
            className={cx('container-scroll relative group')}
            style={{
                ...(maxHeight ? { maxHeight } : null),
                ...(maxWidth ? { maxWidth } : null),
            }}
        >
            <Show when={showArrow}>
                <div
                    className={cx(
                        'container-scroll-arrow flex justify-between w-[100%]',
                        'px-[5px]',
                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                        'opacity-0',
                        'group-hover:opacity-100',
                        'z-[1]',
                        'pointer-events-none',
                    )}
                >
                    <Button variant="tertiary" className="container-scroll-arrow-left !px-[10px] pointer-events-auto" onClick={onClickArrowLeft}>
                        <ChevronLeftIcon style={{ width: arrowSize, height: arrowSize }} />
                    </Button>
                    <Button variant="tertiary" className="container-scroll-arrow-right !px-[10px] pointer-events-auto" onClick={onClickArrowRight}>
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
                className={cx(
                    'w-full',
                    'container-scroll-data',
                    'relative',
                    'scrollbar-none',
                    'p-1',
                    '-m-1',
                    isHorizontal && 'overflow-x-auto flex scroll-smooth',
                    isVertical && 'overflow-y-auto',
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default ContainerScroll;
