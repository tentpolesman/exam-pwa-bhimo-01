/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import Thumbor from '@common_image';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import React from 'react';
import Show from '@common/Show';
import Skeleton from '@common/Skeleton';

import PaypalButtonView from '@plugin_paypalbutton';

const Summary = (props) => {
    const {
        t, summary, handleActionSummary = () => { }, loading, disabled,
        showItems = false, items = [], hideButton = false, isDesktop,
        isLoader, deleteCart, updateCart, withAction, withLabel = true,
        dataCart, storeConfig, currencyCache,
    } = props;
    const storeConfigLocalStorage = useReactiveVar(storeConfigVar);
    const [openItem, setOpenItem] = React.useState(false);

    const Loader = () => (
        <div
            id="desktopSummary"
            className={isDesktop
                ? classNames(
                    'flex flex-col',
                    'sticky top-28 w-full h-auto',
                    'bg-neutral-50 border rounded-md border-neutral-200',
                )
                : classNames(
                    'flex flex-col',
                    'sticky top-28 w-full h-auto',
                    'bg-neutral-50 border rounded-md border-neutral-200',
                )}
        >
            <Typography variant="h1" type="regular" letter="capitalize">
                {t('common:summary:title')}
            </Typography>
            <div className={classNames('', 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </div>
            <div className={classNames('', 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </div>
            <div className={classNames('', 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </div>
            <div className={classNames('', 'listSummary')}>
                <divText
                    primary={(
                        <Typography variant="title" type="bold">
                            Total
                        </Typography>
                    )}
                />
                <Skeleton variant="rect" width="60%" height="30px" animation="wave" />
            </div>
        </div>
    );
    if (isLoader) {
        return <Loader />;
    }

    let cartItemBySeller = {};

    if (items.length > 0) {
        const unGroupedData = items;

        // eslint-disable-next-line no-shadow
        const groupData = unGroupedData.reduce((groupData, {
            id,
            quantity,
            pickup_item_store_info,
            custom_price,
            product,
            custom_seller,
            ...other
        }) => {
            let item = groupData.find((p) => p.seller_id === custom_seller.seller_id);
            if (!item) {
                item = {
                    seller_id: custom_seller.seller_id,
                    seller_name: custom_seller.seller_name ? custom_seller.seller_name : 'Default Seller',
                    productList: [],
                    subtotal: {
                        currency: '',
                        value: 0,
                    },
                };
                groupData.push(item);
            }
            let child = item.productList.find((ch) => ch.name === product.name);
            if (!child) {
                child = {
                    id,
                    custom_price,
                    product,
                    quantity,
                    ...other,
                };
                item.productList.push(child);
                item.subtotal.currency = custom_price?.row_total_incl_tax.currency;
                item.subtotal.value += custom_price?.row_total_incl_tax.value;
            }
            return groupData;
        }, []);
        cartItemBySeller = groupData;
    }

    return (
        <>
            <div className={classNames(
                'fixed desktop:hidden bottom-0 left-0 z-[9999] w-full h-20 bg-neutral-white bottom-checkout',
                'p-4 shadow-inner bg-neutral-white',
            )}
            >
                <Button onClick={handleActionSummary} className="w-full group" size="lg" classNameText="justify-center">
                    <Typography variant="bd-2" className="!text-neutral-white">
                        {t('common:button:checkout')}
                    </Typography>
                </Button>
            </div>
            <div
                id="desktopSummary"
                className={isDesktop
                    ? classNames(
                        'flex flex-col',
                        'sticky top-28 w-full h-auto',
                        'bg-neutral-50 border rounded-md border-neutral-200',
                    )
                    : classNames(
                        'flex flex-col',
                        'sticky top-28 w-full h-auto',
                        'bg-neutral-50 border rounded-md border-neutral-200',
                    )}
            >
                <Show when={withLabel}>
                    <div className="px-5 pt-4 pb-3">
                        <Typography variant="bd-2" className="!text-[18px] !leading-[28px]">
                            {t('common:summary:title')}
                        </Typography>
                    </div>
                </Show>
                {showItems ? (
                    <>
                        <div className={classNames('flex flex-row between-xs')} onClick={() => setOpenItem(!openItem)}>
                            <div className="xs:basis-6/12">
                                <Typography variant="bd-2b">{`${items.length} items in Cart`}</Typography>
                            </div>
                            <div className="xs:basis-2/12">{openItem ? <ExpandLess /> : <ExpandMore />}</div>
                        </div>
                        {storeConfigLocalStorage.enable_oms_multiseller === '1' && openItem ? (
                            <div className={classNames('flex flex-row')}>
                                {
                                    cartItemBySeller.map((seller) => (
                                        <>
                                            <div className={classNames('xs:basis-full bg-neutral-100 py-4')}>
                                                <Typography variant="bd-2b">{seller.seller_name}</Typography>
                                            </div>
                                            {seller.productList.map((item, index) => (
                                                <div
                                                    id="divProductSummary"
                                                    className={classNames('xs:basis-full row between-xs', '', 'relative p-5')}
                                                    key={index}
                                                >
                                                    <div className="xs:basis-4/12">
                                                        <Thumbor
                                                            className="product-image-photo"
                                                            src={item.product.small_image.url}
                                                            alt={item.product.name}
                                                            width={61}
                                                            height={75}
                                                        />
                                                    </div>
                                                    <div className={classNames('xs:basis-8/12', 'flex flex-col')}>
                                                        <Typography variant="bd-2b" className="line-clamp-2">{item.product.name}</Typography>
                                                        {item.configurable_options && item.configurable_options.length ? (
                                                            <div className="m-1">
                                                                {item.configurable_options.map((val, idx) => (
                                                                    <div className="text-xs" key={idx}>
                                                                        <strong>{val.option_label}</strong>
                                                                        {' '}
                                                                        :
                                                                        {val.value_label}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                        <div className="flex-grow" />
                                                        <div>
                                                            <span className="px-0 py-3" style={{ padding: '0' }}>
                                                                <Typography variant="bd-2b" type="regular">
                                                                    Qty:
                                                                    {` ${item.quantity}`}
                                                                </Typography>
                                                            </span>
                                                        </div>
                                                        <Typography variant="bd-2b" size="14" letter="uppercase">
                                                            {item.prices.row_total.value === 0
                                                                ? t('common:title:free')
                                                                : formatPrice(item.prices.row_total.value, item.prices.row_total.currency || 'IDR', currencyCache)}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ))
                                }
                            </div>
                        ) : null}
                        {storeConfigLocalStorage.enable_oms_multiseller !== '1' && openItem ? (
                            <div className={classNames('flex flex-row')}>
                                {items.map((item, index) => (
                                    <div
                                        id="divProductSummary"
                                        className={classNames('xs:basis-full row between-xs', '', 'relative p-5')}
                                        key={index}
                                    >
                                        {withAction && (
                                            <div
                                                className="delete"
                                                onClick={() => {
                                                    deleteCart(item.id);
                                                }}
                                            >
                                                x
                                            </div>
                                        )}
                                        <div className="xs:basis-4/12">
                                            <Thumbor
                                                className="product-image-photo"
                                                src={item.product.small_image.url}
                                                alt={item.product.name}
                                                width={61}
                                                height={75}
                                                storeConfig={storeConfig}
                                            />
                                        </div>
                                        <div className={classNames('xs:basis-8/12', 'flex flex-col')}>
                                            <Typography variant="bd-2b" className="line-clamp-2">{item.product.name}</Typography>
                                            {item.configurable_options && item.configurable_options.length ? (
                                                <div className="m-1">
                                                    {item.configurable_options.map((val, idx) => (
                                                        <div className="text-xs" key={idx}>
                                                            <strong>{val.option_label}</strong>
                                                            {' '}
                                                            :
                                                            {val.value_label}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : null}
                                            <div className="flex-grow" />
                                            {withAction && (
                                                <div>
                                                    <span
                                                        className="cursor-pointer after:content-['<'] qty-update"
                                                        onClick={() => {
                                                            if (item.quantity > 1) {
                                                                updateCart(item.id, item.quantity - 1);
                                                            }
                                                        }}
                                                    />
                                                    <span className="px-2 py-0">{item.quantity}</span>

                                                    <span
                                                        className="cursor-pointer after:content-['>'] qty-update"
                                                        onClick={() => {
                                                            updateCart(item.id, item.quantity + 1);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <Typography variant="bd-2b" size="14" letter="uppercase">
                                                {item.prices.row_total.value === 0
                                                    ? t('common:title:free')
                                                    : formatPrice(item.prices.row_total.value, item.prices.row_total.currency || 'IDR', currencyCache)}
                                            </Typography>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </>
                ) : null}
                <div className="flex flex-col px-5 pt-2 pb-4">
                    {summary.data.map((dt, index) => (
                        <div
                            key={index}
                            className={classNames('flex flex-row justify-between items-center')}
                        >
                            <Typography className="text-lg font-normal">
                                {dt.item}
                            </Typography>
                            <Typography className="text-lg font-bold">
                                {dt.value}
                            </Typography>
                        </div>
                    ))}
                    <div
                        className={classNames('flex flex-row justify-between items-center')}
                    >
                        <Typography className="text-lg font-normal">
                            Total
                        </Typography>
                        <Typography className="text-lg !font-bold">
                            {summary.total.currency ? formatPrice(summary.total.value, summary.total.currency, currencyCache) : null}
                        </Typography>
                    </div>
                </div>

                <Show when={!hideButton}>
                    <div className="px-5 pt-2 pb-6">
                        <Button
                            variant="primary"
                            size="xl"
                            loading={loading}
                            disabled={disabled}
                            onClick={handleActionSummary}
                            className="w-full"
                            classNameText="justify-center"
                        >
                            <Typography variant="bd-2b" color="white" type="bold" letter="uppercase">
                                {t('common:button:checkout')}
                            </Typography>
                        </Button>
                        <Show when={dataCart}>
                            <div className="w-full min-w-[90%]">
                                <PaypalButtonView cart={dataCart} t={t} storeConfig={storeConfig} />
                            </div>
                        </Show>
                    </div>
                </Show>
            </div>
        </>
    );
};

export default Summary;
