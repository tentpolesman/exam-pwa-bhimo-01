/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import Typography from '@common_typography';
import Radio from '@common_forms/Radio';
import classNames from 'classnames';
import { formatPrice } from '@helpers/currency';
import { useReactiveVar } from '@apollo/client';
import { currencyVar } from '@root/core/services/graphql/cache';

const RadioDeliveryItem = (props) => {
    const {
        value,
        label,
        promoLabel,
        selected,
        onChange = () => {},
        borderBottom = true,
        image = null,
        classContent = '',
        amount,
        price_incl_tax,
        storeConfig,
        disabled = false,
    } = props;
    const handleChange = () => {
        if (!disabled) {
            onChange(value);
        }
    };

    // cache currency
    const currencyCache = useReactiveVar(currencyVar);

    const labelType = selected ? 'bold' : 'regular';
    const rootStyle = borderBottom ? 'flex flex-row border border-primary' : 'flex flex-row border-none';
    let rightSide;

    if (image) {
        rightSide = <img src={image} alt="cimb" />;
    }
    const base_currency_code = storeConfig ? storeConfig.base_currency_code : 'RP';
    if (amount && price_incl_tax && price_incl_tax.value > amount.value) {
        rightSide = (
            <div className="flex flex-row between-xs">
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography type={labelType} className="line-through text-right">
                        {formatPrice(price_incl_tax.value, amount.currency, currencyCache || base_currency_code, currencyCache)}
                    </Typography>
                </div>
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography type={labelType} className="ml-auto font-bold text-right">
                        {formatPrice(amount.value, amount.currency, currencyCache || base_currency_code, currencyCache)}
                    </Typography>
                </div>
            </div>
        );
    } else if (price_incl_tax && price_incl_tax.value) {
        rightSide = (
            <div className="flex flex-row">
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography vtype={labelType} className="ml-auto font-normal text-right">
                        {formatPrice(price_incl_tax.value, amount.currency, currencyCache || base_currency_code, currencyCache)}
                    </Typography>
                </div>
            </div>
        );
    } else if (price_incl_tax && price_incl_tax.value === 0 && amount && amount.value === 0) {
        rightSide = (
            <div className="flex flex-row">
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography variant="p" type={labelType} className="ml-auto font-bold text-right">
                        {price_incl_tax.value !== 0 ? formatPrice(price_incl_tax.value, amount.currency, currencyCache
                            || base_currency_code, currencyCache) : 'FREE'}
                    </Typography>
                </div>
            </div>
        );
    }

    const shippingLabel = (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography type={labelType}>
                    {label}
                </Typography>
            </div>
            {promoLabel ? (
                <Typography type={labelType}>
                    (
                    {promoLabel}
                    )
                </Typography>
            ) : null}
        </div>
    );

    if (disabled) return null;

    return (
        <div className={rootStyle} id="checkoutRadioItem">
            <Radio
                variant="single"
                color="default"
                size="small"
                checked={selected}
                onClick={handleChange}
                inputProps={{
                    id: 'checkout-radioBtn',
                }}
            />

            <div className={classNames('flex flex-row justify-between w-full items-center', classContent)}>
                {shippingLabel}
                {rightSide}
            </div>
        </div>
    );
};

export default RadioDeliveryItem;
