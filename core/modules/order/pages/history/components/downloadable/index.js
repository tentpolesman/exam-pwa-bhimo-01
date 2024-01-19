import { useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Layout from '@layout_customer';
import Typography from '@common_typography';
import Pagination from '@common_pagination';
import Alert from '@common/Alert';
import Show from '@common_show';
import formatDate from '@helper_date';
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';

const DefaultView = (props) => {
    const { data, t } = props;

    const [page, setPage] = useState(1);
    const itemCount = data?.length;
    const itemLimit = 10;
    const totalPage = itemCount < itemLimit ? 1 : Math.ceil(itemCount / itemLimit);

    const itemList = Array.from({ length: totalPage }, (_, i) => data.slice(i * itemLimit, i * itemLimit + itemLimit));

    const handleChangePage = (value) => {
        setPage(value);
    };

    const hasData = itemCount > 0;

    const PaginationComponent = () => (
        <div
            className={cx(
                'table-data pt-6 flex justify-between',
                'tablet:items-center tablet:flex-row',
                'mobile:flex-col',
            )}
        >
            <div className="flex justify-between items-center flex-1">
                <Typography className={cx('font-normal', 'leading-2lg')}>{`${itemCount ?? 0} ${t('common:label:data')}`}</Typography>
            </div>
            <div className={cx('flex', 'flex-row', 'items-center', 'mobile:max-tablet:pt-4', 'mobile:max-tablet:justify-center')}>
                <Pagination
                    handleChangePage={handleChangePage}
                    page={page}
                    siblingCount={0}
                    className={cx('!p-0')}
                    totalPage={totalPage}
                />
            </div>
        </div>
    );

    return (
        <Layout t={t} wishlist={[]}>
            <div className={cx('pt-5')}>
                <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                    <table className={cx('w-full', 'text-base', 'border-[1px]', 'border-neutral-100')}>
                        <thead>
                            <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                <th className={cx('px-4', 'py-3')}>
                                    {t('order:order')}
                                    {' '}
                                    #
                                </th>
                                <th className={cx('px-4', 'py-3')}>{t('order:date')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('order:titleDownload')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('order:status')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('order:remaining')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Show when={hasData}>
                                {itemList?.[page - 1]?.map((val, index) => (
                                    <tr className={cx('even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                        <td className={cx('p-4')}>
                                            <Link href={`/sales/order/view/order_id/${val.order_increment_id}`} className={cx('hover:underline')}>
                                                <Typography variant="bd-2b" className={cx('!text-primary-700', 'hover:underline')}>
                                                    {val.order_increment_id}
                                                </Typography>
                                            </Link>
                                        </td>
                                        <td className={cx('p-4')}>
                                            <Typography variant="bd-2b">{formatDate(val.date, 'M/DD/YY')}</Typography>
                                        </td>
                                        <td className={cx('p-4')}>
                                            <div>
                                                <Typography variant="bd-2b">{val.title}</Typography>
                                            </div>
                                            <Show when={val.status === 'available'}>
                                                <Link href={val.download_url} target="_blank" rel="noreferrer">
                                                    <div
                                                        className={cx(
                                                            'flex flex-row items-center',
                                                            'text-primary-700',
                                                            'border-b-[1px] border-neutral-white',
                                                            'hover:border-primary-700',
                                                            'w-max',
                                                        )}
                                                    >
                                                        <div className="h-[15px] w-[15px] mr-[5px]">
                                                            <ArrowDownTrayIcon />
                                                        </div>
                                                        <Typography variant="bd-2b" className={cx('!text-primary-700')}>
                                                            {val.link_title}
                                                        </Typography>
                                                    </div>
                                                </Link>
                                            </Show>
                                        </td>
                                        <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'p-4')}>
                                            <Typography variant="bd-2b">{val.status}</Typography>
                                        </td>
                                        <td className={cx('text-neutral-700', 'text-base', 'font-normal', 'leading-2lg', 'p-4')}>
                                            <Typography variant="bd-2b">{val.remaining_downloads}</Typography>
                                        </td>
                                    </tr>
                                ))}
                            </Show>
                            <Show when={!hasData}>
                                <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
                                    <td colSpan={5} className="p-4">
                                        <Alert severity="warning" withIcon>
                                            {t('order:notFound')}
                                        </Alert>
                                    </td>
                                </tr>
                            </Show>
                        </tbody>
                    </table>
                </div>
                {/** show pagination */}
                <Show when={hasData}>
                    <PaginationComponent />
                </Show>
            </div>
        </Layout>
    );
};

export default DefaultView;
