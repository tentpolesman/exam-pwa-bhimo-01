import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import Layout from '@layout_customer';
import cx from 'classnames';
import Typography from '@common_typography';
import Show from '@common_show';
import Select from '@common_forms/Select';
import Pagination from '@common_pagination';
import Button from '@common_button';
import Skeleton from '@common_skeleton';
import SkeletonStoreCredit from '@core_modules/storecredit/pages/default/components/skeleton';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

const StoreCreditPage = (props) => {
    const {
        t, storeCredit, loading, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, currencyCache,
    } = props;

    const hasTransaction = storeCredit?.transaction_history?.items && storeCredit?.transaction_history?.items?.length > 0;
    const pageInfo = storeCredit?.transaction_history?.page_info;
    const totalCount = storeCredit?.transaction_history?.total_count ?? 0;

    return (
        <Layout {...props}>
            <div className={cx('storecredit-container', 'mobile:px-[15px]', 'tablet:px-[0px]', 'desktop:px-[0px]')}>
                <div className={cx('storecredit-balance-wrapper', 'flex', 'items-center')}>
                    <div>
                        <Typography variant="bd-2b">
                            {t('storecredit:balance')}
                            {' '}
                            <Show when={!loading}>
                                <b>
                                    {formatPrice(
                                        storeCredit?.current_balance?.value ?? 0,
                                        storeCredit?.current_balance?.currency ?? 'IDR',
                                        currencyCache,
                                    )}
                                </b>
                            </Show>
                        </Typography>
                    </div>
                    <Show when={loading}>
                        <Skeleton width={50} height={15} className={cx('ml-[5px]', 'mt-[2px]')} />
                    </Show>
                </div>

                <div className={cx('pt-5')}>
                    <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                        <table className={cx('w-full', 'text-md', 'border-[1px]', 'border-neutral-100')}>
                            <thead>
                                <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                    <th className={cx('px-4', 'py-3')}>
                                        {t('storecredit:transactionId')}
                                        {' '}
                                        #
                                    </th>
                                    <th className={cx('px-4', 'py-3')}>{t('storecredit:adjustment')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('storecredit:creditbalance')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('storecredit:comment')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('storecredit:transactionDate')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Show when={loading}>
                                    <SkeletonStoreCredit />
                                </Show>
                                <Show when={!loading}>
                                    <Show when={hasTransaction}>
                                        <>
                                            {storeCredit?.transaction_history?.items.map((val, index) => (
                                                <tr className={cx('even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {val.transaction_id}
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            val?.store_credit_adjustment?.value < 0 ? 'text-red-500' : 'text-green-500',
                                                            'text-md',
                                                            'font-normal',
                                                            'leading-2lg',
                                                            'p-4',
                                                        )}
                                                    >
                                                        {formatPrice(
                                                            val.store_credit_adjustment.value,
                                                            val.store_credit_adjustment.currency,
                                                            currencyCache,
                                                        )}
                                                    </td>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {formatPrice(
                                                            val.store_credit_balance.value,
                                                            val.store_credit_balance.currency,
                                                            currencyCache,
                                                        )}
                                                    </td>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {val.comment}
                                                    </td>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {formatDate(val.created_at, 'DD/MM/YYYY')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    </Show>
                                    <Show when={!hasTransaction}>
                                        <td colSpan={5}>
                                            <Button
                                                icon={<ExclamationTriangleIcon />}
                                                iconProps={{
                                                    className: cx('!text-yellow-500'),
                                                }}
                                                iconPosition="left"
                                                className={cx(
                                                    'mt-4',
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
                                                <Typography className={cx('!text-yellow-600')}>{t('storecredit:emptyMessage')}</Typography>
                                            </Button>
                                        </td>
                                    </Show>
                                </Show>
                            </tbody>
                        </table>
                    </div>
                    <div className={cx('table-data', 'pt-6', 'flex', 'flex-row', 'justify-between')}>
                        <div className={cx('pt-2')}>
                            <Show when={loading}>
                                <Skeleton width={50} height={25} />
                            </Show>
                            <Show when={!loading}>
                                <Typography className={cx('font-normal', 'leading-2lg')}>
                                    {`${totalCount ?? 0} ${t('common:label:items')}`}
                                </Typography>
                            </Show>
                        </div>
                        <div className={cx('flex', 'flex-row')}>
                            <Typography className={cx('font-normal', 'leading-2lg', 'p-3')}>{t('common:label:show')}</Typography>
                            <Select
                                name="show"
                                value={rowsPerPage}
                                onChange={handleChangeRowsPerPage}
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
                                        label: t('common:label:all'),
                                        value: totalCount,
                                    },
                                ]}
                                textFiledProps={{ className: cx('w-[80px]') }}
                                inputProps={{ className: cx('!py-0') }}
                            />
                            <Pagination
                                handleChangePage={handleChangePage}
                                page={page}
                                siblingCount={1}
                                className={cx('!p-0')}
                                totalPage={pageInfo?.total_pages}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default StoreCreditPage;
