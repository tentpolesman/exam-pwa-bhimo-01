import React from 'react';
import PriceFormat from '@common_priceformat';
import Typography from '@common_typography';

const ItemGrouped = ({
    max = 10000,
    disabled = false,
    product,
    itemsCart = {},
    setItemsCart = () => {},
}) => {
    const [localValue, setLocalValue] = React.useState(itemsCart[product.sku] || 0);

    const handleLocalChange = (event) => {
        const val = event.target.value.replace(/\D/, '');
        if (!disabled) {
            if (val > max) {
                window.toastMessage({
                    open: true,
                    text: `Max input ${max}`,
                    variant: 'error',
                });
            } else {
                if (setItemsCart) {
                    const items = itemsCart;
                    items[product.sku] = val && val !== '' ? parseInt(val, 10) : 0;
                    setItemsCart(items);
                }
                setLocalValue(val);
            }
        }
    };

    return (
        <div className="flex flex-row items-center justify-between min-h-max py-2 border-b-[2px] border-b-neutral-100">
            <div className="flex flex-col">
                <Typography>{product.name}</Typography>
                <PriceFormat
                    priceRange={product.price_range}
                    priceTiers={product.price_tiers}
                    // eslint-disable-next-line no-underscore-dangle
                    productType={product.__typename}
                    specialFromDate={product.special_from_date}
                    specialToDate={product.special_to_date}
                />
            </div>
            {
                product.stock_status === 'OUT_OF_STOCK'
                    ? (
                        <Typography variant="p" type="bold" letter="uppercase">
                            {product.stock_status.replace(/_/g, ' ') || ''}
                        </Typography>
                    )
                    : (
                        <input
                            className="min-h-[20px] max-w-[50px] tablet:max-w[60px] tablet:min-h-[30px] text-center"
                            type="number"
                            onChange={handleLocalChange}
                            readOnly={disabled}
                            value={localValue}
                        />
                    )
            }
        </div>
    );
};

export default ItemGrouped;
