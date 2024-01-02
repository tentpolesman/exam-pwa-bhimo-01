/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import { useReactiveVar } from '@apollo/client';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import { currencyVar } from '@root/core/services/graphql/cache';
import Cookies from 'js-cookie';
// eslint-disable-next-line no-unused-vars
import Link from 'next/link';

import cx from 'classnames';

import Badge from '@common_badge';
import Button from '@common_button';
import Typography from '@common_typography';

import MobileTabletActionMenu from '@core_modules/customer/pages/account/components/Customer/view/mobile/plugins/MobileTabletActionMenu';

import ArrowDownIcon from '@heroicons/react/20/solid/ArrowDownIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

const OrderView = (props) => {
    const { customerOrders, t, reOrder } = props;

    // cache currency
    const currencyCache = useReactiveVar(currencyVar);

    const customerData = Cookies.get('cdt') && JSON.parse(Cookies.get('cdt'));
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
        <div className={cx('pt-10', 'mobile:max-tablet:px-4')}>
            <div className={cx('address-title-section', 'pb-[18px]', 'border-b-[1.5px]', 'border-neutral-200', 'flex', 'flex-row')}>
                <Typography variant="h3" className={cx('desktop:hidden', 'pl-0')}>
                    {t('customer:order:recentOrder')}
                </Typography>
                <Button link="/sales/order/history" variant="plain" className={cx('pl-6', '!py-0')}>
                    <Typography variant="bd-2a" className={cx('!text-neutral-500', 'underline', 'underline-offset-2')}>
                        {t('customer:menu:viewall')}
                    </Typography>
                </Button>
            </div>
            <div className={cx('pt-[18px]')}>
                <div className={cx('relative', 'overflow-x-auto', 'rounded-lg', 'mobile:max-tablet:hidden')}>
                    <table className={cx('w-full', 'text-md', 'border-[1px]', 'border-neutral-100')}>
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
                                <th className={cx('px-4', 'py-3')}>{t('customer:order:action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerOrders.items && customerOrders.items.length > 0 ? (
                                <>
                                    {customerOrders.items.map((val, index) => (
                                        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                            <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {val.order_number}
                                            </td>
                                            <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {formatDate(val.created_at, 'DD/MM/YYYY')}
                                            </td>
                                            <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {val.detail[0].shipping_address !== null
                                                    ? val.detail[0].shipping_address.firstname
                                                    : customerData.firstname}{' '}
                                                {val.detail[0].shipping_address !== null
                                                    ? val.detail[0].shipping_address.lastname
                                                    : customerData.lastname}
                                            </td>
                                            <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {formatPrice(
                                                    val.grand_total,
                                                    val.detail[0].global_currency_code
                                                        ? val.detail[0].global_currency_code
                                                        : currencyData.default_display_currency_code,
                                                    currencyCache,
                                                )}
                                            </td>
                                            <td>{generateBadge(val.status, val.status_label)}</td>
                                            <td
                                                className={cx(
                                                    'tablet:max-desktop:flex',
                                                    'tablet:max-desktop:flex-row',
                                                    'tablet:max-desktop:content-center',
                                                    'tablet:max-desktop:justify-center',
                                                    'tablet:max-desktop:items-center',
                                                    'tablet:max-desktop:py-6',
                                                )}
                                            >
                                                <MobileTabletActionMenu t={t} orderNumber={val.order_number} reOrder={reOrder} />
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <Button
                                            icon={<ExclamationTriangleIcon />}
                                            iconProps={{
                                                className: cx('!text-yellow-500'),
                                            }}
                                            iconPosition="left"
                                            className={cx(
                                                'w-full',
                                                'bg-yellow-50',
                                                'hover:bg-yellow-50',
                                                'focus:bg-yellow-50',
                                                'active:bg-yellow-50',
                                                'hover:shadow-none',
                                                'focus:shadow-none',
                                                'active:shadow-none',
                                                'cursor-auto',
                                                'hover:cursor-auto',
                                                'focus:cursor-auto',
                                                'active:cursor-auto',
                                            )}
                                        >
                                            <Typography className={cx('!text-yellow-600')}>{t('customer:order:emptyMessage')}</Typography>
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div
                    className={cx(
                        'mobile:max-tablet:relative',
                        'mobile:max-tablet:grid',
                        'mobile:max-tablet:grid-cols-1',
                        'mobile:max-tablet:gap-4',
                        'tablet:hidden',
                    )}
                >
                    {customerOrders &&
                        customerOrders.items &&
                        customerOrders.items.length > 0 &&
                        customerOrders.items.map((val, index) => (
                            <div className={cx('p-4', 'rounded-lg', 'border-[1px]', 'border-neutral-100', 'grid', 'grid-cols-1')} key={index}>
                                <div className={cx('first-row-content', 'flex', 'flex-row', 'justify-between')}>
                                    <div className={cx('order-status')}>{generateBadge(val.status, val.status_label)}</div>
                                    <div className={cx('order-action')}>
                                        <MobileTabletActionMenu t={t} orderNumber={val.order_number} reOrder={reOrder} />
                                    </div>
                                </div>
                                <div className={cx('order-number')}>
                                    <Typography className={cx('leading-md')}>{val.order_number}</Typography>
                                </div>
                                <div className={cx('order-date')}>
                                    <Typography className={cx('leading-md')}>{formatDate(val.created_at, 'DD/MM/YYYY')}</Typography>
                                </div>
                                <div className={cx('order-name', 'pt-5')}>
                                    <Typography className={cx('leading-md')}>
                                        {val.detail[0].shipping_address !== null ? val.detail[0].shipping_address.firstname : customerData.firstname}{' '}
                                        {val.detail[0].shipping_address !== null ? val.detail[0].shipping_address.lastname : customerData.lastname}
                                    </Typography>
                                </div>
                                <div className={cx('order-date')}>
                                    <Typography className={cx('leading-md')}>
                                        {formatPrice(
                                            val.grand_total,
                                            val.detail[0].global_currency_code
                                                ? val.detail[0].global_currency_code
                                                : currencyData.default_display_currency_code,
                                            currencyCache,
                                        )}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default OrderView;
