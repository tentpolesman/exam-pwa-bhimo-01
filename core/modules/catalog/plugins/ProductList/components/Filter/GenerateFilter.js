import React from 'react';
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
                label: itemFilter.value[index].label,
                value: itemFilter.value[index].label,
            });
        }
        return itemValue;
    }, [itemFilter?.value]);

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
            return (
                <div key={idx}>
                    <CheckBox
                        type="color"
                        classNames={{
                            checkboxGroupClasses: '!flex-wrap',
                        }}
                        name={itemFilter.field}
                        noLabel
                        label={false}
                        data={ItemValueByLabel}
                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                        flex={itemProps.selectSizeFlex || 'row'}
                        CustomItem={itemProps.selectColorItem || Swatch}
                        onChange={(val) => checkedFilter(itemFilter.field, val)}
                    />
                </div>
            );
        }
        if (itemFilter.field === 'size') {
            return (
                <div key={idx}>
                    <CheckBox
                        name={itemFilter.field}
                        classNames={{
                            checkboxGroupClasses: '!flex-wrap gap-2',
                        }}
                        noLabel
                        label={false}
                        data={ItemValueByLabel}
                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                        flex={itemProps.selectSizeFlex || 'row'}
                        CustomItem={itemProps.selectSizeItem || Swatch}
                        onChange={(val) => checkedFilter(itemFilter.field, val)}
                    />
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
        return (
            <div key={idx}>
                {elastic ? (
                    <CheckBox
                        field={itemFilter.field}
                        noLabel
                        label={false}
                        data={ItemValueByLabel}
                        value={selectedFilter[itemFilter.field] ? selectedFilter[itemFilter.field].split(',') : []}
                        flex="row"
                        onChange={(val) => checkedFilter(itemFilter.field, val)}
                    />
                ) : (
                    <RadioGroup
                        noLabel
                        name={itemFilter.field}
                        label={false}
                        data={itemFilter.value || []}
                        value={selectedFilter[itemFilter.field]}
                        onChange={(value) => selectFilter(itemFilter.field, value)}
                        className="flex-row"
                    />
                )}
            </div>
        );
    }
    return null;
}, noRender);

export default GenerateFilter;
