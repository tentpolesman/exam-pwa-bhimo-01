/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable comma-dangle */
import Radio from '@common_forms/Radio';
import React from 'react';
import Typography from '@common_typography';
import DeliveryItem from '@core_modules/checkout/components/radioitem';
import RadioMultiseller from '@core_modules/checkout/pages/default/components/shipping/plugin/Radio';
import { basePath } from '@config';
import { formatPrice } from '@helper_currency';
import Alert from '@common_alert';
import Skeleton from '@common_skeleton';
import classNames from 'classnames';
import Accordion from '@common_acccordion';

import { useSelector } from 'react-redux';
import {
    selectCheckoutState,
} from '@core_modules/checkout/redux/checkoutSlice';

const Loader = () => (
    <>
        <Skeleton className="rounded-[50%] mb-[10px]" width="100%" height={20} />
        <Skeleton className="rounded-[50%] mb-[10px]" width="100%" height={20} />
        <Skeleton className="rounded-[50%] mb-[10px]" width="100%" height={20} />
    </>
);

const ShippingGroupIcon = (props) => {
    const { baseMediaUrl, src } = props;
    const fallbacks = [`${baseMediaUrl}checkout/shipping/shipping-${src.replace('sg-', '')}.svg`, null];

    // check if image exist on the backoffice, otherwise use fallback image from PWA
    const [imageSrc, setImageSrc] = React.useState(`${basePath}/assets/img/shipping-${src.replace('sg-', '')}.svg`);
    const [fallbackImageIndex, setFallbackImageIndex] = React.useState(0);

    // set image fallback url
    const getFallbackImageSrc = () => {
        if (fallbackImageIndex > fallbacks.length) {
            return;
        }
        setImageSrc(fallbacks[fallbackImageIndex]);
        setFallbackImageIndex(fallbackImageIndex + 1);
    };

    return (
        <>
            {(imageSrc && (
                <img
                    className="w-11 h-11 mr-3"
                    src={imageSrc}
                    alt={src.replace('sg-', '')}
                    onError={() => getFallbackImageSrc()}
                />
            ))
                || ''}
        </>
    );
};

