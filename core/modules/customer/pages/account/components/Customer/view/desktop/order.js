/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import { useReactiveVar } from '@apollo/client';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import { currencyVar } from '@core/services/graphql/cache';
import Cookies from 'js-cookie';
import Link from 'next/link';
import cx from 'classnames';
import Badge from '@common_badge';
import Button from '@common_button';
import Typography from '@common_typography';
import Alert from '@common_alert';
import ArrowDownIcon from '@heroicons/react/20/solid/ArrowDownIcon';

const OrderView = (props) => {
    const {
        customerOrders, t, reOrder, returnUrl,
    } = props;

    // cache currency
    const currencyCache = useReactiveVar(currencyVar);
    const currencyData = Cookies.get('app_currency') && JSON.parse(Cookies.get('app_currency'));

    const generateBadge = (status, status_label) => {
        if (status === 'processing' || status === 'pending' || status === 'payment_review') {
            return (
                <Badge
                    softColor
                    warning
                    className={cx('rounded-md', 'w-fit')}
                    label={<Typography className={cx('text-yellow-800', 'leading-md')}>{status_label}</Typography>}
                />
            );
        }
        if (status === 'canceled') {
            return (
                <Badge
                    softColor
                    error
                    className={cx('rounded-md', 'w-fit')}
                    label={<Typography className={cx('text-red-800', 'leading-md')}>{status_label}</Typography>}
                />
            );
        }
        if (status === 'complete') {
            return (
                <Badge
                    softColor
                    success
                    className={cx('rounded-md', 'w-fit')}
                    label={<Typography className={cx('text-green-800', 'leading-md')}>{status_label}</Typography>}
                />
            );
        }
        return (
            <Badge
                softColor
                secondary
                className={cx('rounded-md', 'w-fit')}
                label={<Typography className={cx('text-primary-800', 'leading-md')}>{status_label}</Typography>}
            />
        );
    };

    return (
        <div className={cx('pt-10')}>
            <div className={cx('address-title-section', 'pb-[18px]', 'border-b-[1.5px]', 'border-neutral-200', 'flex', 'flex-row')}>
                <Typography variant="h3" className={cx('mobile:max-desktop:hidden', 'pl-0')}>
                    {t('customer:order:recentOrder')}
                </Typography>
                <Button link="/sales/order/history" variant="plain" className={cx('pl-6', '!py-0')}>
                    <Typography variant="bd-2a" className={cx('!text-neutral-500', 'underline', 'underline-offset-2')}>
                        {t('customer:menu:viewall')}
                    </Typography>
                </Button>
            </div>
            <div className={cx('pt-[18px]')}>
                <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                    <table className={cx('w-full', 'text-base', 'border-[1px]', 'border-neutral-100')}>
                        <thead>
                            <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                <th className={cx('px-4', 'py-3')}>
                                    {t('customer:order:order')} # <ArrowDownIcon className={cx('inline-block', 'w-5', 'h-5')} />
                                </th>
                                <th className={cx('px-4', 'py-3')}>
                                    {t('customer:order:date')} <ArrowDownIcon className={cx('inline-block', 'w-5', 'h-5')} />
                                </th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:order:shippedTo')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:order:orderTotal')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:order:status')}</th>
                                <th className={cx('px-4', 'py-3', 'text-center')}>{t('customer:order:action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerOrders.items && customerOrders.items.length > 0 ? (
                                <>
                                    {customerOrders.items.map((val, index) => (
                                        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                            <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {val.order_number}
                                            </td>
                                            <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {formatDate(val.created_at, 'DD/MM/YYYY')}
                                            </td>
                                            <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {val.detail[0].shipping_address.firstname || val.detail[0].billing_address.firstname}{' '}
                                                {val.detail[0].shipping_address.lastname || val.detail[0].billing_address.lastname}
                                            </td>
                                            <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {formatPrice(
                                                    val.grand_total,
                                                    val.detail[0].global_currency_code
                                                        ? val.detail[0].global_currency_code
                                                        : currencyData.default_display_currency_code,
                                                    currencyCache,
                                                )}
                                            </td>
                                            <td>{generateBadge(val.status, val.status_label)}</td>
                                            <td>
                                                <Link href={`/sales/order/view/order_id/${val.order_number}`} className={cx('px-4')}>
                                                    <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                                        {t('order:view')}
                                                    </Typography>
                                                </Link>
                                                <button type="button" onClick={() => reOrder(val.order_number)}>
                                                    <a className={cx('px-4', 'desktop:border-l-[1px]', 'desktop:border-neutral-200')}>
                                                        <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                                            {t('order:reorder')}
                                                        </Typography>
                                                    </a>
                                                </button>
                                                {val.detail[0].aw_rma && val.detail[0].aw_rma.status && (
                                                    <button type="button" onClick={() => returnUrl(val.order_number)}>
                                                        <a className={cx('px-4', 'desktop:border-l-[1px]', 'desktop:border-neutral-200')}>
                                                            <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                                                {t('order:smReturn')}
                                                            </Typography>
                                                        </a>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <Alert severity="warning" withIcon>
                                            {t('customer:order:emptyMessage')}
                                        </Alert>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderView;
