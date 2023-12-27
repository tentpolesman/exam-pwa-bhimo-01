import Button from '@common_button';
import CircularProgress from '@common_circularprogress';
import Typography from '@common_typography';
import cx from 'classnames';
import { formatPrice } from '@helper_currency';

const StoreCreditView = (props) => {
    const {
        store_credit, credit, storeConfig, checkout, handleUseCredit, total, t, currencyCache,
    } = props;
    return (
        <div
            className={
                cx(
                    'mt-[5px] p-[17px] flex flex-row justify-between items-center',
                    'border border-primary rounded-[10px] m-w-[480px]',
                )
            }
            id="checkoutUserCredit"
        >
            <div className="flex flex-col">
                <Typography variant="span" letter="capitalize">
                    {store_credit.is_use_store_credit ? t('checkout:myCredit:used') : t('checkout:myCredit:title')}
                </Typography>
                <Typography variant="span" type="bold" className="text-lg ml-[5px]">
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
                    className="max-w-[140px] flex flex-col justify-center items-center p-[5px]"
                    disabled={!!(checkout.loading.storeCredit || !!(total === 0 && !store_credit.is_use_store_credit))}
                    onClick={handleUseCredit}
                >
                    <Typography
                        color={checkout.loading.storeCredit || (total === 0 && !store_credit.is_use_store_credit) ? 'gray' : 'default'}
                        variant="p"
                        type="bold"
                        letter="uppercase"
                        align="center"
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
