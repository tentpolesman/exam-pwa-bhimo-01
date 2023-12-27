/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typography from '@common_typography';
import cx from 'classnames';
import { modules } from '@config';

const ShippingView = (props) => {
    const {
        checkout, handleSelect, t,
    } = props;
    const checkStyles = (delivery) => ((checkout.selected.delivery === delivery)
        ? cx('p-[17px] flex flex-row justify-center items-center border border-primary rounded-[10px] cursor-pointer', `${delivery}Delivery`)
        : cx('p-[17px] flex flex-row justify-center items-center border border-neutral-400 rounded-[10px] cursor-pointer', `${delivery}Delivery`));

    return (
        <div id="checkoutDeliveryMethod" className={cx('border-b border-b-neutral-400 p-[30px] mobile:mt-[20px]')}>
            <Typography variant="h2" className="font-bold uppercase">
                {t('checkout:deliveryMethod:label')}
            </Typography>
            <div className="flex flex-row">
                <div className="xs:basis-6/12">
                    <div className={checkStyles('home')} onClick={() => handleSelect('home')}>
                        <div className="flex flex-col">
                            <Typography variant="span" type="bold">
                                {t('checkout:deliveryMethod:homeDelivery')}
                            </Typography>
                            <Typography className="hidden-mobile">
                                {t('checkout:deliveryMethod:homeDeliveryDesc')}
                            </Typography>
                        </div>
                    </div>
                </div>
                {modules.checkout.pickupStore.enabled && (
                    <div className="xs:basis-6/12">
                        <div className={checkStyles('pickup')} onClick={() => handleSelect('pickup')}>
                            <div className="flex flex-col">
                                <Typography variant="span" type="bold">
                                    {t('checkout:deliveryMethod:pickupDelivery')}
                                </Typography>
                                <Typography className="hidden-mobile">
                                    {t('checkout:deliveryMethod:pickupDeliveryDesc')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                )}
                {modules.checkout.inStorePickup.enabled && (
                    <div className="xs:basis-6/12">
                        <div className={checkStyles('instore')} onClick={() => handleSelect('instore')}>
                            <div className="flex flex-col">
                                <Typography variant="span" type="bold">
                                    {t('checkout:deliveryMethod:instorePickup')}
                                </Typography>
                                <Typography className="hidden-mobile">
                                    {t('checkout:deliveryMethod:instorePickupDesc')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShippingView;
