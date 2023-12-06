import Button from '@common/Button';
import Select from '@common/Forms/Select';
import React, { useCallback, useEffect, useState } from 'react';
import GridIcon from '@heroicons/react/24/outline/Squares2X2Icon';
import ListIcon from '@heroicons/react/24/outline/Bars3BottomLeftIcon';
import FilterIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import Typography from '@common/Typography';
import cx from 'classnames';

import ProductItem from '@plugin_productitem';
import PaginationSection from '@plugin_productlist/components/PaginationSection';
import CircularProgress from '@common/CircularProgress';

import { getLocalStorage } from '@root/core/helpers/localstorage';

import DrawerFilter from './DrawerFilter';

const ViewProductList = (props) => {
    const {
        loading, loadmore, products, categoryPath, price, loadPrice,
        handleLoadMore, isPagination, renderEmptyMessage,
        ...other
    } = props;
    const [isGrid, setIsGrid] = useState('true');
    const handleSetGrid = () => setIsGrid(!isGrid);

    const [openDrawerFilter, setOpenDrawerFilter] = useState(false);
    const handleOpenDrawerFilter = () => setOpenDrawerFilter(true);
    const handleCloseDrawetFilter = () => setOpenDrawerFilter(false);

    // Load More (Infinite Loop)
    const [isExceedingOffset, setIsExceedingOffset] = useState(false);
    const handleScroll = useCallback(() => {
        // To get page offset of last user
        // const lastUserLoaded = document.querySelector(`.grid-item:last-child`);
        const lastUserLoaded = document.querySelector('.latest-product-indicator');
        if (lastUserLoaded) {
            const lastUserLoadedOffset = lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;

            if (pageOffset > lastUserLoadedOffset) {
                setIsExceedingOffset(true);
            } else {
                setIsExceedingOffset(false);
            }
        }
    }, []);

    React.useEffect(() => {
        if (isExceedingOffset && !loadmore && products.items.length < products.total_count) {
            handleLoadMore();
        }
    }, [isExceedingOffset]);

    // const setGrid = async (state) => {
    //     setLocalStorage('isGrid', state);
    //     setIsGrid(state);
    // };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        const gridView = getLocalStorage('isGrid');
        if (gridView !== null) {
            setIsGrid(typeof gridView === 'boolean' ? gridView : JSON.parse(gridView));
        }
    }, [isGrid]);

    const loadList = isPagination ? (loadmore || loading) : loading;

    return (
        <div className="flex flex-row gap-4 w-full">
            <DrawerFilter open={openDrawerFilter} handleClose={handleCloseDrawetFilter} />
            <div className="hidden desktop:inline-flex flex-col lg:basis-1/4">
                <div className="mb-5 h-[36px] border-neutral-100 border-b-[1px]">
                    <Typography variant="h3" className="text-base basis-full">
                        Shipping Options
                    </Typography>
                </div>
                <div className="w-full bg-neutral-200 h-screen" />
            </div>
            <div className="basis-full desktop:basis-3/4 flex flex-col">
                <div className="flex flex-row items-center align-middle justify-between mb-5">
                    <div className="flex flex-row items-center gap-2">
                        <Button
                            variant="outlined"
                            icon={<FilterIcon />}
                            iconPosition="left"
                            className="desktop:hidden h-[36px] flex items-center !py-0 !px-2 desktop:py-[8px] desktop:px-[12px] border-neutral-200"
                            classNameText="text-neutral"
                            onClick={handleOpenDrawerFilter}
                        >
                            Filters
                        </Button>
                        <Button
                            variant="outlined"
                            icon={isGrid ? <GridIcon /> : <ListIcon />}
                            iconPosition="right"
                            className="h-[36px] flex items-center py-1 px-1 desktop:py-[8px] desktop:px-[12px] border-neutral-200"
                            classNameText="text-neutral"
                            onClick={handleSetGrid}
                            iconProps={{ className: '!ml-0 tablet:!ml-[6px]' }}
                        >
                            <Typography className="hidden tablet:inline">View As</Typography>
                        </Button>
                    </div>
                    <Select
                        options={[{ label: 'Tes', value: 'test' }]}
                        placeholder="Sort By"
                        className="h-[36px]"
                        textFiledProps={{
                            className: 'h-[36px] !w-[auto] max-w-[110px] tablet:!w-[117px] ml-2 mt-0',
                        }}
                        inputProps={{
                            className: 'h-[34px] placeholder:!text-neutral',
                        }}
                    />
                </div>
                <div className={
                    isGrid
                        ? 'grid gap-2 tablet:gap-4 grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3'
                        : 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1'
                }
                >
                    {
                        loading
                            && [1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
                                <div className="w-auto h-auto p-2" key={key}>
                                    <div className="flex flex-col gap-2 tablet:gap-2 animate-pulse">
                                        <div className="h-[250px] w-auto bg-neutral-100" />
                                        <div className="h-5 w-full bg-neutral-100" />
                                        <div className="h-4 w-3/4 bg-neutral-100" />
                                    </div>
                                </div>
                            ))

                    }
                    {
                        !loadList && products.items && products.items.map((item, key) => (
                            <div className="w-auto h-auto" key={key}>
                                <ProductItem
                                    categorySelect={categoryPath}
                                    isGrid={isGrid}
                                    catalogList
                                    price={price}
                                    loadPrice={loadPrice}
                                    {...other}
                                    {...item}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="latest-product-indicator" />

                {(products.items.length === products.total_count) || loading
                    ? renderEmptyMessage(products.items.length, loading)
                    : null}
                <div className={cx(
                    'w-full p-5 flex justify-center',
                    !loadmore ? 'hidden' : '',
                )}
                >
                    <div className="flex flex-row">
                        <CircularProgress size="small" className="mr-2" />
                        <Typography align="center" variant="span" type="bold" letter="uppercase" color="gray">
                            Loading...
                        </Typography>
                    </div>
                </div>
                { isPagination && <PaginationSection {...props} /> }
            </div>
        </div>
    );
};

export default ViewProductList;
