/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { getReviews, addReview } from '@core_modules/product/services/graphql';
import { useFormik } from 'formik';
import Button from '@common_button';
import Typography from '@common_typography';
import dynamic from 'next/dynamic';
import ReviewCardForm from '@core_modules/product/pages/default/components/ReviewCardForm';
import Show from '@common_show';
import Divider from '@common_divider';
import Dialog from '@common_dialog';
import cx from 'classnames';
import * as Schema from '@core_modules/product/services/graphql/schema';
import * as Yup from 'yup';

const ReviewCard = dynamic(() => import('@core_modules/product/pages/default/components/ReviewCard'), { ssr: false });
const RatingStar = dynamic(() => import('@common_ratingstar'), { ssr: true });

const ReviewList = ({
    t,
    data: dataProduct,
    storeConfig,
    isLogin,
}) => {
    const [loadMore, setLoadMore] = React.useState(false);
    const [openReviewForm, setOpenReviewForm] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [reviewParams] = React.useState({
        sku: dataProduct?.sku || '',
        pageSize: 2,
    });
    const guest_review = storeConfig?.allow_guests_to_write_product_reviews;
    const { loading, fetchMore, data } = getReviews(reviewParams);
    const [addProductReview, { loading: loadingAddReview }] = addReview();

    const validationSchema = Yup.object().shape({
        nickname: Yup.string().required(t('product:validate:nickname')),
        title: Yup.string().required(t('product:validate:title')),
        detail: Yup.string().required(t('product:validate:detail')),
        rating: Yup.string().required(t('product:validate:rating')).nullable(),
    });

    const Formik = useFormik({
        initialValues: {
            nickname: '',
            rating: null,
            title: '',
            detail: '',
            pkValue: dataProduct?.id,
        },
        validationSchema,
        onSubmit: (value, { resetForm }) => {
            resetForm({});
            addProductReview({
                variables: {
                    ...value,
                },
            }).then(() => {
                setOpenReviewForm(false);
                window.toastMessage({
                    open: true,
                    text: t('product:addRateSuccess'),
                    variant: 'success',
                });
            }).catch(() => {
                setOpenReviewForm(false);
                window.toastMessage({
                    open: true,
                    text: t('product:addRateFailed'),
                    variant: 'error',
                });
            });
        },
    });

    const onWriteReview = () => {
        setOpenReviewForm(true);
    };

    const handleLoad = () => {
        setLoadMore(true);
        setPage(page + 1);
        return fetchMore({
            query: Schema.getReview(),
            fetchPolicy: 'cache-and-network',
            variables: {
                sku: reviewParams.sku,
                currentPage: page + 1,
                pageSize: reviewParams.pageSize,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                setLoadMore(false);
                const prevItems = previousResult.getProductReviews;
                const newItems = fetchMoreResult.getProductReviews;
                return {
                    getProductReviews: {
                        // eslint-disable-next-line no-underscore-dangle
                        __typename: newItems.__typename,
                        totalCount: newItems.totalCount,
                        message: prevItems.message,
                        items: [...prevItems.items, ...newItems.items],
                    },
                };
            },
        });
    };

    let review = {};
    review = data && data.getProductReviews
        ? data.getProductReviews
        : {
            items: [],
            totalCount: 0,
        };

    const [, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, [loading]);

    return (
        <div className={cx(
            'container-review-list',
        )}
        >
            <Dialog
                open={openReviewForm}
                title={t('common:label:writeReview')}
                content={<ReviewCardForm t={t} Formik={Formik} />}
                negativeLabel={t('common:button:cancel')}
                negativeAction={() => {
                    setOpenReviewForm(false);
                }}
                positiveLabel={t('common:button:submitReview')}
                positiveProps={{
                    icon: loadingAddReview,
                    loading: loadingAddReview,
                }}
                positiveAction={() => {
                    Formik.handleSubmit();
                }}
            />
            <div className={cx('container-review-list-sub')}>
                <div className="container-review-list-label">
                    <Typography variant="h1" className={cx('review-list-label-title', 'mb-[12px]')}>
                        {t('product:customerReview')}
                    </Typography>
                </div>
                <div className={cx('container-review-list-action', 'flex justify-between items-center', 'mb-[24px]')}>
                    <div className={cx('review-list-label-rating', 'flex items-center')}>
                        <RatingStar value={review?.totalCount || 0} />
                        <Typography variant="p-2" className="ml-[6px]">
                            {`(${(review?.totalCount) || 0} ${t('product:review')})`}
                        </Typography>
                    </div>
                    <Show when={isLogin === 1 || guest_review === '1'}>
                        <Button variant="outlined" onClick={() => onWriteReview()}>
                            <Typography variant="bd-2" type="bold" letter="uppercase">
                                {t('product:writeReview')}
                            </Typography>
                        </Button>
                    </Show>
                </div>
            </div>
            <Divider />
            <div className={cx('mt-[24px]')}>
                {review && review.items.map((item, index) => <ReviewCard key={index} {...item} />)}
                {review && review.totalCount > review.items.length && (
                    <Button variant="outlined" onClick={handleLoad} disabled={loading || loadMore}>
                        {loadMore || loading ? (
                            <Typography variant="p-1">
                                {`${t('common:menu:loading')}...`}
                            </Typography>
                        ) : (
                            <Typography variant="p-1">
                                {t('product:moreReview')}
                            </Typography>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ReviewList;
