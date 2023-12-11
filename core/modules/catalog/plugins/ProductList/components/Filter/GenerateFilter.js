import React, { useState } from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import CheckBox from '@common_forms/CheckBox';
import Swatch from '@common_forms/Swatch';
import RadioGroup from '@common_forms/Radio';
import RangeSlider from '@common_rangeslider';

const noRender = () => true;

let globalTimeout = null;

const GenerateFilter = React.memo((props) => {
    const {
        itemProps = {},
        elastic = false,
        t,
        isSearch,
        selectedFilter,
        setCheckedFilter,
        setSelectedFilter,
        handleSave,
        priceRange,
        setPriceRange,
        itemFilter,
        onChangeTabs,
        idx,
        storeConfig,
        autoReload = true,
    } = props;
    const timeRef = React.useRef(null);

    const checkedFilter = (field, value) => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }
        setCheckedFilter(field, value);
        if (autoReload) {
            timeRef.current = setTimeout(() => {
                handleSave();
            }, 1000);
        }
    };

    const selectFilter = (field, value) => {
        if (timeRef.current) {
            clearTimeout(globalTimeout);
        }
        setSelectedFilter(field, value);
        if (autoReload) {
            globalTimeout = setTimeout(() => {
                handleSave();
            }, 1000);
        }
    };

    React.useEffect(() =>
        // clear timeout when the component unmounts
        () => clearTimeout(timeRef.current),
    []);

    const ItemValueByLabel = React.useMemo(() => {
        const itemValue = [];
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < itemFilter.value.length; index++) {
            itemValue.push({
                label: itemFilter.value[index].label === '__other_docs'
                    ? t('catalog:filter:others')
                    : itemFilter.value[index].label.replace(/_/g, ' '),
                value: itemFilter.value[index].label,
            });
        }
        return itemValue;
    }, [itemFilter?.value]);

    const [openMore, setOpenMore] = useState(false);

    if (itemFilter.field !== 'attribute_set_id') {
        if (itemFilter.field === 'price') {
            const price = priceRange;
            price[1] = price[1] || parseInt(itemFilter.value[itemFilter.value.length - 1].value, 10);
            return (
                <div key={idx} className="flex flex-col w-full gap-5">
                    <RangeSlider
                        noLabel
                        label={itemFilter.label}
                        maxValue={parseInt(itemFilter.value[itemFilter.value.length - 1].value, 10)}
                        value={price}
                        onChange={itemProps.priceRangeChange || setPriceRange}
                        storeConfig={storeConfig}
                        disableInput
                    />
                    <div className="hidden desktop:flex justify-end">
                        <Button onClick={handleSave}>
                            {t('catalog:button:save')}
                        </Button>
                    </div>
                </div>
            );
        }
        if (itemFilter.field === 'color') {
            let dataColor = ItemValueByLabel.map((item) => ({ ...item, className: 'w-[34px] h-[34px]' }));
            const othersColor = [];
            if (ItemValueByLabel.length > 6) {
                dataColor = [];
                for (let index = 0; index < ItemValueByLabel.length; index += 1) {
                    const colors = {
                        ...ItemValueByLabel[index],
                        className: 'w-[34px] h-[34px]',
                    };
                    if (index < 6) {
                        dataColor.push(colors);
                    } else {
                        othersColor.push(colors);
                    }
                }
            }

            return (
                <div key={idx} className="flex flex-col gap-2">
                    <CheckBox
                        type="color"
                        classNames={{
                            checkboxGroupClasses: '!flex-wrap gap-2',
                        }}
                        name={itemFilter.field}
                        noLabel
                        label={false}
                        data={openMore ? [...dataColor, ...othersColor] : dataColor}
                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                        flex={itemProps.selectSizeFlex || 'row'}
                        CustomItem={itemProps.selectColorItem || Swatch}
                        onChange={(val) => checkedFilter(itemFilter.field, val)}
                    />
                    {
                        othersColor.length > 0 && (
                            <Button
                                variant="tertiary"
                                onClick={() => setOpenMore(!openMore)}
                                classNameText="!justify-start"
                                className="!p-0 !shadow-none"
                            >
                                <span className="text-neutral-900 hover:text-primary underline">
                                    {
                                        openMore
                                            ? `-${t('catalog:filter:lessMore')}`
                                            : `+${t('catalog:filter:showMore')}`
                                    }
                                </span>
                            </Button>
                        )
                    }
                </div>
            );
        }
        if (itemFilter.field === 'size') {
            let dataSize = ItemValueByLabel;
            const othersSize = [];
            if (ItemValueByLabel.length > 6) {
                dataSize = [];
                for (let index = 0; index < ItemValueByLabel.length; index += 1) {
                    const colors = ItemValueByLabel[index];
                    if (index < 6) {
                        dataSize.push(colors);
                    } else {
                        othersSize.push(colors);
                    }
                }
            }
            return (
                <div key={idx} className="flex flex-col gap-2">
                    <CheckBox
                        name={itemFilter.field}
                        classNames={{
                            checkboxGroupClasses: '!flex-wrap gap-2',
                        }}
                        noLabel
                        label={false}
                        data={openMore ? [...dataSize, ...othersSize] : dataSize}
                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                        flex={itemProps.selectSizeFlex || 'row'}
                        CustomItem={itemProps.selectSizeItem || Swatch}
                        onChange={(val) => checkedFilter(itemFilter.field, val)}
                    />
                    {
                        othersSize.length > 0 && (
                            <Button
                                variant="tertiary"
                                onClick={() => setOpenMore(!openMore)}
                                classNameText="!justify-start"
                                className="!p-0 !shadow-none"
                            >
                                <span className="text-neutral-900 hover:text-primary underline">
                                    {
                                        openMore
                                            ? `-${t('catalog:filter:lessMore')}`
                                            : `+${t('catalog:filter:showMore')}`
                                    }
                                </span>
                            </Button>
                        )
                    }
                </div>
            );
        }
        if ((itemFilter.field === 'cat' || itemFilter.field === 'category_id') && !isSearch) {
            return (
                <div className="flex flex-col gap-2">
                    {itemFilter.value.map((val, ids) => {
                        if (val !== 'attribute_set_id') {
                            return (
                                <button
                                    onClick={(e) => onChangeTabs(e, ids + 1)}
                                    className="border-none flex flex-row justify-between items-center"
                                    key={ids}
                                    type="button"
                                >
                                    <Typography className="font-normal" variant="span" letter="capitalize">
                                        {`${val.label.replace(/_/g, ' ')} `}
                                    </Typography>
                                    <Typography className="font-normal" color="text-neutral-400" variant="span" letter="capitalize">
                                        {`(${val.count})`}
                                    </Typography>
                                </button>
                            );
                        }
                        return null;
                    })}
                </div>
            );
        }
        if ((itemFilter.field === 'cat' || itemFilter.field === 'category_id') && isSearch) {
            return <span key={idx} />;
        }

        if (itemFilter.field === 'category_uid') return null;

        if (!elastic) {
            let itemFilters = itemFilter.value || [];
            const othersFilters = [];
            if (itemFilter.value.length > 6) {
                itemFilters = [];
                for (let index = 0; index < itemFilter.value.length; index += 1) {
                    const item = itemFilter.value[index];
                    if (index < 6) {
                        itemFilters.push(item);
                    } else {
                        othersFilters.push(item);
                    }
                }
            }

            return (
                <div className="flex flex-col gap-2">
                    {
                        openMore ? (
                            <RadioGroup
                                noLabel
                                name={itemFilter.field.replace(/_/g, ' ')}
                                label={false}
                                data={[...itemFilters, ...othersFilters]}
                                value={selectedFilter[itemFilter.field]}
                                onChange={(value) => selectFilter(itemFilter.field, value)}
                            />
                        ) : (
                            <RadioGroup
                                noLabel
                                name={itemFilter.field.replace(/_/g, ' ')}
                                label={false}
                                data={itemFilters}
                                value={selectedFilter[itemFilter.field]}
                                onChange={(value) => selectFilter(itemFilter.field, value)}
                            />
                        )
                    }

                    {
                        othersFilters.length > 0 && (
                            <Button
                                variant="tertiary"
                                onClick={() => setOpenMore(!openMore)}
                                classNameText="!justify-start"
                                className="!p-0 !shadow-none"
                            >
                                <span className="text-neutral-900 hover:text-primary underline">
                                    {
                                        openMore
                                            ? `-${t('catalog:filter:lessMore')}`
                                            : `+${t('catalog:filter:showMore')}`
                                    }
                                </span>
                            </Button>
                        )
                    }
                </div>
            );
        }

        let itemFilters = itemFilter.value || [];

        const othersFilters = [];

        if (itemFilter.value && itemFilter.value.length > 6) {
            itemFilters = [];
            for (let index = 0; index < itemFilter.value.length; index += 1) {
                const item = itemFilter.value[index];
                if (index < 6) {
                    itemFilters.push(item);
                } else {
                    othersFilters.push(item);
                }
            }
        }
        return (
            <div key={idx} className="flex flex-col gap-2">
                <RadioGroup
                    noLabel
                    name={itemFilter.field.replace(/_/g, ' ')}
                    label={false}
                    data={openMore ? [...itemFilters, ...othersFilters] : itemFilters}
                    value={selectedFilter[itemFilter.field]}
                    onChange={(value) => selectFilter(itemFilter.field, value)}
                    className="flex-row"
                />
                {
                    othersFilters.length > 0 && (
                        <Button
                            variant="tertiary"
                            onClick={() => setOpenMore(!openMore)}
                            classNameText="!justify-start"
                            className="!p-0 !shadow-none"
                        >
                            <span className="text-neutral-900 hover:text-primary underline">
                                {
                                    openMore
                                        ? `-${t('catalog:filter:lessMore')}`
                                        : `+${t('catalog:filter:showMore')}`
                                }
                            </span>
                        </Button>
                    )
                }
            </div>
        );
    }
    return null;
}, noRender);

export default GenerateFilter;
