import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import cx from 'classnames';

const BundleProductTypePrice = ({
    variant = 'md',
    priceRange,
    additionalPrice,
    currencyCache,
}) => {
    const isSm = variant === 'sm';
    const otherPrice = additionalPrice || 0;
    if (priceRange.maximum_price.final_price.value === priceRange.minimum_price.final_price.value) {
        return (
            <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text', 'text-neutral-400')}>
                {formatPrice(priceRange.minimum_price.final_price.value + otherPrice, priceRange.minimum_price.final_price.currency, currencyCache)}
            </Typography>
        );
    }
    return (
        <div className={cx('inline-flex')}>
            <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text-min', 'text-neutral-400')}>
                {formatPrice(priceRange.minimum_price.final_price.value + otherPrice, priceRange.minimum_price.final_price.currency, currencyCache)}
            </Typography>
            <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text-seperate', 'text-neutral-400', 'mx-1')}>
                -
            </Typography>
            <Typography variant={isSm ? 'bd-2' : 'h2'} className={cx('price-text-max', 'text-neutral-400')}>
                {formatPrice(priceRange.maximum_price.final_price.value + otherPrice, priceRange.maximum_price.final_price.currency, currencyCache)}
            </Typography>
        </div>
    );
};

export default BundleProductTypePrice;
