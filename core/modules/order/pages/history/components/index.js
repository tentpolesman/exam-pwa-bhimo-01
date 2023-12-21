/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

import Link from 'next/link';

import { useReactiveVar } from '@apollo/client';

import { currencyVar } from '@root/core/services/graphql/cache';

import cx from 'classnames';

import Layout from '@layout_customer';

import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';

import Badge from '@common_badge';
import Select from '@common_forms/Select';
import Pagination from '@common_pagination';
import Typography from '@common_typography';

const DefaultView = (props) => {
    const {
        data, t, page, storeConfig, reOrder, pageSize, handleChangePage, handleChangePageSize, loadMore,
    } = props;

    // cache currency
    const currencyCache = useReactiveVar(currencyVar);

    const generateBadge = (status, status_label) => {
        if (status === 'processing' || status === 'pending' || status === 'payment_review') {
            return (
                <Badge
                    softColor
                    warning
                    className={cx('rounded-md', 'w-fit')}
                    label={
                        <Typography variant="body-sm" className={cx('text-yellow-800', 'leading-md')}>
                            {status_label}
                        </Typography>
                    }
                />
            );
        }
        if (status === 'canceled') {
            return (
                <Badge
                    softColor
                    error
                    className={cx('rounded-md', 'w-fit')}
                    label={
                        <Typography variant="body-sm" className={cx('text-red-800', 'leading-md')}>
                            {status_label}
                        </Typography>
                    }
                />
            );
        }
        if (status === 'complete') {
            return (
                <Badge
                    softColor
                    success
                    className={cx('rounded-md', 'w-fit')}
                    label={
                        <Typography variant="body-sm" className={cx('text-green-800', 'leading-md')}>
                            {status_label}
                        </Typography>
                    }
                />
            );
        }
        return (
            <Badge
                softColor
                secondary
                className={cx('rounded-md', 'w-fit')}
                label={
                    <Typography variant="body-sm" className={cx('text-primary-800', 'leading-md')}>
                        {status_label}
                    </Typography>
                }
            />
        );
    };

    return (
        <Layout t={t} wishlist={[]}>
            <div className={cx('pt-5')}>
                <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                    <table className={cx('w-full', 'text-md', 'border-[1px]', 'border-neutral-100')}>
                        <thead>
                            <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                <th className={cx('px-4', 'py-3')}>{t('customer:order:order')} #</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:order:date')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:order:shippedTo')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:order:orderTotal')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:order:status')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:order:action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.items && data.items.length > 0 ? (
                                <>
                                    {data.items.map((val, index) => (
                                        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                            <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {val.order_number}
                                            </td>
                                            <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {formatDate(val.created_at, 'DD/MM/YYYY')}
                                            </td>
                                            <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {val.detail[0].shipping_address.firstname || val.detail[0].billing_address.firstname}{' '}
                                                {val.detail[0].shipping_address.lastname || val.detail[0].billing_address.lastname}
                                            </td>
                                            <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                {formatPrice(val.grand_total, storeConfig.base_currency_code || 'IDR', currencyCache)}
                                            </td>
                                            <td>{generateBadge(val.status, val.status_label)}</td>
                                            <td>
                                                <Link
                                                    href={`/sales/order/view/order_id/${val.order_number}`}
                                                    className={cx(
                                                        'text-md',
                                                        'px-4',
                                                        'border-r-[1px]',
                                                        'border-neutral-200',
                                                        'hover:text-primary-700',
                                                    )}
                                                >
                                                    View
                                                </Link>
                                                <button type="button" onClick={() => reOrder(val.order_number)}>
                                                    <a className={cx('text-md', 'px-4', 'hover:text-primary-700')}>Reorder</a>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : null}
                        </tbody>
                    </table>
                </div>
                <div className={cx('table-data', 'pt-6', 'flex', 'flex-row', 'justify-between')}>
                    <div className={cx('pt-2')}>
                        <Typography className={cx('font-normal', 'leading-2lg')}>
                            {data && data.total_count && `${data.total_count} Item(s)`}
                        </Typography>
                    </div>
                    <div className={cx('flex', 'flex-row')}>
                        <Typography className={cx('font-normal', 'leading-2lg', 'p-3')}>Show</Typography>
                        <Select
                            name="show"
                            value={pageSize}
                            onChange={handleChangePageSize}
                            options={[
                                {
                                    label: 10,
                                    value: 10,
                                },
                                {
                                    label: 20,
                                    value: 20,
                                },
                                {
                                    label: 50,
                                    value: 50,
                                },
                                {
                                    label: 'All',
                                    value: data && data.total_count,
                                },
                            ]}
                            textFiledProps={{ className: cx('w-[80px]') }}
                            inputProps={{ className: cx('!py-0') }}
                        />
                        <Pagination
                            handleChangePage={handleChangePage}
                            page={data && data.current_page}
                            maxPageRender={pageSize}
                            className={cx('!p-0')}
                            totalPage={data && data.total_pages}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DefaultView;
