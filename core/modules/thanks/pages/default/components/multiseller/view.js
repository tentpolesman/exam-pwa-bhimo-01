/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import Button from '@common_button';
import Typography from '@common_typography';
import cx from 'classnames';
import Link from 'next/link';
import propTypes from 'prop-types';
import IconArrow from '@heroicons/react/24/outline/ArrowRightIcon';

const ViewThanksMultiSeller = (props) => {
    const {
        t,
        isLogin,
        handleContinue,
        customerOrder,
    } = props;

    return (
        <div className={cx(
            'thanks-pages',
            'w-full flex flex-col items-center justify-center',
            'px-20 py-8',
            'bg-no-repeat bg-cover bg-center',
        )}
        >
            <div className="mt-5 mb-4 flex flex-col items-center justify-center w-full">
                <Typography variant="h1" className="uppercase">
                    {t('thanks:thanks')}
                </Typography>
                <Typography variant="span">
                    {t('thanks:placeInfo')}
                </Typography>
            </div>
            <table class="table-auto my-5">
                <thead>
                    <tr>
                        <th>{`${t('thanks:seller')}`}</th>
                        <th>Order ID</th>
                    </tr>
                </thead>
                <tbody>
                    {customerOrder
                            && customerOrder.length > 0
                            && customerOrder.map((item, key) => (
                                <tr key={key}>
                                    <td>
                                        {item.seller_name && `${item.seller_name}`}
                                        {item.seller_city && ` - ${item.seller_city}`}
                                    </td>
                                    <td align="right">
                                        {isLogin && isLogin == 1 ? (
                                            (
                                                <Link href={`/sales/order/view/order_id/${item?.order_number}`} passhref>

                                                    <b>{`#${item?.order_number}`}</b>

                                                </Link>
                                            )
                                        ) : (
                                            <b>{`#${item?.order_number}`}</b>
                                        )}
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </table>
            <Link href="/sales/order/history" passHref legacyBehavior>
                <Typography variant="bd-3" color="text-primary" className="uppercase">
                    {t('thanks:orderInfo')}
                </Typography>
            </Link>
            <Button onClick={handleContinue} endIcon={<IconArrow className="w-4 h-4" />}>
                <Typography variant="bd-3" color="text-neutral-white" className="uppercase">
                    {t('thanks:continue')}
                </Typography>
            </Button>
        </div>
    );
};

ViewThanksMultiSeller.propTypes = {
    storeConfig: propTypes.object.isRequired,
    checkoutData: propTypes.object.isRequired,
    t: propTypes.func.isRequired,
    customerOrder: propTypes.array.isRequired,
};

export default ViewThanksMultiSeller;
