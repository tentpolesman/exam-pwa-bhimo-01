/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import formatDate from '@helper_date';
import Layout from '@layout_customer';
import RatingStar from '@common_ratingstar';
import Show from '@common_show';
import Typography from '@common_typography';
import Select from '@common_forms/Select';
import Pagination from '@common_pagination';
import Link from 'next/link';
import cx from 'classnames';
import SkeletonProductReview from '@core_modules/productreview/pages/default/components/skeleton';
import DetailProductReview from '@core_modules/productreview/pages/default/components/detail';
import Alert from '@common_alert';

const ProductReviewPage = (props) => {
    const {
        t, reviewCustomer, loading, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage,
    } = props;

    const [isOpenDetail, setOpenDetail] = React.useState(false);
    const [reviewItem, setReviewItem] = React.useState(null);

    const openDetail = (state, val = null) => {
        setOpenDetail(state);
        setReviewItem(val);
    };

    const hasReview = reviewCustomer?.items && reviewCustomer?.items?.length > 0;
    const pageInfo = reviewCustomer?.page_info;

    return (
        <Layout {...props}>
            <div className={cx('productreview-container', 'mobile:px-[15px]', 'tablet:px-[0px]', 'desktop:px-[0px]')}>
                <DetailProductReview t={t} open={isOpenDetail} setOpen={() => openDetail(false)} reviewItem={reviewItem} />
                <div className={cx('pt-5')}>
                    <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
                        <table className={cx('w-full', 'text-md', 'border-[1px]', 'border-neutral-100')}>
                            <thead>
                                <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                    <th className={cx('px-4', 'py-3')}>{t('productreview:created')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('productreview:productName')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('productreview:rating')}</th>
                                    <th className={cx('px-4', 'py-3')}>{t('productreview:review')}</th>
                                    <th className={cx('px-4', 'py-3')} />
                                </tr>
                            </thead>
                            <tbody>
                                <Show when={loading}>
                                    <SkeletonProductReview />
                                </Show>
                                <Show when={!loading}>
                                    <Show when={hasReview}>
                                        <>
                                            {reviewCustomer?.items?.map((val, index) => (
                                                <tr className={cx('even:bg-white', 'odd:bg-neutral-50')} key={index}>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {formatDate(val.created_at, 'DD/MM/YYYY')}
                                                    </td>
                                                    <td className={cx('text-green-500', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        <Link href={`/${val.product.url_key}`} legacyBehavior>
                                                            <a target="_blank" rel="noopener noreferrer">
                                                                {val.product.name}
                                                            </a>
                                                        </Link>
                                                    </td>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        <RatingStar value={val?.ratings_breakdown[0]?.value ?? 0} />
                                                    </td>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        {val.text}
                                                    </td>
                                                    <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-4')}>
                                                        <button
                                                            type="button"
                                                            onClick={() => openDetail(true, val)}
                                                            aria-label="see-details"
                                                            className="w-max"
                                                        >
                                                            <a className={cx('text-md', 'text-primary-700', 'hover:underline')}>
                                                                {t('productreview:seeDetails')}
                                                            </a>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    </Show>
                                    <Show when={!hasReview}>
                                        <td colSpan={5}>
                                            <Alert severity="warning" withIcon>
                                                {t('productreview:emptyMessage')}
                                            </Alert>
                                        </td>
                                    </Show>
                                </Show>
                            </tbody>
                        </table>
                    </div>
                    <div className={cx('table-data', 'pt-6', 'flex', 'flex-row', 'justify-end')}>
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
                                        value: (pageInfo?.total_pages ?? 1) * rowsPerPage,
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

export default ProductReviewPage;
