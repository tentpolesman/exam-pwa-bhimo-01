import React from 'react';
import Typography from '@common_typography';
import classNames from 'classnames';
import OptionItemAction from '@core_modules/product/plugins/OptionItemAction';
import Item from '@core_modules/product/plugins/OptionItem/GroupedOption/Item';
import Show from '@common/Show';

const GroupedProductOptionView = ({
    t, loading, disabled,
    handleAddToCart = () => {},
    loadData = false,
    optionsData = [],
    itemsCart,
    setItemsCart,
    isPlp,
    CustomFooter,
    ...other
}) => (
    <>
        <div className="flex flex-col">
            <Show when={!isPlp && (!loadData && optionsData.length > 0)}>
                <div className="flex flex-col mb-7">
                    <div className={classNames(
                        'flex flex-row items-center justify-between min-h-[50px] border-b-[2px] border-b-neutral-100 py-2',
                        'border-b-primary',
                    )}
                    >
                        <Typography type="bold">{t('common:product:titleProduct')}</Typography>
                        <Typography type="bold">{t('common:title:shortQty')}</Typography>
                    </div>
                    {
                        optionsData.map((item, key) => (
                            <Item
                                key={key}
                                {...item}
                                itemsCart={itemsCart}
                                setItemsCart={setItemsCart}
                                disabled={disabled}
                            />
                        ))
                    }
                </div>
            </Show>
        </div>

        {React.isValidElement(CustomFooter)
            ? React.cloneElement(CustomFooter, {
                ...other,
                loading,
                disabled,
                handleAddToCart,
                t,
            })
            : (
                <OptionItemAction
                    loading={loading}
                    disabled={disabled}
                    handleAddToCart={handleAddToCart}
                    t={t}
                    {...other}
                />
            )}
    </>
);

export default GroupedProductOptionView;
