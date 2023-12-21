/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
// import Button from '@common_button';
// import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';
import React from 'react';
import Show from '@common/Show';
import TableItem from '@core_modules/cart/pages/default/components/item/TableListItem/TableItem';

const TableListProduct = ({
    dataCart, t, deleteItem, handleFeed, toggleEditDrawer, storeConfig = {}, currencyCache,
    ...other
}) => {
    const [confirmDel, setConfirmDel] = React.useState(false);
    const [selectDelete, setSelectDelet] = React.useState(null);
    const confirmDelete = (item) => {
        setConfirmDel(true);
        setSelectDelet(item);
    };
    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem({
            id: selectDelete.id,
            product: selectDelete.product,
            quantity: selectDelete.quantity,
            prices: selectDelete.custom_price,
        });
    };

    const cancelDelete = () => {
        setConfirmDel(false);
        setSelectDelet(null);
    };

    const { items: data } = dataCart;

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    let cartItemBySeller = [];
    if (data) {
        const unGroupedData = data;
        const groupData = unGroupedData.reduce(
            // eslint-disable-next-line no-shadow
            (groupData, { SimpleMiniCustomizable, id, note, custom_price, product, quantity, custom_seller, ...etc }) => {
                let item = groupData.find((p) => p.seller_id === custom_seller.seller_id);
                if (!item) {
                    item = { seller_id: custom_seller.seller_id, seller_name: custom_seller.seller_name, children: [] };
                    groupData.push(item);
                }
                let child = item.children.find((ch) => ch.name === product.name);
                if (!child) {
                    child = {
                        SimpleMiniCustomizable,
                        id,
                        note,
                        custom_price,
                        product,
                        quantity,
                        ...etc,
                    };
                    item.children.push(child);
                }
                return groupData;
            },
            [],
        );
        cartItemBySeller = groupData;
    }

    return (
        <>
            <ConfirmationDelete t={t} open={confirmDel} handleDelete={handleDelete} handleCancel={cancelDelete} />
            <table className="table-auto">
                <thead>
                    <tr className="border-b-[1px] border-b-neutral-200">
                        <th align="left" className="pb-4">
                            <Typography className="font-medium text-md">
                                {`${t('cart:itemDetail')} (${dataCart.total_quantity || 0})`}
                            </Typography>
                        </th>
                        <th align="center" className="pb-4">
                            <Typography className="font-medium text-md">{t('common:title:qty')}</Typography>
                        </th>
                        <th align="right" className="pb-4">
                            <Typography className="font-medium text-md">{t('common:subtotal')}</Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <Show when={storeConfig && (!storeConfig.enable_oms_multiseller || storeConfig.enable_oms_multiseller === '0')}>
                        {data &&
                            data.length > 0 &&
                            data.map((val, key) => (
                                    <React.Fragment key={key}>
                                        <TableItem
                                            {...val}
                                            storeConfig={storeConfig}
                                            currencyCache={currencyCache}
                                            confirmDelete={confirmDelete}
                                            {...other}
                                        />
                                    </React.Fragment>
                                ))}
                    </Show>
                </tbody>
            </table>
            <Show when={storeConfig && storeConfig.enable_oms_multiseller === '1' && cartItemBySeller && cartItemBySeller.length > 0}>
                <table className="table-auto">
                    {
                        cartItemBySeller.map((seller, key) => (
                            <React.Fragment key={key}>
                                <thead>
                                    <tr>
                                        <th colSpan={4}>
                                            <Typography variant="bd-2b" type="bold">
                                                {seller.seller_name ? seller.seller_name : 'Default Store'}
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <Show when={seller && seller.children && seller.children.length > 0}>
                                    {
                                        seller?.children.map((val, keyItem) => (
                                            <TableItem
                                                key={keyItem}
                                                {...val}
                                                storeConfig={storeConfig}
                                                currencyCache={currencyCache}
                                                confirmDelete={confirmDelete}
                                                {...other}
                                            />
                                        ))
                                    }
                                </Show>
                            </React.Fragment>
                        ))
                    }
                </table>
            </Show>
        </>
    );
};

export default TableListProduct;
