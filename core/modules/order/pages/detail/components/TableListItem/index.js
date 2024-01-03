/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Image from '@common_image';
import Typography from '@common_typography';

import { formatPrice } from '@helper_currency';

import cx from 'classnames';

import { basePath } from '@config';

const TableListProduct = (props) => {
    const { data, t, currency, currencyCache } = props;

    return (
        <div className={cx('relative', 'overflow-x-auto')}>
            <div className={cx('tablet:hidden', 'flex', 'flex-col', 'gap-y-4', 'py-4')}>
                {data &&
                    data.map((product, index) => (
                        <div
                            className={cx(
                                'product-wrapper',
                                'grid',
                                'mobile:max-[511px]:grid-cols-1',
                                'mobile:max-[511px]:gap-y-2',
                                'min-[512px]:grid-cols-[4fr_8fr]',
                                'bg-neutral-50',
                                'p-4',
                                'rounded-lg',
                            )}
                            key={index}
                        >
                            <div className={cx('product-image', 'w-[105px]', 'h-[130px]')}>
                                <Image
                                    src={product.image_url || `${basePath}/assets/img/placeholder.png`}
                                    width={105}
                                    height={130}
                                    alt={product.name}
                                />
                            </div>
                            <div className={cx('product-info', 'flex', 'flex-col', 'justify-center')}>
                                <Typography>{product.name}</Typography>
                                <Typography>{product.sku}</Typography>
                                <Typography>{product.note}</Typography>
                                <Typography>{formatPrice(product.price_incl_tax, currency, currencyCache)}</Typography>
                                <Typography>{product.qty_ordered}</Typography>
                                <Typography>{formatPrice(product.row_total_incl_tax, currency, currencyCache)}</Typography>
                            </div>
                        </div>
                    ))}
            </div>
            <table className={cx('mobile:max-tablet:hidden', 'mt-[30px]', 'shadow-none', 'w-full', 'border-[1px]', 'border-neutral-100')}>
                <thead>
                    <tr>
                        <th className={cx('px-4', 'py-3')}>
                            <Typography type="bold">#</Typography>
                        </th>
                        <th className={cx('py-3', 'text-left')}>
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
                                            <Image
                                                src={val.image_url || `${basePath}/assets/img/placeholder.png`}
                                                width={105}
                                                height={130}
                                                alt={val.name}
                                            />
                                        </div>
                                    </td>
                                    <td className="tablet:text-left">
                                        <Typography>{val.name}</Typography>
                                    </td>
                                    <td className="tablet:text-center">
                                        <Typography>{val.sku}</Typography>
                                    </td>
                                    <td className="tablet:text-center">
                                        <Typography>{val.note || '-'}</Typography>
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
