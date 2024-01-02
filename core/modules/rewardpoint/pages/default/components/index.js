import Link from 'next/link';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import Layout from '@layout_customer';
import cx from 'classnames';
import Typography from '@common_typography';
import Show from '@common_show';
import Select from '@common_forms/Select';
import Pagination from '@common_pagination';
import Skeleton from '@common_skeleton';
import SkeletonRewardPoint from '@core_modules/rewardpoint/pages/default/components/skeleton';
import AlertWithIcon from '@common_alertwithicon';

const RewardPointView = (props) => {
    const {
        data, t, loading, getPath, getId, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, currencyCache,
    } = props;

    const hasTransaction = data?.transaction_history?.items && data?.transaction_history?.items?.length > 0;
    const pageInfo = data?.transaction_history?.page_info;
    const totalCount = data?.transaction_history?.total_count ?? 0;

    const formatPoint = (value) => {
        const price = formatPrice(value ?? 0, 'IDR', currencyCache);
        const priceSplit = price.replace(/\u00A0/, ' ').split(' ');
        const pointFormat = priceSplit[priceSplit.length - 1];

        if (price.includes('-')) {
            return `-${pointFormat}`;
        }

        return pointFormat;
    };

    return (
        <Layout {...props}>
            <div className={cx('rewardpoint-container', 'mobile:px-[15px]', 'tablet:px-[0px]', 'desktop:px-[0px]')}>
                <div className={cx('rewardpoint-balance-wrapper', 'flex', 'items-center', 'mt-[10px]')}>
                    <div>
                        <Typography variant="bd-2b">
                            {t('rewardpoint:balanceTitle')}
                            {' '}
                            <Show when={!loading}>
                                <b>{formatPoint(data.balance)}</b>
                            </Show>
                        </Typography>
                    </div>
                    <Show when={loading}>
                        <Skeleton width={50} height={15} className={cx('ml-[5px]', 'mt-[2px]')} />
                    </Show>
                </div>
                <div className={cx('rewardpoint-canbe-wrapper', 'flex', 'items-center')}>
                    <div>
                        <Typography variant="bd-2b">
                            {t('rewardpoint:canbeTitle')}
                            {' '}
                            <Show when={!loading}>
                                <b>{formatPrice(data.balanceCurrency ?? 0, 'IDR', currencyCache)}</b>
                            </Show>
                        </Typography>
                    </div>
                    <Show when={loading}>
                        <Skeleton width={50} height={15} className={cx('ml-[5px]', 'mt-[2px]')} />
                    </Show>
                </div>
                <div className={cx('rewardpoint-learn-more', 'flex', 'items-center')}>
                    <div>
                        <Typography variant="bd-2b">
                            {t('rewardpoint:learnMore').split('$')[0]}
                            <Link href="/[...slug]" as="/aw-reward-points" legacyBehavior>
                                <a target="_blank" rel="noopener noreferrer" className={cx('text-primary-700', 'hover:underline')}>
                                    {t('rewardpoint:learnMore').split('$')[1]}
                                </a>
                            </Link>
                        </Typography>
                    </div>
                </div>

                <div className={cx('pt-5')}>
                    <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                        <table className={cx('w-full', 'text-md', 'border-[1px]', 'border-neutral-100')}>
                            <thead>
                                <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                    <th className={cx('px-4', 'py-3')}>
                                        {t('rewardpoint:transactionId')}
                                        {' '}
                                        #
                                    </th>
                                    <th className={cx('px-4', 'py-3')}>{t('rewardpoint:balance')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('rewardpoint:comment')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('rewardpoint:expired')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('rewardpoint:point')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('rewardpoint:transactionDate')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Show when={loading}>
                                    <SkeletonRewardPoint />
                                </Show>
                                <Show when={!loading}>
                                    <Show when={hasTransaction}>
                                        <>
                                            {data?.transaction_history?.items.map((val, index) => (
                                                <tr className={cx('even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {val.transactionId}
                                                    </td>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {formatPoint(val.balance)}
                                                    </td>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {val.comment.split('<a').length > 1 && val.comment.includes('/sales/order/view/order_id') ? (
                                                            <div
                                                                className={cx('')}
                                                                // eslint-disable-next-line react/no-danger
                                                                dangerouslySetInnerHTML={{
                                                                    __html: `${val.comment.split('<a')[0]}
                                                                            <a href="${getPath(val.comment)}">#${getId(val.comment)}</a>
                                                                            `,
                                                                }}
                                                            />
                                                        ) : (
                                                            // eslint-disable-next-line react/no-danger
                                                            <div className={cx('')} dangerouslySetInnerHTML={{ __html: val.comment }} />
                                                        )}
                                                    </td>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {val.expirationDate ? formatDate(val.expirationDate, 'DD/MM/YYYY') : '-'}
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            val?.points < 0 ? 'text-red-500' : 'text-green-500',
                                                            'text-md',
                                                            'font-normal',
                                                            'leading-2lg',
                                                            'p-4',
                                                        )}
                                                    >
                                                        {formatPoint(val.points)}
                                                    </td>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {val.transactionDate ? formatDate(val.transactionDate, 'DD/MM/YYYY') : '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    </Show>
                                    <Show when={!hasTransaction}>
                                        <td colSpan={6}>
                                            <AlertWithIcon severity="warning">{t('rewardpoint:emptyMessage')}</AlertWithIcon>
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
                                <Typography className={cx('font-normal', 'leading-2lg')}>{`${totalCount ?? 0} ${t('common:label:data')}`}</Typography>
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

export default RewardPointView;