const ShippingView = (props) => {
    const {
        isOnlyVirtualProductOnCart,
        storeConfig,
        loading,
        selected,
        handleShipping,
        data,
        t,
        shippingMethodList,
        setLoadingSellerInfo,
        loadingSellerInfo,
        currencyCache,
    } = props;
    let content;
    const unique = [];

    const checkout = useSelector(selectCheckoutState);

    const [expanded, setExpanded] = React.useState(null);
    const [expandedMulti, setExpandedMulti] = React.useState([]);
    const [expandedActiveMulti, setExpandedActiveMulti] = React.useState([]);
    const handleChangeMulti = (panel, seller_id) => (event, newExpanded) => {
        const tempData = expandedMulti;
        const tempDataActive = expandedActiveMulti;
        const index = expandedMulti.findIndex((item) => item.seller_id === seller_id);
        const indexActive = expandedActiveMulti.findIndex((item) => item.seller_id === seller_id);
        tempData[index].expanded = panel;
        tempDataActive[indexActive].expanded = false;
        setExpandedActiveMulti(tempDataActive);
        setExpandedMulti(newExpanded ? tempData : false);
    };

    React.useEffect(() => {
        if (
            data.shippingMethods.length !== 0 &&
            storeConfig.enable_oms_multiseller === '1' &&
            setExpandedMulti.length === 0 &&
            setExpandedActiveMulti.length === 0
        ) {
            data.shippingMethods.forEach((item) => {
                const tempData = {
                    seller_id: item.seller_id,
                    expanded: false,
                };
                const tempDataActive = {
                    seller_id: item.seller_id,
                    expanded: true,
                };
                setExpandedMulti((prevState) => [...prevState, tempData]);
                setExpandedActiveMulti((prevState) => [...prevState, tempDataActive]);
            });
        }
    }, [data.shippingMethods, storeConfig.enable_oms_multiseller]);

    if (checkout.selected.delivery === 'pickup') {
        const price = formatPrice(0, storeConfig.base_currency_code || 'IDR', currencyCache);
        content = <DeliveryItem value={{ price }} label={t('checkout:pickupStore')} selected borderBottom={false} />;
    } else if (checkout.selected.delivery === 'instore') {
        const price = formatPrice(0, storeConfig.base_currency_code || 'IDR', currencyCache);
        content = <DeliveryItem value={{ price }} label={t('checkout:instorePickup')} selected borderBottom={false} />;
    } else if (loading.shipping || loading.addresses || loading.all || loadingSellerInfo) {
        content = <Loader />;
        if (storeConfig.enable_oms_multiseller === '1') {
            if (data.shippingMethods.length > 0 && data.shippingMethods[0].seller_id) {
                setLoadingSellerInfo(false);
            } else {
                content = <Typography variant="p">{t('checkout:noShipping')}</Typography>;
            }
        }
    } else if (
        data.shippingMethods.length !== 0 &&
        (data.shippingMethods[0].available_shipping_methods || data.shippingMethods) &&
        !loadingSellerInfo
    ) {
        const available = data.shippingMethods;
        const config =
            shippingMethodList && shippingMethodList.storeConfig ? JSON.parse(`${shippingMethodList.storeConfig.shipments_configuration}`) : {};
        const group = config ? Object.keys(config) : [];
        const sellerGroup = [];

        const shipping = [];
        // const state = { ...checkout };
        if (storeConfig.enable_oms_multiseller === '1') {
            for (let index = 0; index < group.length; index += 1) {
                const groupData = [];
                const key = group[index];
                let cnf = config[key];
                cnf = cnf.replaceAll(' ', '-').split(',');

                // create group data if same label on config
                if (storeConfig.enable_oms_multiseller === '1') {
                    data.shippingMethods.forEach((avx) => {
                        sellerGroup.push({ seller_id: avx.seller_id, data: [] });
                        for (let idx = 0; idx < avx.available_shipping_methods.length; idx += 1) {
                            const element = avx.available_shipping_methods[idx];
                            const identifier = `${element.value.replaceAll(' ', '-')}`;

                            for (let idc = 0; idc < cnf.length; idc += 1) {
                                // check if shipping method already exist on groupData
                                const checkShipping = groupData.find(
                                    (x) =>
                                        x.method_code === element.method_code &&
                                        x.carrier_code === element.carrier_code &&
                                        x.carrier_title === element.carrier_title &&
                                        x.seller_id === avx.seller_id
                                );

                                if (identifier.match(new RegExp(`^${cnf[idc]}`, 'i')) !== null && !checkShipping) {
                                    groupData.push({
                                        ...element,
                                        disabled: !element.available,
                                        seller_id: avx.seller_id,
                                        value: `${element.value}_${avx.seller_id}`,
                                    });
                                }
                            }
                        }
                    });
                } else {
                    for (let idx = 0; idx < available.length; idx += 1) {
                        const element = available[idx];
                        const identifier = `${element.value.replaceAll(' ', '-')}`;

                        for (let idc = 0; idc < cnf.length; idc += 1) {
                            // check if shipping method already exist on groupData
                            const checkShipping = groupData.find(
                                (x) =>
                                    x.method_code === element.method_code &&
                                    x.carrier_code === element.carrier_code &&
                                    x.carrier_title === element.carrier_title
                            );

                            if (identifier.match(new RegExp(`^${cnf[idc]}`, 'i')) !== null && !checkShipping) {
                                groupData.push({
                                    ...element,
                                    disabled: !element.available,
                                });
                            }
                        }
                    }
                }

                if (groupData.length > 0) {
                    // ad active key if on group data selected payment method
                    if (storeConfig.enable_oms_multiseller === '1') {
                        shipping.push({
                            group: key,
                            data: groupData,
                        });
                    } else {
                        let active = false;
                        if (selected.shipping) {
                            for (let idx = 0; idx < groupData.length; idx += 1) {
                                const element = groupData[idx];
                                const activeIdentifer = `${element.carrier_code}_${element.method_code}`;
                                if (activeIdentifer === selected.shipping) {
                                    active = true;
                                }
                            }
                        }
                        shipping.push({
                            group: key,
                            data: groupData,
                            active,
                        });
                    }
                }
            }
        } else {
            for (let index = 0; index < group.length; index += 1) {
                const groupData = [];
                const key = group[index];
                let cnf = config[key];
                cnf = cnf.replaceAll(' ', '-').split(',');

                // create group data if same label on config
                for (let idx = 0; idx < available.length; idx += 1) {
                    const element = available[idx];
                    const identifier = `${element.value.replaceAll(' ', '-')}`;

                    for (let idc = 0; idc < cnf.length; idc += 1) {
                        // check if shipping method already exist on groupData
                        const checkShipping = groupData.find(
                            (x) =>
                                x.method_code === element.method_code &&
                                x.carrier_code === element.carrier_code &&
                                x.carrier_title === element.carrier_title
                        );

                        if (identifier.match(new RegExp(`^${cnf[idc]}`, 'i')) !== null && !checkShipping) {
                            groupData.push({
                                ...element,
                                disabled: !element.available,
                            });
                        }
                    }
                }

                if (groupData.length > 0) {
                    // ad active key if on group data selected payment method
                    let active = false;
                    if (selected.shipping) {
                        for (let idx = 0; idx < groupData.length; idx += 1) {
                            const element = groupData[idx];
                            const activeIdentifer = `${element.carrier_code}_${element.method_code}`;
                            if (activeIdentifer === selected.shipping) {
                                active = true;
                            }
                        }
                    }
                    shipping.push({
                        group: key,
                        data: groupData,
                        active,
                    });
                }
            }
        }
        const index = data.shippingMethods.findIndex((x) => x.carrier_code === 'pickup');
        if (index >= 0) {
            data.shippingMethods.splice(index, 1);
        }

        // remove instore carrier_code from reguler shipping method
        const regulerIndex = shipping.findIndex((ship) => ship.group === 'sg-reguler');
        if (regulerIndex !== -1) {
            const removeInstore = shipping[regulerIndex].data.filter((item) => item.carrier_code !== 'instore');
            shipping[regulerIndex].data = removeInstore;
        }
        if (shipping.length > 0) {
            const uniqueSellerGroup = [];
            if (storeConfig.enable_oms_multiseller === '1') {
                sellerGroup.filter((seller) => {
                    const isDuplicate = uniqueSellerGroup.includes(seller.seller_id);

                    if (!isDuplicate) {
                        uniqueSellerGroup.push(seller.seller_id);
                        return true;
                    }

                    return false;
                });

                uniqueSellerGroup.forEach((seller) => {
                    let setNull = 0;
                    const groupSize = shipping.length;
                    const sellerData = shipping.map((ship) => {
                        const tempData = ship.data.filter((item) => item.seller_id === seller);
                        if (tempData < 1) {
                            setNull += 1;
                        }
                        return {
                            data: tempData,
                            group: ship.group,
                        };
                    });
                    const sellerDataInfo = checkout.data.seller.find((items) => items.seller_id === seller);
                    unique.push({
                        seller_id: seller,
                        seller_name: sellerDataInfo ? sellerDataInfo.seller_name : 'Default Seller',
                        seller_city: sellerDataInfo ? sellerDataInfo.seller_city.split(', ')[0] : 'Default City',
                        sellerData: setNull !== groupSize ? sellerData : null,
                    });
                });
            }
            // check if have active on group data by default selected if
            let itemActive = false;
            const error = [];
            for (let idx = 0; idx < shipping.length; idx += 1) {
                const element = shipping[idx];
                if (element.active) {
                    itemActive = true;
                }
                if (element.data && element.data.length > 0) {
                    element.data.forEach((dt) => {
                        if (dt.error_message) {
                            error.push(dt.error_message);
                        }
                    });
                }
            }
            const isMultiSeller = storeConfig.enable_oms_multiseller === '1' || storeConfig.enable_oms_multiseller === 1;
            if (isMultiSeller) {
                content = unique.map((seller) => (
                    <>
                        <Typography className="uppercase" variant="bd-2" type="bold">
                            {`${seller.seller_name} - ${seller.seller_city}`}
                        </Typography>
                        <div className="flex flex-col">
                            <div className="mt-4">
                                {seller.sellerData === null && <Typography variant="p">{t('checkout:noShipping')}</Typography>}
                                {/* eslint-disable-next-line consistent-return, array-callback-return */}
                                {seller.sellerData !== null &&
                                    // eslint-disable-next-line array-callback-return, consistent-return
                                    seller.sellerData.map((item, keyIndex) => {
                                        if (item.data.length !== 0) {
                                            const indexes = expandedMulti.findIndex((items) => items.seller_id === seller.seller_id);
                                            const indexesActive = expandedActiveMulti.findIndex((items) => items.seller_id === seller.seller_id);
                                            const open = (expandedMulti[indexes] && expandedMulti[indexes].expanded === keyIndex) || // if key index same with expanded active
                                            (item.active && expandedMulti[indexes] && expandedActiveMulti[indexesActive].expanded) || // expand if item active and not change expand
                                            (!itemActive &&
                                                expandedMulti[indexes] &&
                                                expandedActiveMulti[indexesActive].expanded &&
                                                keyIndex === 0);
                                            return (
                                                <Accordion
                                                    key={keyIndex}
                                                    open={open}
                                                    handleOpen={() => handleChangeMulti(keyIndex, seller.seller_id)}
                                                    handleClose={() => handleChangeMulti(null, seller.seller_id)}
                                                    label={(
                                                        <div className="flex flex-row items-center px-2">
                                                            <ShippingGroupIcon src={item.group} baseMediaUrl={storeConfig.base_media_url} />
                                                            <Typography letter="uppercase" variant="bd-2" type="bold">
                                                                {t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`) ===
                                                                `shippingGrouping.${item.group.replace('sg-', '')}`
                                                                    ? item.group.replace('sg-', '')
                                                                    : t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)}
                                                            </Typography>
                                                        </div>
                                                    )}
                                                    classSummary={classNames(
                                                        'border-x h-[45px] border-neutral-200',
                                                        'pl-2 pr-4',
                                                        keyIndex === 0 ? 'rounded-t-lg border-t' : '',
                                                        open ? 'border-b' : '',
                                                        keyIndex === shipping.length - 1 ? 'rounded-b-lg border-y' : '',
                                                        (keyIndex > 0 && keyIndex < shipping.length - 0) ? 'border-t' : '',
                                                        (open && keyIndex === shipping.length - 1) ? 'rounded-b-none' : ''
                                                    )}
                                                    classIcon="w-3 h-3"
                                                    classContent={classNames(
                                                        'border-x border-neutral-200 !mt-0',
                                                        (open && keyIndex === shipping.length - 1) ? 'border-b rounded-b-lg' : '',
                                                    )}
                                                >
                                                    <div className="flex flex-col">
                                                        {item.data.length !== 0 ? (
                                                            <RadioMultiseller
                                                                value={selected.shipping}
                                                                onChange={handleShipping}
                                                                valueData={item.data}
                                                                CustomItem={DeliveryItem}
                                                                classContainer="w-full"
                                                                storeConfig={storeConfig}
                                                                propsItem={{
                                                                    borderBottom: false,
                                                                    classContent: '',
                                                                }}
                                                                className="!mb-0"
                                                                classNames={{
                                                                    radioGroupClasses: '!gap-2'
                                                                }}
                                                                isShipping
                                                            />
                                                        ) : null}
                                                    </div>
                                                </Accordion>
                                            );
                                        }
                                    })}
                            </div>

                            <div className="flex flex-col gap-2 mt-5">
                                {error &&
                                    error.length > 0 &&
                                    error.map((msg, key) => (
                                        <Alert key={key} className="my-4" severity="error">
                                            {msg}
                                        </Alert>
                                    ))}
                            </div>
                        </div>
                    </>
                ));
            } else {
                content = (
                    <div className="flex flex-col">
                        <div className="">
                            {shipping.map((item, keyIndex) => {
                                if (item.data.length !== 0) {
                                    const open = expanded === keyIndex || (expanded === null && item.active)
                                    || (!itemActive && expanded === null && keyIndex === 0);
                                    return (
                                        <Accordion
                                            key={keyIndex}
                                            open={open}
                                            handleOpen={() => setExpanded(keyIndex)}
                                            handleClose={() => setExpanded(null)}
                                            label={(
                                                <div className="flex flex-row items-center px-2">
                                                    <ShippingGroupIcon src={item.group} baseMediaUrl={storeConfig.base_media_url} />
                                                    <Typography letter="uppercase" variant="bd-2" type="bold">
                                                        {t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`) ===
                                                            `shippingGrouping.${item.group.replace('sg-', '')}`
                                                            ? item.group.replace('sg-', '')
                                                            : t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)}
                                                    </Typography>
                                                </div>
                                            )}
                                            classSummary={classNames(
                                                'border-x h-[55px] border-neutral-200',
                                                'pl-2 pr-4',
                                                keyIndex === 0 ? 'rounded-t-lg border-t' : '',
                                                open ? 'border-b' : '',
                                                keyIndex === shipping.length - 1 ? 'rounded-b-lg border-y' : '',
                                                (keyIndex > 0 && keyIndex < shipping.length - 0) ? 'border-t' : '',
                                                (open && keyIndex === shipping.length - 1) ? 'rounded-b-none' : ''
                                            )}
                                            classIcon="w-3 h-3"
                                            classContent={classNames(
                                                'border-x border-neutral-200 !mt-0',
                                                (open && keyIndex === shipping.length - 1) ? 'border-b rounded-b-lg' : '',
                                            )}
                                        >
                                            <div className="flex flex-col p-4">
                                                {item.data.length !== 0 ? (
                                                    <Radio
                                                        value={selected.shipping}
                                                        onChange={handleShipping}
                                                        data={item.data}
                                                        CustomItem={DeliveryItem}
                                                        classContainer=""
                                                        storeConfig={storeConfig}
                                                        propsItem={{
                                                            borderBottom: false,
                                                            classContent: '',
                                                        }}
                                                        className="!mb-0"
                                                        classNames={{
                                                            radioGroupClasses: '!gap-2'
                                                        }}
                                                        size="sm"
                                                        disabled={loading.order || loading.all}
                                                    />
                                                ) : null}
                                            </div>
                                        </Accordion>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            {error &&
                                error.length > 0 &&
                                error.map((msg, key) => (
                                    <Alert key={key} className="my-4" severity="error">
                                        {msg}
                                    </Alert>
                                ))}
                        </div>
                    </div>
                );
            }
        } else {
            content = <Typography>{t('checkout:noShipping')}</Typography>;
        }
    } else {
        content = <Typography>{t('checkout:noShipping')}</Typography>;
    }

    if (isOnlyVirtualProductOnCart) return <></>;

    return (
        <div
            id="checkoutShipping"
            className={classNames(
                'flex flex-col border-b border-b-neutral-200',
                'w-full py-6 gap-4',
            )}
        >
            <Typography variant="h2" className="uppercase">
                {t('checkout:shippingMethod')}
            </Typography>
            {content}
        </div>
    );
};

export default ShippingView;
