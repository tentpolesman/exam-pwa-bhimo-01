import Button from '@common/Button';
import Select from '@common/Forms/Select';
import React, { useState } from 'react';
import GridIcon from '@heroicons/react/24/outline/Squares2X2Icon';
import ListIcon from '@heroicons/react/24/outline/Bars3BottomLeftIcon';
import FilterIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import Typography from '@common/Typography';
import cx from 'classnames';
import DrawerFilter from './DrawerFilter';

const ViewProductList = (props) => {
    const {
        loading, loadmore, products,
    } = props;
    const [isGrid, setIsGrid] = useState('true');
    const handleSetGrid = () => setIsGrid(!isGrid);

    const [openDrawerFilter, setOpenDrawerFilter] = useState(false);
    const handleOpenDrawerFilter = () => setOpenDrawerFilter(true);
    const handleCloseDrawetFilter = () => setOpenDrawerFilter(false);

    return (
        <div className="flex flex-row gap-4 w-full">
            <DrawerFilter open={openDrawerFilter} handleClose={handleCloseDrawetFilter} />
            <div className="hidden lg:inline-flex flex-col lg:basis-1/4">
                <div className="mb-5 h-[36px] border-neutral-100 border-b-[1px]">
                    <Typography variant="h3" className="text-base basis-full">
                        Shipping Options
                    </Typography>
                </div>
                <div className="w-full bg-neutral-200 h-screen" />
            </div>
            <div className="lg:basis-3/4 basis-full flex flex-col">
                <div className="flex flex-row items-center align-middle justify-between mb-5">
                    <div className="flex flex-row items-center gap-2">
                        <Button
                            variant="outlined"
                            icon={<FilterIcon />}
                            iconPosition="left"
                            className="lg:hidden h-[36px] flex items-center py-[8px] px-[12px] border-neutral-200"
                            classNameText="text-neutral"
                            onClick={handleOpenDrawerFilter}
                        >
                            Filters
                        </Button>
                        <Button
                            variant="outlined"
                            icon={isGrid ? <GridIcon /> : <ListIcon />}
                            iconPosition="right"
                            className="h-[36px] flex items-center py-[8px] px-[12px] border-neutral-200"
                            classNameText="text-neutral"
                            onClick={handleSetGrid}
                        >
                            <Typography className="hidden lg:inline">View As</Typography>
                        </Button>
                    </div>
                    <Select
                        options={[{ label: 'Tes', value: 'test' }]}
                        placeholder="Sort By"
                        className="h-[36px]"
                        textFiledProps={{
                            className: 'h-[36px] w-[117px] pl-2 mt-0',
                        }}
                        inputProps={{
                            className: 'h-[34px] placeholder:text-neutral',
                        }}
                    />
                </div>
                <div className={cx(
                    'grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3',
                    {
                        'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1': !isGrid,
                    },
                )}
                >
                    {
                        !loadmore && !loading && products.items && products.items.map((item) => (
                            <div className="w-auto h-[350px]" key={item}>
                                <div className="bg-neutral-100 w-full h-full" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewProductList;
