/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import Dialog from '@common_dialog';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import classNames from 'classnames';
import React from 'react';
import gqlService from '@core_modules/checkout/services/graphql';
import { useTranslation } from 'next-i18next';

const ModalSelectStore = ({
    open, setOpen, checkout, setCheckout,
    listStores = [],
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const [stores, setStores] = React.useState(listStores);
    const [search, setSearch] = React.useState('');
    const [setPickupStore] = gqlService.setPickupStore();
    const [selected, setSelected] = React.useState({
        key: null,
        item: null,
    });
    const [loading, setLoading] = React.useState(false);

    const handleSelect = async (key, item) => {
        setSelected({
            key,
            item,
        });
    };

    const handleSave = async () => {
        await setLoading(true);
        if (Object.keys(checkout.pickupInformation).length > 0) {
            await setPickupStore({
                variables: {
                    cart_id: checkout.data.cart.id,
                    code: selected.item.code,
                    extension_attributes: checkout.pickupInformation,
                    store_address: {
                        city: selected.item.city,
                        country_code: selected.item.country_id,
                        name: selected.item.name,
                        postcode: selected.item.postcode,
                        region: selected.item.region,
                        street: [selected.item.street],
                        telephone: selected.item.telephone,
                    },
                },
            }).then(async (res) => {
                const paymentMethod = res.data.setPickupStore.available_payment_methods.map((method) => ({
                    ...method,
                    label: method.title,
                    value: method.code,
                    image: null,
                }));
                await setCheckout({
                    ...checkout,
                    data: {
                        ...checkout.data,
                        cart: {
                            ...checkout.data.cart,
                            ...res.data.setPickupStore,
                        },
                        paymentMethod,
                    },
                    selectStore: {
                        ...selected.item,
                    },
                    error: {
                        selectStore: false,
                        pickupInformation: false,
                    },
                });
                await setLoading(false);
                setOpen();
            }).catch((err) => {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: err.message.split(':')[1] || t('checkout:message:serverError'),
                });
                setLoading(false);
            });
        } else {
            await setCheckout({
                ...checkout,
                selectStore: {
                    ...selected.item,
                },
                error: {
                    ...checkout.error,
                    pickupInformation: true,
                },
            });

            await setLoading(false);
            setOpen();
        }
    };

    const getStyle = (key, index) => {
        let classname;
        const styleCard = 'w-full my-[10px] p-[17px] flex felx-col justify-between items-start border border-neutral-400 rounded-[10px]';
        if (selected.key && selected.key === key) {
            classname = classNames(styleCard, 'border-primary');
        } else if (Object.keys(checkout.selectStore).length > 0 && !selected.key) {
            if (key === checkout.selectStore.code) {
                classname = classNames(styleCard, 'border-primary');
            } else if (index === listStores.length - 1) {
                classname = classNames(styleCard, 'mb-[100px]');
            } else {
                classname = styleCard;
            }
        } else if (index === listStores.length - 1 && key === selected.key) {
            classname = classNames(styleCard, 'border-primary', 'mb-[100px]');
        } else if (index === listStores.length - 1) {
            classname = classNames(styleCard, 'mb-[100px]');
        } else {
            classname = styleCard;
        }

        return classname;
    };

    const handleSearch = (event) => {
        const { value } = event.target;
        const newItem = listStores.filter(
            ({ name }) => name.toLowerCase().search(value.toLowerCase()) > -1,
        );
        setSearch(value);
        setStores(newItem);
    };

    React.useEffect(() => {
        setStores(listStores);
    }, [listStores]);

    return (
        <Dialog
            open={open}
            onClose={setOpen}
        >
            <div className="app-bar relative bg-neutral-white p-[10px] shadow-none h-[51px] flex flex-row justify-center items-center">
                <Button
                    className="absolute left-[10px]"
                    edge="start"
                    onClick={setOpen}
                    aria-label="close"
                >
                    <XMarkIcon className="text-[30px] text-primary" />
                </Button>
                <Typography variant="label" type="bold" align="center" letter="uppercase" className="self-center my-[16px]">
                    {t('checkout:pickupInformation:selectStoreLocation')}
                </Typography>
            </div>
            <div className="dialog-content">
                <div className="w-full h-[80vh]">
                    <div className="flex flex-col relative h-full">
                        <TextField
                            label="Search"
                            value={search}
                            onChange={handleSearch}
                        />
                        {
                            stores.length > 0
                                ? (
                                    stores.map((item, index) => (
                                        <div
                                            key={item.code}
                                            onClick={() => handleSelect(item.code, item)}
                                            className={getStyle(item.code, index)}
                                        >
                                            <Typography className="font-bold">
                                                {item.name}
                                            </Typography>
                                            <Typography>
                                                {item.street}
                                                <br />
                                                {item.city}
                                                <br />
                                                {item.region}
                                                <br />
                                                {item.country_id}
                                                <br />
                                                {item.postcode}
                                                <br />
                                                {item.telephone}
                                            </Typography>
                                        </div>
                                    ))
                                ) : (
                                    <div className="m-15 p-2 bg-yellow-500 text-neutral-white">
                                        {t('checkout:storesNotFound')}
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
            <div className="dialog-footer">
                <div className="flex flex-row w-full justify-around items-center bottom-0 bg-neutral-white p-[10px]">
                    <Button
                        loading={loading}
                        className="block m-auto w-[calc(100% - 12px)] h-[41px]"
                        onClick={handleSave}
                        disabled={!stores || stores.length === 0}
                    >
                        {t('common:button:save')}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalSelectStore;
