import React from 'react';
import propTypes from 'prop-types';
import cx from 'classnames';
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';

const Pagination = (props) => {
    const {
        handleChangePage, mobile, showArrowButton,
        page, totalPage, maxPageRender, className,
    } = props;

    const longPage = totalPage && totalPage > maxPageRender;

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
        if ((totalPage / maxPageRender) > 2) {
            pageArray = [];
            pageArray.push(1);
            pageArray.push('dot');
            for (let index = page - 2; index < page; index += 1) {
                pageArray.push(index);
            }

            pageArray.push(page);

            for (let index = page + 2; index > page; index -= 1) {
                pageArray.push(index);
            }

            pageArray.push('dot');
            pageArray.push(totalPage);
        }

        if (page === totalPage || page > totalPage - maxPageRender) {
            pageArray = [];
            pageArray.push(1);
            pageArray.push('dot');
            for (let index = (totalPage + 1) - maxPageRender; index <= totalPage; index += 1) {
                pageArray.push(index);
            }
        }

        if (page < maxPageRender) {
            pageArray = [];
            for (let index = 1; index <= maxPageRender; index += 1) {
                pageArray.push(index);
            }
            pageArray.push('dot');
            pageArray.push(totalPage);
        }
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
        if (itemPage !== 'dot' || itemPage !== page) {
            handleChangePage(itemPage);
        }
    };

    return (
        <div className={
            cx('flex flex-row p-[10px] bg-neutral-white gap-1', className)
        }
        >
            {
                showArrowButton && (
                    <div
                        role="button"
                        disabled={page === 1}
                        tabIndex={0}
                        onClick={handlePrevious}
                        onKeyUp={() => {}}
                        className={cx(
                            'w-10 h-10 flex items-center justify-center bg-neutral-white rounded-md',
                            page === 1 && 'text-neutral-150',
                        )}
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </div>
                )
            }
            {
                pageArray.map((item) => (
                    <div
                        key={item}
                        role="button"
                        onClick={() => handeClickPage(item)}
                        tabIndex={item}
                        onKeyUp={() => {}}
                        className={
                            cx(
                                'w-10 h-10 flex items-center justify-center bg-neutral-white rounded-md',
                                !mobile ? 'hover:bg-primary hover:text-neutral-50' : '',
                                (item === page && !mobile) ? 'bg-primary text-neutral-50' : '',
                                (item === 'dot') ? 'bg-neutral-white hover:bg-neutral-white text-neutral-300' : '',
                            )
                        }
                    >
                        {
                            item === 'dot' ? '...' : item
                        }
                    </div>
                ))
            }

            {
                showArrowButton && (
                    <div
                        role="button"
                        disabled={page === 1}
                        tabIndex={0}
                        onClick={handleNext}
                        onKeyUp={() => {}}
                        className={cx(
                            'w-10 h-10 flex items-center justify-center bg-neutral-white rounded-md',
                            page === totalPage && 'text-neutral-150',
                        )}
                    >
                        <ChevronRightIcon className="w-5 h-5" />
                    </div>
                )
            }
        </div>
    );
};

Pagination.propTypes = {
    page: propTypes.number.isRequired,
    totalPage: propTypes.number.isRequired,
    handleChangePage: propTypes.func.isRequired,
    mobile: propTypes.bool,
    showArrowButton: propTypes.bool,
    maxPageRender: propTypes.number,
    className: propTypes.string,
};

Pagination.defaultProps = {
    mobile: false,
    showArrowButton: true,
    maxPageRender: 5,
    className: '',
};

export default Pagination;
