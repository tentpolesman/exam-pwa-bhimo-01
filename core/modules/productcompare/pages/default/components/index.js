/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable max-len */
import Typography from '@common_typography';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';
import Empty from '@core_modules/productcompare/pages/default/components/empty';
import ProductItem from '@plugin_productitem';
import classNames from 'classnames';
import React from 'react';
import ClearIcon from '@heroicons/react/24/outline/XMarkIcon';

const Content = (props) => {
    const {
        t, handleRemoveProduct, compareList, storeConfig,
    } = props;
    const [columnWidth, setColumnWidth] = React.useState(null);
    const [confirmDel, setConfirmDel] = React.useState(false);
    const [selectDelete, setSelectDelet] = React.useState(null);

    React.useEffect(() => {
        if (!columnWidth && compareList) {
            const getWidht = typeof window !== 'undefined'
                ? window.innerWidth / (compareList.compareList.items.length + 1)
                : `${100 / (compareList.compareList.items.length + 1)}%`;
            setColumnWidth(getWidht);
        }
    }, [columnWidth, compareList]);

    const confirmDelete = (item) => {
        setConfirmDel(true);
        setSelectDelet(item);
    };
    const handleDelete = () => {
        setConfirmDel(false);
        handleRemoveProduct(selectDelete.uid);
    };

    const cancelDelete = () => {
        setConfirmDel(false);
        setSelectDelet(null);
    };

    if (compareList.compareList.items.length === 0) {
        return <Empty t={t} />;
    }

    return (
        <div className="flex flex-col gap-5 py-10">
            <Typography variant="h1" className="ml-4 desktop:ml-0">
                {t('common:productCompare:title')}
            </Typography>
            <div className="w-full overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="table-header-group">
                        <tr>
                            <th
                                className={classNames(
                                    'hidden tablet:table-cell',
                                    'sticky left-0 z-[9] bg-neutral-white',
                                    'border-r border-r-neutral-200',
                                    'align-[inherit] border-b border-b-neutral-200 tracking-widest',
                                )}
                                style={{ width: columnWidth }}
                                scope="col"
                            >
                                {' '}
                            </th>
                            {compareList.compareList.items.map((productCompare) => {
                                const { product, product_id } = productCompare;
                                return (
                                    <th
                                        align="center"
                                        className={classNames(
                                            'min-w-64',
                                            'table-cell p-4 align-[inherit] border-b border-b-neutral-200 tracking-widest',
                                        )}
                                        style={{ width: columnWidth }}
                                    >
                                        <div className={classNames(
                                            'w-max relative h-auto',
                                        )}
                                        >
                                            <ProductItem
                                                {...product}
                                                enableProductCompare={false}
                                                storeConfig={storeConfig}
                                                className="shadow-none border-none"
                                            />
                                            <ClearIcon className="cursor-pointer absolute w-5 h-5 top-1 right-1 z-[1]" onClick={() => confirmDelete(productCompare)} />
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                className={classNames(
                                    'hidden tablet:table-cell',
                                    'sticky left-0 z-[9] bg-neutral-white',
                                    'border-r border-r-neutral-200',
                                    'align-[inherit] border-b border-b-neutral-200 tracking-widest',
                                    'p-4',
                                )}
                                style={{ width: columnWidth }}
                            >
                                <Typography style={{ width: columnWidth }} className="uppercase">
                                    {t('common:productCompare:label:sku')}
                                </Typography>
                            </td>
                            {compareList.compareList.items.map((productCompare) => {
                                const { product } = productCompare;
                                return (
                                    <td
                                        className={classNames(
                                            'min-w-64',
                                            'border-b border-b-neutral-200',
                                            'p-4',
                                        )}
                                        style={{ width: columnWidth }}
                                    >
                                        <Typography
                                            variant="bd-3"
                                            className={classNames('uppercase desktop:hidden')}
                                        >
                                            {t('common:productCompare:label:sku')}
                                        </Typography>
                                        {product.sku}
                                    </td>
                                );
                            })}
                        </tr>
                        <tr>
                            <td
                                className={classNames(
                                    'hidden tablet:table-cell',
                                    'sticky left-0 z-[9] bg-neutral-white',
                                    'border-r border-r-neutral-200',
                                    'align-[inherit] border-b border-b-neutral-200 tracking-widest',
                                    'p-4',
                                )}
                                style={{ width: columnWidth }}
                            >
                                {t('common:productCompare:label:description')}
                            </td>
                            {compareList.compareList.items.map((productCompare) => {
                                const { product } = productCompare;
                                return (
                                    <td
                                        className={classNames(
                                            'min-w-64',
                                            'border-b border-b-neutral-200',
                                            'p-4',
                                        )}
                                        style={{ width: columnWidth }}
                                    >
                                        <Typography variant="bd-3" className="flex desktop:hidden">
                                            {t('common:productCompare:label:description')}
                                        </Typography>
                                        <div
                                            className="description-item"
                                            style={{ width: columnWidth }}
                                            dangerouslySetInnerHTML={{ __html: product.description.html }}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                        <tr>
                            <td
                                className={classNames(
                                    'hidden tablet:table-cell',
                                    'sticky left-0 z-[9] bg-neutral-white',
                                    'border-r border-r-neutral-200',
                                    'align-[inherit] border-b border-b-neutral-200 tracking-widest',
                                    'p-4',
                                )}
                                style={{ width: columnWidth }}
                            >
                                {t('common:productCompare:label:shortDescription')}
                            </td>
                            {compareList.compareList.items.map((productCompare) => {
                                const { product } = productCompare;
                                return (
                                    <td
                                        className={classNames(
                                            'min-w-64',
                                            'border-b border-b-neutral-200',
                                            'p-4',
                                        )}
                                        style={{ width: columnWidth }}
                                    >
                                        <Typography variant="bd-3" className="flex desktop:hidden">
                                            {t('common:productCompare:label:shortDescription')}
                                        </Typography>

                                        <div dangerouslySetInnerHTML={{ __html: product.short_description.html }} />
                                    </td>
                                );
                            })}
                        </tr>
                        <tr>
                            <td
                                className={classNames(
                                    'hidden tablet:table-cell',
                                    'sticky left-0 z-[9] bg-neutral-white',
                                    'border-r border-r-neutral-200',
                                    'align-[inherit] border-b border-b-neutral-200 tracking-widest',
                                    'p-4',
                                )}
                                style={{ width: columnWidth }}
                            >
                                {t('common:productCompare:label:brand')}
                            </td>
                            {compareList.compareList.items.map(() => (
                                <td
                                    className={classNames(
                                        'min-w-64',
                                        'border-b border-b-neutral-200',
                                        'p-4',
                                    )}
                                    style={{ width: columnWidth }}
                                >
                                    <Typography variant="bd-3" className="flex desktop:hidden">
                                        {t('common:productCompare:label:brand')}
                                    </Typography>
                                    {' '}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <ConfirmationDelete t={t} open={confirmDel} handleDelete={handleDelete} handleCancel={cancelDelete} />
        </div>
    );
};

export default Content;
