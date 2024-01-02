/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import Thumbor from '@common_image';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import cx from 'classnames';
import React, { useEffect } from 'react';
import Show from '@common/Show';
import Skeleton from '@common/Skeleton';
import Arrow from '@heroicons/react/24/outline/ChevronDownIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

import PaypalButtonView from '@plugin_paypalbutton';
import Accordion from '@common/Accordion';
import Divider from '@common/Divider';
import parser from 'html-react-parser';
import Badge from '@common/Badge';

const Summary = (props) => {
    const {
        t, summary, handleActionSummary = () => { }, loading, disabled,
        showItems = false, items = [], hideButton = false, isDesktop,
        isLoader, deleteCart, updateCart, withAction, withLabel = true,
        dataCart, storeConfig, currencyCache, label,
        mobilePosition, // top: static on top, bottom: assolute on bottom like bottom sheet
    } = props;
    const storeConfigLocalStorage = useReactiveVar(storeConfigVar);
    const [openItem, setOpenItem] = React.useState(false);
    const [openItemMobile, setOpenItemMobile] = React.useState(false);

    useEffect(() => {
        if (mobilePosition === 'bottom' && openItemMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style = '';
        }
    }, [mobilePosition, openItemMobile]);

    const Loader = () => (
        <div
            id="desktopSummary"
            className={isDesktop
                ? cx(
                    'flex flex-col p-4',
                    'sticky top-28 w-full h-auto',
                    'bg-neutral-50 border rounded-md border-neutral-200',
                )
                : cx(
                    'flex flex-col p-4',
                    'sticky top-28 w-full h-auto',
                    'bg-neutral-50 border rounded-md border-neutral-200',
                )}
        >
            <Typography variant="h1" className="capitalize mb-3">
                {t('common:title:summary')}
            </Typography>
            <div className={cx('', 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </div>
            <div className={cx('', 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </div>
            <div className={cx('', 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </div>
            <div className={cx('flex flex-row items-center justify-between', 'listSummary')}>
                <Typography variant="bd-2" type="bold">
                    {t('common:label:total')}
                </Typography>
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

    const isMultiSeller = storeConfigLocalStorage.enable_oms_multiseller === '1' || storeConfigLocalStorage.enable_oms_multiseller === 1;

    return (
        <>
            <div className={cx(
                'fixed desktop:hidden bottom-0 left-0 z-[1100] w-full h-max bg-neutral-white bottom-checkout',
                'p-4 shadow-inner bg-neutral-white',
            )}
            >
                <Show when={mobilePosition === 'bottom' && showItems}>
                    <Accordion
                        open={openItemMobile}
                        handleOpen={() => setOpenItemMobile(true)}
                        handleClose={() => setOpenItemMobile(false)}
                        CustomAccordionSummary={(
                            <div>
                                <span className="transition group-open:rotate-180">
                                    <Arrow className="w-5 h-5" />
                                </span>
                                <Typography variant="bd-1" className="group-open:hidden">
                                    {`Grand total ${summary.total.currency ? formatPrice(summary.total.value, summary.total.currency, currencyCache) : null}`}
                                </Typography>
                            </div>
                        )}
                        classSummary="w-full text-center flex flex-col gap-2 items-center justify-center"
                        className="mb-3"
                        classContent="pb-2 !max-h-[80vh]"
                    >
                        <div className="w-full flex flex-col gap-3 my-5">
                            <div className="flex fle-col max-h-[50vh] overflow-y-auto">
                                {isMultiSeller ? (
                                    <div className={cx('flex flex-col w-full')}>
                                        {
                                            cartItemBySeller.map((seller) => (
                                                <>
                                                    <div className={cx('py-2 mb-1')}>
                                                        <Typography variant="bd-1">{seller.seller_name}</Typography>
                                                    </div>
                                                    {seller.productList.map((item, index) => (
                                                        <div
                                                            className={cx('flex flex-col gap-2 w-full', 'relative', 'divProductSummary')}
                                                            key={index}
                                                        >
                                                            <div className="flex flex-row w-full justify-between">
                                                                <Typography variant="bd-2b" className="line-clamp-2">
                                                                    {parser(item.product.name)}
                                                                </Typography>

                                                                {
                                                                    item?.prices?.row_total?.value && (
                                                                        <Typography variant="bd-2b" size="14" letter="uppercase">
                                                                            {item?.prices?.row_total?.value && item?.prices?.row_total?.value === 0
                                                                                ? t('common:title:free')
                                                                                : formatPrice(item.prices.row_total.value, item.prices.row_total.currency || 'IDR', currencyCache)}
                                                                        </Typography>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className={cx('xs:basis-8/12', 'flex flex-col')}>
                                                                {item.configurable_options && item.configurable_options.length ? (
                                                                    <div className="my-1 flex flex-col">
                                                                        {item.configurable_options.map((val, idx) => (
                                                                            <Typography variant="bd-3b" key={idx}>
                                                                                <strong>{val.option_label}</strong>
                                                                                {' '}
                                                                                :
                                                                                {val.value_label}
                                                                            </Typography>
                                                                        ))}
                                                                    </div>
                                                                ) : null}
                                                                {withAction && (
                                                                    <div className="flex flex-row justify-between">
                                                                        <div className="flex flex-row my-2">
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
                                                                        <Button
                                                                            variant="plain"
                                                                            className="!p-0"
                                                                            onClick={() => deleteCart(item.id)}
                                                                        >
                                                                            <TrashIcon className="w-4 h-4" />
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ))
                                        }
                                    </div>
                                ) : null}
                                {!isMultiSeller ? (
                                    <div className={cx('flex flex-col gap-3 w-full')}>
                                        {items.map((item, index) => (
                                            <div
                                                className={cx('flex flex-col gap-2 w-full', 'relative', 'divProductSummary')}
                                                key={index}
                                            >
                                                <div className="flex flex-row w-full justify-between">
                                                    <Typography variant="bd-2b" className="line-clamp-2">
                                                        {parser(item.product.name)}
                                                    </Typography>
                                                    {
                                                        item?.prices?.row_total?.value ? (
                                                            <Typography variant="bd-2b" size="14" letter="uppercase">
                                                                {item?.prices?.row_total?.value && item?.prices?.row_total?.value === 0
                                                                    ? t('common:title:free')
                                                                    : formatPrice(item.prices.row_total.value, item.prices.row_total.currency || 'IDR', currencyCache)}
                                                            </Typography>
                                                        ) : (
                                                            <Typography variant="bd-2b" size="14" letter="uppercase">{t('common:title:free')}</Typography>
                                                        )
                                                    }
                                                </div>
                                                <div className={cx('xs:basis-8/12', 'flex flex-col')}>
                                                    {item.configurable_options && item.configurable_options.length ? (
                                                        <div className="my-1 flex flex-col">
                                                            {item.configurable_options.map((val, idx) => (
                                                                <Typography variant="bd-3b" key={idx}>
                                                                    <strong>{val.option_label}</strong>
                                                                    {' '}
                                                                    :
                                                                    {val.value_label}
                                                                </Typography>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                    {withAction && (
                                                        <div className="flex flex-row justify-between">
                                                            <div className="flex flex-row my-2">
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
                                                            <Button
                                                                variant="plain"
                                                                className="!p-0"
                                                                onClick={() => deleteCart(item.id)}
                                                            >
                                                                <TrashIcon className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                            <Divider />
                            <div className="flex flex-col gap-4">
                                {summary.data.map((dt, index) => (
                                    <div
                                        key={index}
                                        className={cx('flex flex-row justify-between items-center')}
                                    >
                                        <Typography className="text-lg font-normal">
                                            {dt.item}
                                        </Typography>
                                        <Typography className="text-lg font-bold basis-1/2 text-right">
                                            {dt.value}
                                        </Typography>
                                    </div>
                                ))}
                                <div
                                    className={cx('flex flex-row justify-between items-center')}
                                >
                                    <Typography variant="bd-1">
                                        Total
                                    </Typography>
                                    <Typography variant="bd-1">
                                        {summary.total.currency ? formatPrice(summary.total.value, summary.total.currency, currencyCache) : null}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </Accordion>
                </Show>
                <Button onClick={handleActionSummary} className="w-full group" size="lg" classNameText="justify-center">
                    <Typography variant="bd-2" className="!text-neutral-white">
                        {label || t('common:button:checkout')}
                    </Typography>
                </Button>
            </div>
            <div
                id="desktopSummary"
                className={cx(
                    'flex flex-col',
                    'sticky top-28 w-full h-auto',
                    'bg-neutral-50 border rounded-md border-neutral-200',
                    mobilePosition === 'bottom' ? 'hidden desktop:flex' : '',
                )}
            >
                <Show when={withLabel}>
                    <div className="px-5 pt-4 pb-3">
                        <Typography variant="bd-2" className="!text-[18px] !leading-[28px]">
                            {t('common:title:summary')}
                        </Typography>
                    </div>
                </Show>
                {
                    showItems && (
                        <Accordion
                            label={`${items.length} items in Cart`}
                            open={openItem}
                            handleOpen={() => setOpenItem(true)}
                            handleClose={() => setOpenItem(false)}
                            classSummary="px-5"
                            classContent="pb-2"
                        >
                            <div className="flex flex-col">
                                {isMultiSeller && openItem ? (
                                    <div className={cx('flex flex-row')}>
                                        {
                                            cartItemBySeller.map((seller) => (
                                                <>
                                                    <div className={cx('xs:basis-full bg-neutral-100 py-4')}>
                                                        <Typography variant="bd-2b">{seller.seller_name}</Typography>
                                                    </div>
                                                    {seller.productList.map((item, index) => (
                                                        <div
                                                            id="divProductSummary"
                                                            className={cx('xs:basis-full row between-xs', '', 'relative p-5')}
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
                                                            <div className={cx('xs:basis-8/12', 'flex flex-col')}>
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
                                {!isMultiSeller && openItem ? (
                                    <div className={cx('flex flex-col gap-3')}>
                                        {items.map((item, index) => (
                                            <div
                                                id="divProductSummary"
                                                className={cx('flex flex-row gap-2 px-5', 'relative')}
                                                key={index}
                                            >
                                                {withAction && (
                                                    <div
                                                        className="absolute -top-1.5 right-5 cursor-pointer"
                                                        onClick={() => {
                                                            deleteCart(item.id);
                                                        }}
                                                    >
                                                        x
                                                    </div>
                                                )}
                                                <div className="xs:basis-4/12 relative">
                                                    <Thumbor
                                                        className="!w-[105px] !h-[105px]"
                                                        classContainer="!w-[105px] !h-[105px]"
                                                        src={item.product.small_image.url}
                                                        alt={item.product.name}
                                                        width={105}
                                                        height={105}
                                                        storeConfig={storeConfig}
                                                    />
                                                    <Show when={item.prices.row_total.value === 0}>
                                                        <Badge
                                                            fontSize={10}
                                                            success
                                                            label={t('common:title:free')}
                                                            className="absolute top-1 left-1"
                                                        />
                                                    </Show>

                                                </div>
                                                <div className={cx('xs:basis-8/12', 'flex flex-col')}>
                                                    <Typography variant="bd-2b" className="line-clamp-2 max-w-[90%]">
                                                        {parser(item.product.name)}
                                                    </Typography>
                                                    {item.configurable_options && item.configurable_options.length ? (
                                                        <div className="my-1 flex flex-col">
                                                            {item.configurable_options.map((val, idx) => (
                                                                <Typography variant="bd-3b" key={idx}>
                                                                    <strong>{val.option_label}</strong>
                                                                    {' '}
                                                                    :
                                                                    {val.value_label}
                                                                </Typography>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                    {withAction && (
                                                        <div className="flex flex-row my-2">
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
                            </div>
                        </Accordion>
                    )
                }
                <Show when={openItem}>
                    <Divider className="my-2" />
                </Show>
                <div className="flex flex-col px-5 pt-2 pb-4 gap-2">
                    {summary.data.map((dt, index) => (
                        <div
                            key={index}
                            className={cx('flex flex-row justify-between items-center')}
                        >
                            <Typography className="text-lg font-normal">
                                {dt.item}
                            </Typography>
                            <Typography className="text-lg font-bold basis-1/2 text-right">
                                {dt.value}
                            </Typography>
                        </div>
                    ))}
                    <Show when={summary?.data && summary.data.length > 0}>
                        <Divider className="my-2" />
                    </Show>
                    <div
                        className={cx('flex flex-row justify-between items-center')}
                    >
                        <Typography variant="bd-2b">
                            {t('common:label:total')}
                        </Typography>
                        <Typography variant="bd-2">
                            {summary.total.currency ? formatPrice(summary.total.value, summary.total.currency, currencyCache) : null}
                        </Typography>
                    </div>
                </div>

                <Show when={!hideButton}>
                    <div className="px-5 pt-2 pb-6 hidden desktop:flex flex-col w-full">
                        <Button
                            variant="primary"
                            size="xl"
                            loading={loading}
                            disabled={disabled}
                            onClick={handleActionSummary}
                            className="w-full plugin-cart-checkoutBtn"
                            classNameText="justify-center"
                        >
                            <Typography variant="bd-2a" color="white" className="uppercase">
                                {label || t('common:button:checkout')}
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
