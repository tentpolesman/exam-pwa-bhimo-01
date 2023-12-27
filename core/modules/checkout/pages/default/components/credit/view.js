import Button from '@common_button';
import CircularProgress from '@common_circularprogress';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import classNames from 'classnames';

const StoreCreditView = (props) => {
    const {
        store_credit, credit, storeConfig, checkout, handleUseCredit, total, t, currencyCache,
    } = props;
    return (
        <div
            className={classNames(
                'border border-neutral-200 rounded-lg',
                'w-full max-w-[420px]',
                'flex flex-row items-center justify-between p-3',
            )}
            id="checkoutUserCredit"
        >
            <div className="flex flex-col gap-2">
                <Typography variant="bd-2a" letter="capitalize">
                    {store_credit.is_use_store_credit ? t('checkout:myCredit:used') : t('checkout:myCredit:title')}
                </Typography>
                <Typography variant="bd-2" className="text-lg">
                    {formatPrice(
                        `${credit}`.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                        }),
                        storeConfig.default_display_currency_code,
                        currencyCache,
                    )}
                </Typography>
            </div>
            <div>
                <Button
                    variant="outlined"
                    size="sm"
                    disabled={!!(checkout.loading.storeCredit || !!(total === 0 && !store_credit.is_use_store_credit))}
                    onClick={handleUseCredit}
                >
                    <Typography
                        color={checkout.loading.storeCredit || (total === 0 && !store_credit.is_use_store_credit) ? 'gray' : 'default'}
                        variant="bd-3"
                        className="uppercase"
                    >
                        {store_credit.is_use_store_credit ? t('checkout:myCredit:removeButton') : t('checkout:myCredit:button')}
                    </Typography>
                    {checkout.loading.storeCredit && <CircularProgress />}
                </Button>
            </div>
        </div>
    );
};

export default StoreCreditView;
