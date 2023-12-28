import { useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Layout from '@layout_customer';
import Typography from '@common_typography';
import Pagination from '@common_pagination';
import Alert from '@common/Alert';
import Show from '@common_show';
import formatDate from '@helper_date';

const DefaultView = (props) => {
    const {
        data, t,
    } = props;

    const [page, setPage] = useState(1);
    const itemCount = data?.length;
    const itemLimit = 10;
    const totalPage = itemCount < itemLimit ? 1 : Math.round(itemCount / itemLimit);

    const itemList = Array.from({ length: totalPage }, (_, i) =>
        data.slice(i * itemLimit, i * itemLimit + itemLimit));

    const handleChangePage = (value) => {
        setPage(value);
    };

    return (
        <Layout t={t} wishlist={[]}>
            <div className={cx('pt-5')}>
                <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                    <table className={cx('w-full', 'text-md', 'border-[1px]', 'border-neutral-100')}>
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
                            <Show when={data?.length > 0}>
                                {itemList?.[page - 1]?.map((val, index) => (
                                    <tr className={cx('even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                        <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                            <Link
                                                href={`/sales/order/view/order_id/${val.order_increment_id}`}
                                                className={cx(
                                                    'hover:text-primary-700',
                                                )}
                                            >
                                                {val.order_increment_id}
                                            </Link>
                                        </td>
                                        <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                            {formatDate(val.date, 'M/DD/YY')}
                                        </td>
                                        <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                            <span className={cx('pr-4')}>
                                                {val.title}
                                            </span>
                                            <Show when={val.status === 'available'}>
                                                <Link
                                                    href={val.download_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={cx(
                                                        'pl-4',
                                                        'border-l-[1px]',
                                                        'border-neutral-200',
                                                        'hover:text-primary-700',
                                                    )}
                                                >
                                                    {val.link_title}
                                                </Link>
                                            </Show>
                                        </td>
                                        <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                            {val.status}
                                        </td>
                                        <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                            {val.remaining_downloads}
                                        </td>
                                    </tr>
                                ))}
                            </Show>
                            <Show when={data?.length === 0}>
                                <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
                                    <td colSpan={5} className="p-4">
                                        <Alert severity="warning">
                                            <Typography
                                                variant="p-2a"
                                                className={cx()}
                                            >
                                                {t('order:notFound')}
                                            </Typography>
                                        </Alert>
                                    </td>
                                </tr>
                            </Show>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={cx('pt-8 flex items-center justify-between')}>
                <Typography variant="p-2" className={cx('')}>
                    {`${itemCount} Item(s)`}
                </Typography>
                <Pagination
                    handleChangePage={handleChangePage}
                    page={page}
                    siblingCount={0}
                    className={cx('!p-0')}
                    totalPage={totalPage}
                />
            </div>
        </Layout>
    );
};

export default DefaultView;
