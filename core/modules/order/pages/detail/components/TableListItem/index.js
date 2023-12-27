/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Alert from '@common/Alert';
import Typography from '@common_typography';

import { formatPrice } from '@helper_currency';

import cx from 'classnames';

import { basePath } from '@config';

const TableListProduct = (props) => {
    const { data, t, currency, currencyCache } = props;

    return (
        <div className={cx('relative', 'overflow-x-auto', 'rounded-lg')}>
            <table className={cx('mt-[30px]', 'shadow-none', 'w-full', 'border-[1px]', 'border-neutral-100')}>
                <thead>
                    <tr className={cx('mobile:max-tablet:hidden')}>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">#</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">{t('common:product:titleProduct')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">SKU</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">{t('common:title:note')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">{t('common:title:price')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">{t('common:title:shortQty')}</Typography>
                        </th>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">{t('common:subtotal')}</Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        <>
                            {data.map((val, index) => (
                                <tr
                                    className={cx(
                                        'mobile:max-tablet:grid',
                                        'mobile:max-tablet:border-b-[1px]',
                                        'mobile:max-tablet:border-b-neutral-200',
                                        'mobile:max-tablet:p-2',
                                        'even:bg-white',
                                        'odd:bg-neutral-50',
                                    )}
                                    key={index}
                                >
                                    <td>
                                        <div className={cx('h-[130px]', 'w-[105px]')}>
                                            <img
                                                src={val.image_url || `${basePath}/assets/img/placeholder.png`}
                                                className={cx('w-[105px]', 'h-auto')}
                                                alt={val.name}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `${basePath}/assets/img/placeholder.png`;
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="tablet:text-center">
                                        <Typography>{val.name}</Typography>
                                    </td>
                                    <td className="tablet:text-center">
                                        <Typography>{val.sku}</Typography>
                                    </td>
                                    <td className="tablet:text-center">
                                        <Typography>{val.note}</Typography>
                                    </td>
                                    <td className="tablet:text-center">
                                        <Typography>{formatPrice(val.price_incl_tax, currency, currencyCache)}</Typography>
                                    </td>
                                    <td className="tablet:text-center">
                                        <Typography>{val.qty_ordered}</Typography>
                                    </td>
                                    <td className="tablet:text-center">
                                        <Typography>{formatPrice(val.row_total_incl_tax, currency, currencyCache)}</Typography>
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : null}
                </tbody>
            </table>
        </div>
    );
};

export default TableListProduct;
