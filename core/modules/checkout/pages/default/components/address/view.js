import React from 'react';
import Alert from '@common/Alert';
import AddressFormDialog from '@plugin_addressform';
import Button from '@common_button';
import Typography from '@common_typography';
import _ from 'lodash';
import ModalAddress from '@core_modules/checkout/pages/default/components/ModalAddress';
import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import classNames from 'classnames';
import Show from '@common/Show';

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
        <div
            id="checkoutAddress"
            className={classNames(
                'flex flex-col border-b border-b-neutral-200',
                'w-full py-6 gap-4',
            )}
        >
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
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2">
                    <Typography variant="h2" type="bold" className="uppercase">
                        {isOnlyVirtualProductOnCart ? t('checkout:billingAddress') : t('checkout:shippingAddress')}
                    </Typography>
                    <Typography>{content}</Typography>
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
                            <Typography variant="p-3" type="bold" letter="uppercase">
                                {data.isGuest && !address
                                    ? t('common:button:addAddress')
                                    : t(_.isNull(address) ? 'common:button:manage' : 'common:button:change')}
                            </Typography>
                        </Button>
                    )}
                </div>
            </div>
            <Show when={showEmptyPinpoint || checkout.error.shippingAddress}>
                <div className="flex flex-col justify-between h-[100px]">
                    {
                        showEmptyPinpoint && gmapKey && (
                            <Alert style={{ fontSize: 10 }} severity="warning">
                                {t('customer:address:emptyPinPointMessage')}
                            </Alert>
                        )
                    }
                    {
                        checkout.error.shippingAddress && (
                            <Alert style={{ fontSize: 10 }} severity="error">
                                {t('checkout:address:invalidAddress')}
                            </Alert>
                        )
                    }
                </div>
            </Show>
        </div>
    );
};

export default AddressView;
