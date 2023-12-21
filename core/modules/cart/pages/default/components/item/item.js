/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import Image from '@common_image';
import Typography from '@common_typography';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';
import Link from 'next/link';
import { useState } from 'react';
import Show from '@common/Show';
import { formatPrice } from '@root/core/helpers/currency';
import Button from '@common/Button';
import { TrashIcon } from '@heroicons/react/24/outline';
import ButtonQty from '@common/ButtonQty';
import OrderNote from './OrderNote';

const ItemView = (props) => {
    const {
        t,
        confirmDel,
        handleDelete,
        setConfirmDel,
        product,
        configurable_options,
        quantity,
        prices,
        bundle_options,
        links,
        note,
        cartItemId,
        customizable_options,
        storeConfig = {},
        currencyCache,
        SimpleMiniCustomizable,
        ConfigurableMiniCustomizable,
        updateItem,
        id,
        isMultiSeller,
    } = props;

    const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <div className="flex flex-row gap-4">
            <ConfirmationDelete t={t} open={confirmDel} handleDelete={handleDelete} handleCancel={() => setConfirmDel(false)} />
            <div className="w-[110px] tablet:w-[120px] h-[110px] tablet:h-[120px] rounded-lg">
                <Image
                    src={product.small_image.url}
                    className="!w-[110px] tablet:!w-[120px] !h-[110px] tablet:!h-[120px]"
                    classContainer="!w-[110px] tablet:!w-[120px] !h-[110px] tablet:!h-[120px]"
                    alt={product.name}
                    width={defaultWidth}
                    height={defaultHeight}
                    quality={80}
                    storeConfig={storeConfig}
                />
                {prices.price_incl_tax.value === 0 ? <span>{t('common:title:free')}</span> : null}
            </div>
            <div className="flex flex-col justify-between gap-4 w-full">
                <div className="flex flex-row justify-between items-start w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <Link href="/[...slug]" as={`/${product.url_key}`}>
                            <Typography variant="bd-1b" className="line-clamp-2 capitalize">{product.name}</Typography>
                        </Link>
                        <Show when={configurable_options && configurable_options.length > 0}>
                            <Typography variant="bd-2b" letter="capitalize" className="font-normal">
                                {
                                    configurable_options.map((item, idx) => (
                                        `${item.value_label}${idx < configurable_options.length - 1 ? ', ' : ''}`
                                    ))
                                }
                            </Typography>
                        </Show>
                        <div className="flex flex-row">
                            {links && links.length > 0 && (
                                <div className="xs:basis-full flex flex-col tablet:flex-row gap-1">
                                    <Typography variant="bd-2b" letter="capitalize" type="bold">
                                        Downloads :
                                    </Typography>
                                    <div className="flex flex-col">
                                        {links.map((item, idx) => (
                                            <Typography variant="bd-2b" letter="capitalize" key={idx}>
                                                {item.title}
                                            </Typography>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {bundle_options && bundle_options.length ? (
                            <div className="flex flex-col gap-2">
                                {bundle_options.map((value, idx) => (
                                    <div className="flex flex-col" key={idx}>
                                        <Typography variant="bd-2">{value.label}</Typography>
                                        <div className="flex flex-col">
                                            {value.values.map((item, idt) => (
                                                <Typography variant="bd-2b" key={idt}>
                                                    {item.quantity}
                                                    {' '}
                                                    x
                                                    {item.label}
                                                    {' '}
                                                    <strong>
                                                        +
                                                        {' '}
                                                        {formatPrice(item.price, 'IDR', currencyCache)}
                                                    </strong>
                                                </Typography>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        {cartCustomOptions && cartCustomOptions.length ? (
                            <div className="product-options">
                                {cartCustomOptions.map((op, idx) => (
                                    <div className="option-wrapper" key={idx}>
                                        <div className="flex flex-row option-wrapper__item">
                                            <strong>
                                                {op.label}
                                                {' '}
                                                :
                                            </strong>
                                            {op.values.map((item, idt) => (
                                                <p key={idt} className="option-item">
                                                    {item.label && item.label !== '' ? item.label : item.value}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        <Show when={isMultiSeller}>
                            <div className="">
                                <OrderNote note={note} cartItemId={cartItemId} quantity={quantity} />
                            </div>
                        </Show>
                    </div>
                    <Button
                        iconOnly
                        className="!p-0"
                        iconPosition="right"
                        icon={<TrashIcon />}
                        variant="plain"
                        onClick={() => setConfirmDel(props)}
                    />
                </div>
                <div className="flex flex-col gap-[6px] tablet:flex-row justify-between tablet:items-center w-full">
                    <ButtonQty
                        value={quantity}
                        onChange={(newQty) => {
                            updateItem({
                                cart_item_id: id,
                                quantity: newQty,
                            });
                        }}
                        max={10000}
                    />
                    <Typography variant="p-2a">
                        {formatPrice(
                            prices.row_total_incl_tax.value,
                            prices.row_total_incl_tax.currency,
                            currencyCache,
                        )}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

const ItemProduct = (props) => {
    const {
        t,
        editMode,
        toggleEditDrawer,
        cartItemId,
        product,
        quantity,
        configurable_options = [],
        deleteItem,
        custom_price,
        handleFeed,
        bundle_options,
        links,
        customizable_options,
        SimpleMiniCustomizable,
        ConfigurableMiniCustomizable,
        note,
        errorCartItems,
        storeConfig,
        currencyCache,
    } = props;

    const { id, custom_price: prices } = props;

    const [confirmDel, setConfirmDel] = useState(false);
    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem({
            id,
            product,
            quantity,
            prices,
        });
    };

    const handleAddWishlist = () => {
        handleFeed(props);
    };
    return (
        <ItemView
            t={t}
            note={note}
            errorCartItems={errorCartItems}
            cartItemId={cartItemId}
            confirmDel={confirmDel}
            handleDelete={handleDelete}
            handleAddWishlist={handleAddWishlist}
            setConfirmDel={setConfirmDel}
            product={product}
            configurable_options={configurable_options}
            bundle_options={bundle_options}
            links={links}
            quantity={quantity}
            prices={custom_price}
            editMode={editMode}
            toggleEditDrawer={toggleEditDrawer}
            customizable_options={SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options}
            storeConfig={storeConfig}
            currencyCache={currencyCache}
        />
    );
};

export default ItemProduct;
