import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import cx from 'classnames';
import propTypes from 'prop-types';
import React, { useMemo } from 'react';
import useMediaQuery from '@root/core/hooks/useMediaQuery';

function generateRange(start, end) {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
}

const Pagination = (props) => {
    const {
        handleChangePage, mobile, showArrowButton, page, totalPage, className, siblingCount,
    } = props;
    const longPage = totalPage && totalPage > siblingCount;
    const { isMobile } = useMediaQuery();

    let pageArray = [];

    if (!longPage) {
        pageArray = [];
        if (!mobile) {
            for (let index = 1; index <= totalPage; index += 1) {
                pageArray.push(index);
            }
        }
    }

    if (longPage && !mobile) {
        // eslint-disable-next-line consistent-return
        pageArray = useMemo(() => {
            const totalPageNumbers = siblingCount + 5;

            if (totalPageNumbers >= totalPage) {
                return generateRange(1, totalPage);
            }

            const leftSiblingIndex = Math.max(page - siblingCount, 1);
            const rightSiblingIndex = Math.min(page + siblingCount, totalPage);

            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPage - 2;

            const firstPageIndex = 1;
            const lastPageIndex = totalPage;

            const numberMultiplier = isMobile ? 0.25 : 2;

            if (!shouldShowLeftDots && shouldShowRightDots) {
                const leftItemCount = 3 + Math.floor(numberMultiplier * siblingCount);
                const leftRange = generateRange(1, leftItemCount);

                return [...leftRange, 'dot', totalPage];
            }

            if (shouldShowLeftDots && !shouldShowRightDots) {
                const rightItemCount = 3 + 2 * siblingCount;
                const rightRange = generateRange(totalPage - rightItemCount + 1, totalPage);
                return [firstPageIndex, 'dot', ...rightRange];
            }

            if (shouldShowLeftDots && shouldShowRightDots) {
                const middleRange = generateRange(leftSiblingIndex, rightSiblingIndex);
                return [firstPageIndex, 'dot', ...middleRange, 'dot', lastPageIndex];
            }
        }, [page]);
    }

    if (mobile) {
        pageArray = [page];
    }

    const handlePrevious = () => {
        if (page > 1) {
            handleChangePage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPage) {
            handleChangePage(page + 1);
        }
    };

    const handeClickPage = (itemPage) => {
        if (itemPage !== 'dot' && itemPage !== page) {
            handleChangePage(itemPage);
        }
    };

    return (
        <div className={cx('flex flex-row p-[10px] bg-neutral-white gap-1', className)}>
            {showArrowButton && (
                <div
                    aria-label="Previous"
                    role="button"
                    disabled={page === 1}
                    tabIndex={0}
                    onClick={handlePrevious}
                    onKeyUp={() => {}}
                    className={cx('w-10 h-10 flex items-center justify-center bg-neutral-white rounded-md', page === 1 && 'text-neutral-150')}
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </div>
            )}
            {pageArray.map((item, idx) => (
                <div
                    key={idx}
                    role="button"
                    onClick={() => handeClickPage(item)}
                    tabIndex={item}
                    onKeyUp={() => {}}
                    className={cx(
                        'w-10 h-10 flex items-center justify-center bg-neutral-white rounded-md',
                        item !== 'dot' && !mobile ? 'hover:bg-primary hover:text-neutral-50' : '',
                        item === page && !mobile ? 'bg-primary text-neutral-50' : '',
                        item === 'dot' ? 'bg-neutral-white hover:bg-neutral-white text-neutral-300' : '',
                    )}
                >
                    {item === 'dot' ? '...' : item}
                </div>
            ))}

            {showArrowButton && (
                <div
                    aria-label="Next"
                    role="button"
                    disabled={page === 1}
                    tabIndex={0}
                    onClick={handleNext}
                    onKeyUp={() => {}}
                    className={cx('w-10 h-10 flex items-center justify-center bg-neutral-white rounded-md', page === totalPage && 'text-neutral-150')}
                >
                    <ChevronRightIcon className="w-5 h-5" />
                </div>
            )}
        </div>
    );
};

Pagination.propTypes = {
    page: propTypes.number.isRequired,
    totalPage: propTypes.number.isRequired,
    handleChangePage: propTypes.func.isRequired,
    mobile: propTypes.bool,
    showArrowButton: propTypes.bool,
    siblingCount: propTypes.number,
    className: propTypes.string,
};

Pagination.defaultProps = {
    mobile: false,
    showArrowButton: true,
    siblingCount: 2,
    className: '',
};

export default Pagination;
