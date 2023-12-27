import React from 'react';
import AddressFormDialog from '@plugin_addressform';
import Button from '@common_button';
import Typography from '@common_typography';
import _ from 'lodash';
import ModalAddress from '@core_modules/checkout/pages/default/components/ModalAddress';
import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';

const CLOSE_ADDRESS_DIALOG = 100;

const AddressView = (props) => {
    const {
        data,
        checkout,
        setAddress,
        setCheckout,
        t,
        dialogProps,
        loading,
        address,
        content,
        manageCustomer,
        isOnlyVirtualProductOnCart,
        showEmptyPinpoint,
        ...other
    } = props;

    const pwaConfig = useReactiveVar(storeConfigVar);
    const gmapKey = pwaConfig && pwaConfig.icube_pinlocation_gmap_key ? pwaConfig.icube_pinlocation_gmap_key : null;
    const { formik } = other;

    const [openAddress, setOpenAddress] = React.useState(false);

    return (
        <div className="border border-neutral-400 p-[30px]" id="checkoutAddress">
            <style jsx>
                {`
                    .alert-empty-pin-point :global(.MuiAlert-icon) {
                        font-size: 16px;
                    }
                `}
            </style>
            <ModalAddress
                open={openAddress}
                setOpen={(status) => setOpenAddress(status)}
                t={t}
                checkout={checkout}
                setAddress={setAddress}
                setCheckout={setCheckout}
                manageCustomer={manageCustomer}
                {...other}
            />
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col max-w-[60%]">
                    <Typography variant="h2" type="bold" letter="uppercase">
                        {isOnlyVirtualProductOnCart ? t('checkout:billingAddress') : t('checkout:shippingAddress')}
                    </Typography>
                    <Typography variant="p">{content}</Typography>
                </div>
                <div>
                    <AddressFormDialog
                        t={t}
                        onSubmitAddress={async (dataAddress) => {
                            const { cart } = checkout.data;
                            let state = { ...checkout };

                            await setAddress(dataAddress, cart);
                            state.status.addresses = true;
                            setCheckout({
                                ...state,
                                pickup_location_code: null,
                            });

                            _.delay(() => {
                                state = { ...checkout };
                                state.status.openAddressDialog = false;
                                state.status.addresses = false;
                                setCheckout(state);
                            }, CLOSE_ADDRESS_DIALOG);
                        }}
                        loading={checkout.loading.addresses}
                        success={checkout.status.addresses}
                        open={checkout.status.openAddressDialog}
                        disableDefaultAddress
                        setOpen={() => {
                            setCheckout({
                                ...checkout,
                                status: {
                                    ...checkout.status,
                                    openAddressDialog: false,
                                },
                            });
                        }}
                        pageTitle={t('checkout:address:addTitle')}
                        {...other}
                        {...dialogProps}
                    />
                    {loading.addresses || loading.all ? null : (
                        <Button
                            // eslint-disable-next-line no-nested-ternary, max-len
                            className={data.isGuest && !address ? 'checkout-addAddress-btn' : _.isNull(address) ? 'checkout-manage-btn' : 'checkout-change-btn'}
                            variant={formik.values.email !== '' && formik.values.email !== formik.values.oldEmail ? 'contained' : 'outlined'}
                            disabled={formik.values.email !== '' && formik.values.email !== formik.values.oldEmail}
                            // href={data.isGuest ? null : '/customer/account/address'}
                            onClick={
                                data.isGuest
                                    ? () => {
                                        setCheckout({
                                            ...checkout,
                                            status: {
                                                ...checkout.status,
                                                openAddressDialog: true,
                                            },
                                        });
                                    }
                                    : () => setOpenAddress(true)
                            }
                        >
                            <Typography variant="p" type="bold" letter="uppercase">
                                {data.isGuest && !address
                                    ? t('common:button:addAddress')
                                    : t(_.isNull(address) ? 'common:button:manage' : 'common:button:change')}
                            </Typography>
                        </Button>
                    )}
                </div>
            </div>
            <div className="alert-empty-pin-point">
                {
                    showEmptyPinpoint && gmapKey && (
                        <div className="text-xs p-2 bg-yellow-400 text-neutral-white">
                            {t('customer:address:emptyPinPointMessage')}
                        </div>
                    )
                }
                {
                    checkout.error.shippingAddress && (
                        <div className="text-xs p-2 bg-red-600 text-neutral-white">
                            {t('checkout:address:invalidAddress')}
                        </div>
                    )
                }
            </div>
            <style jsx global>
                {`
                    .alert-empty-pin-point {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 100px;
                    }
                `}
            </style>
        </div>
    );
};

export default AddressView;
