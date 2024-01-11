/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Button from '@common_button';
import Typography from '@common_typography';
import formatDate from '@helper_date';
import Router from 'next/router';
import Layout from '@layout_customer';
import Alert from '@common/Alert';
import cx from 'classnames';

import Skeleton from '@core_modules/rma/pages/history/components/Skeleton';

const HistoryContent = (props) => {
    const {
        loading, data, error, t, pageSize, page, handleChangePage, handleChangePageSize,
    } = props;

    if (error) {
        return (
            <Layout {...props} title={t('customer:menu:return')}>
                <Alert saverity="error" className="mt-4">
                    {t('rma:error:fetch')}
                </Alert>
            </Layout>
        );
    }

    if (loading || !data) {
        return <Layout {...props}><Skeleton /></Layout>;
    }

    if (!loading && data) {
        if (data.getCustomerRequestAwRma.items.length === 0) {
            return (
                <Layout {...props} title={t('customer:menu:return')}>
                    <Alert severity="warning" className="mt-4">
                        {t('rma:error:notFound')}
                    </Alert>
                </Layout>
            );
        }
    }

    return (
        <Layout {...props}>
            <div className="flex flex-col gap-4 overflow-x-auto">
                <table className={cx('w-full', 'text-base', 'border-[1px] rounded-md', 'border-neutral-100')}>
                    <thead>
                        <tr className={cx(
                            'text-neutral-500',
                            'font-semibold', 'leading-2lg', 'text-left',
                            'hidden desktop:table-row',
                        )}
                        >
                            <th align="left" className={cx('px-4', 'py-3')}>{t('rma:table:returnId')}</th>
                            <th align="left" className={cx('px-4', 'py-3')}>{t('rma:table:orderId')}</th>
                            <th align="left" className={cx('px-4', 'py-3')}>{t('rma:table:products')}</th>
                            <th align="left" className={cx('px-4', 'py-3')}>{t('rma:table:status')}</th>
                            <th align="left" className={cx('px-4', 'py-3')}>{t('rma:table:actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data.getCustomerRequestAwRma.items.length > 0 ? (
                            <>
                                {
                                    data.getCustomerRequestAwRma.items.map((val, index) => (
                                        <tr
                                            className={cx(
                                                'even:bg-white', 'odd:bg-neutral-50',
                                                'flex flex-col',
                                                'desktop:table-row',
                                                'border-b border-b-neutral-100',
                                                'desktop:border-none',
                                            )}
                                            key={index}
                                        >
                                            <td
                                                className="p-4"
                                                align="left"
                                            >
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className="basis 1/3 inline-block desktop:hidden">
                                                        <Typography variant="bd-2">
                                                            {t('rma:table:returnId')}
                                                        </Typography>
                                                    </div>
                                                    <Typography variant="bd-2b">{val.increment_id}</Typography>
                                                </div>
                                            </td>
                                            <td
                                                className="p-4"
                                                align="left"
                                            >
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className="basis 1/3 inline-block desktop:hidden">
                                                        <Typography variant="bd-2">
                                                            {t('rma:table:returnId')}
                                                        </Typography>
                                                    </div>
                                                    <Typography variant="bd-2b">{val.order_number}</Typography>
                                                </div>
                                            </td>
                                            <td
                                                className="p-4"
                                                align="left"
                                            >
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className="basis 1/3 inline-block desktop:hidden">
                                                        <Typography variant="bd-2">
                                                            {t('rma:table:products')}
                                                        </Typography>
                                                    </div>
                                                    <Typography variant="bd-2b">
                                                        {
                                                            val.items.map((item) => `${item.name}, `)
                                                        }
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td
                                                className="p-4"
                                                align="left"
                                            >
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className="basis 1/3 inline-block desktop:hidden">
                                                        <Typography variant="bd-2">
                                                            {t('rma:table:status')}
                                                        </Typography>
                                                    </div>
                                                    <Typography variant="bd-2b">{val.status.name}</Typography>
                                                </div>
                                            </td>
                                            <td
                                                className="p-4"
                                                align="left"
                                            >
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className="basis 1/3 inline-block desktop:hidden">
                                                        <Typography variant="bd-2">
                                                            {t('rma:table:actions')}
                                                        </Typography>
                                                    </div>
                                                    <Button
                                                        variant="plain"
                                                        className="!p-0 text-center"
                                                        onClick={() => Router.push(
                                                            '/rma/customer/view/id/[id]',
                                                            `/rma/customer/view/id/${val.increment_id}`,
                                                        )}
                                                        align="left"
                                                    >
                                                        <Typography
                                                            variant="bd-2"
                                                            className="underline"
                                                        >
                                                            {t('rma:table:view')}
                                                        </Typography>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </>
                        ) : (
                            <tr>
                                <td colSpan={7}>
                                    <Alert severity="warning">{t('rma:empty')}</Alert>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default HistoryContent;
