import Button from '@common_button';
import Dialog from '@common_dialog';
import Typography from '@common_typography';
import Address from '@core_modules/checkout/pages/default/components/address';
import Confirmation from '@core_modules/checkout/pages/default/components/Confirmation';
import Credit from '@core_modules/checkout/pages/default/components/credit';
import Delivery from '@core_modules/checkout/pages/default/components/delivery';
import Email from '@core_modules/checkout/pages/default/components/email';
import ExtraFee from '@core_modules/checkout/pages/default/components/ExtraFee';
import GiftCard from '@core_modules/checkout/pages/default/components/giftcard';
import InStorePickup from '@core_modules/checkout/pages/default/components/instorepickup';
import OrderComment from '@core_modules/checkout/pages/default/components/OrderComment';
import PaymentList from '@core_modules/checkout/pages/default/components/payment';
import PickupInfo from '@core_modules/checkout/pages/default/components/PickupInformation';
import Promo from '@core_modules/checkout/pages/default/components/promo';
import PromoModalItem from '@core_modules/checkout/pages/default/components/PromoModalItem';
import RewardPoint from '@core_modules/checkout/pages/default/components/rewardpoint';
import Shipping from '@core_modules/checkout/pages/default/components/shipping';
import Summary from '@core_modules/checkout/pages/default/components/summary';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { useState } from 'react';

import HeaderView from '@core_modules/checkout/pages/default/components/Header';
import PromoModalItemView from '@core_modules/checkout/pages/default/components/PromoModalItem/view';
import OrderCommentView from '@core_modules/checkout/pages/default/components/OrderComment/view';
import ConfirmationView from '@core_modules/checkout/pages/default/components/Confirmation/view';

import CashbackInfoView from '@core_modules/checkout/pages/default/components/CashbackInfo';
import EmailView from '@core_modules/checkout/pages/default/components/email/view';
import DeliveryView from '@core_modules/checkout/pages/default/components/delivery/view';
import DeliverySkeleton from '@core_modules/checkout/pages/default/components/delivery/skeleton';
import SummaryView from '@core_modules/checkout/pages/default/components/summary/view';
import AddressView from '@core_modules/checkout/pages/default/components/address/view';
import ShippingView from '@core_modules/checkout/pages/default/components/shipping/view';
import PaymentView from '@core_modules/checkout/pages/default/components/payment/view';
import GiftCardView from '@core_modules/checkout/pages/default/components/giftcard/view';
import PromoView from '@core_modules/checkout/components/fieldcode';
import RewardPointView from '@core_modules/checkout/pages/default/components/rewardpoint/view';
import StoreCreditView from '@core_modules/checkout/pages/default/components/credit/view';
import ExtraFeeView from '@core_modules/checkout/pages/default/components/ExtraFee/view';

const GimmickBanner = dynamic(() => import('@plugin_gimmickbanner'), { ssr: false });

const Content = (props) => {
    const {
        containerStyle,
        checkout,
        storeConfig,
        chasbackMessage,
        formik,
        t,
        setCheckout,
        isOnlyVirtualProductOnCart,
        handleOpenMessage,
        config,
        updateFormik,
        modules,
        manageCustomer,
        cartId,
        paypalTokenData,
        paypalHandlingProps,
        setInitialOptionPaypal,
        initialOptionPaypal,
        setTokenData,
        refetchDataCart,
        refetchItemCart,
        checkoutTokenState,
        setCheckoutTokenState,
        setLoadingSellerInfo,
        loadingSellerInfo,
        currencyCache,
    } = props;

    const SummaryRef = React.createRef();
    const { order: loading, all: disabled } = checkout.loading;
    const isSelectedPurchaseOrder = checkout.selected.payment === 'purchaseorder';
    // prettier-ignore
    const isPurchaseOrderApply = isSelectedPurchaseOrder && checkout.status.purchaseOrderApply;
    const travelokaPayRef = React.useRef();
    const stripeRef = React.useRef();
    const [clientSecret, setClientSecret] = useState(null);

    const [displayHowToPay, setDisplayHowToPay] = useState(false);
    const enableMultiSeller = storeConfig.enable_oms_multiseller === '1';
    const errorItems = checkout?.data?.errorItems;

    /**
     * [METHOD] handle click for place order
     */
    const handleClick = () => {
        if (stripeRef && stripeRef.current && clientSecret) {
            stripeRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        } else if (SummaryRef.current) {
            SummaryRef.current.handlePlaceOrder();
        }
    };

    /**
     * [VIEW]
     */
    return (
        <div id="checkout" className="flex flex-row desktop:justify-between">
            <div className="xs:basis-full center hidden-mobile">
                <HeaderView storeConfig={storeConfig} />
            </div>
            <Typography variant="h1" className="hidden">
                Checkout
            </Typography>
            <Dialog
                open={checkoutTokenState}
                handleYes={() => {
                    setCheckoutTokenState(!checkoutTokenState);
                    Router.reload();
                }}
                handleCancel={() => {
                    setCheckoutTokenState(!checkoutTokenState);
                    Router.push('/checkout/cart');
                }}
                yesNo
                message={`${t('checkout:invalidToken')}`}
                confirmationMessage={`${t('checkout:invalidTokenConfirmation')}`}
            />
            <div className="xs:basis-full sm:basis-full md:basis-full lg:basis-full center">
                {checkout && checkout.data && checkout.data.cart && checkout.data.cart.promoBanner.length > 0 && (
                    <GimmickBanner data={checkout.data.cart.promoBanner || []} />
                )}
            </div>
            <div className="xs:basis-full sm:basis-8/12 md:basis-8/12 lg:basis-8/12" style={containerStyle || {}}>
                {modules.checkout.cashback.enabled && checkout.data.cart && checkout.data.cart.applied_cashback.is_cashback && (
                    <CashbackInfoView
                        message={chasbackMessage}
                        price={checkout.data.cart.applied_cashback.data[0].amount}
                        currency={storeConfig.base_currency_code}
                        promo_name={checkout.data.cart.applied_cashback.data[0].promo_name}
                    />
                )}

                {/* {modules.checkout.inStorePickup.enabled && (
                    <div className="flex flex-row xs:basis-full">
                        <div className="xs:basis-6/12">
                            <Button onClick={() => setInStore(false)}>Shipping</Button>
                        </div>
                        <div className="xs:basis-6/12">
                            <Button onClick={() => setInStore(true)}>In Store Pickup</Button>
                        </div>
                    </div>
                )} */}

                <>
                    {modules.checkout.pickupStore.enabled || modules.checkout.inStorePickup.enabled ? (
                        <Delivery
                            t={t}
                            DeliveryView={DeliveryView}
                            Skeleton={DeliverySkeleton}
                            formik={formik}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            storeConfig={storeConfig}
                            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                            checkoutTokenState={checkoutTokenState}
                            setCheckoutTokenState={setCheckoutTokenState}
                        />
                    ) : null}
                    <Email
                        t={t}
                        formik={formik}
                        EmailView={EmailView}
                        checkout={checkout}
                        config={config}
                        setCheckout={setCheckout}
                        handleOpenMessage={handleOpenMessage}
                        cartId={cartId}
                        checkoutTokenState={checkoutTokenState}
                        setCheckoutTokenState={setCheckoutTokenState}
                    />
                    {/* eslint-disable */ }
                    {checkout.selected.delivery === 'home' ? (
                        <Address
                            checkout={checkout}
                            t={t}
                            setCheckout={setCheckout}
                            defaultAddress={checkout.data.defaultAddress}
                            updateFormik={updateFormik}
                            AddressView={AddressView}
                            manageCustomer={manageCustomer}
                            storeConfig={storeConfig}
                            formik={formik}
                            isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                            refetchDataCart={refetchDataCart}
                            refetchItemCart={refetchItemCart}
                            checkoutTokenState={checkoutTokenState}
                            setCheckoutTokenState={setCheckoutTokenState}
                            setLoadingSellerInfo={setLoadingSellerInfo}
                        />
                    ) : checkout.selected.delivery === 'pickup' ? (
                        <PickupInfo t={t} formik={formik} checkout={checkout} setCheckout={setCheckout} />
                    ) : (
                        <InStorePickup handleOpenMessage={handleOpenMessage} t={t} checkout={checkout} setCheckout={setCheckout} />
                    )}
                    <Shipping
                        t={t}
                        checkout={checkout}
                        setCheckout={setCheckout}
                        updateFormik={updateFormik}
                        formik={formik}
                        handleOpenMessage={handleOpenMessage}
                        storeConfig={storeConfig}
                        ShippingView={ShippingView}
                        isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                        checkoutTokenState={checkoutTokenState}
                        setCheckoutTokenState={setCheckoutTokenState}
                        setLoadingSellerInfo={setLoadingSellerInfo}
                        loadingSellerInfo={loadingSellerInfo}
                        currencyCache={currencyCache}
                    />
                    <div className={classNames(
                        'border-b border-b-neutral-150',
                        'p-8'
                    )}>
                        <Typography variant="h2" type="bold" letter="uppercase">
                            {t('checkout:feePromoLabel')}
                        </Typography>
                        <div className="flex flex-row">
                            {modules.checkout.extraFee.enabled ? (
                                <ExtraFee
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    updateFormik={updateFormik}
                                    handleOpenMessage={handleOpenMessage}
                                    t={t}
                                    storeConfig={storeConfig}
                                    ExtraFeeView={ExtraFeeView}
                                    currencyCache={currencyCache}
                                />
                            ) : null}
                            {modules.promo.enabled ? (
                                <div className="xs:basis-full sm:basis-full md:basis-full xl:basis-full">
                                    <Promo
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        PromoView={PromoView}
                                    />
                                </div>
                            ) : null}
                            {modules.giftcard.enabled ? (
                                <div className="xs:basis-full sm:basis-full md:basis-full xl:basis-full">
                                    <GiftCard
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        GiftCardView={GiftCardView}
                                    />
                                </div>
                            ) : null}
                            {modules.rewardpoint.enabled ? (
                                <div className="xs:basis-full sm:basis-full md:basis-1/2 xl:basis-6/12">
                                    <RewardPoint
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        RewardPointView={RewardPointView}
                                        currencyCache={currencyCache}
                                    />
                                </div>
                            ) : null}
                            {modules.storecredit.enabled ? (
                                <div className="xs:basis-full sm:basis-full md:basis-1/2 xl:basis-6/12">
                                    <Credit
                                        t={t}
                                        checkout={checkout}
                                        setCheckout={setCheckout}
                                        handleOpenMessage={handleOpenMessage}
                                        formik={formik}
                                        storeConfig={storeConfig}
                                        StoreCreditView={StoreCreditView}
                                        currencyCache={currencyCache}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <PaymentList
                        checkout={checkout}
                        setCheckout={setCheckout}
                        formik={formik}
                        updateFormik={updateFormik}
                        handleOpenMessage={handleOpenMessage}
                        t={t}
                        storeConfig={storeConfig}
                        PaymentView={PaymentView}
                        modules={modules}
                        paypalTokenData={paypalTokenData}
                        paypalHandlingProps={paypalHandlingProps}
                        setInitialOptionPaypal={setInitialOptionPaypal}
                        initialOptionPaypal={initialOptionPaypal}
                        setTokenData={setTokenData}
                        travelokaPayRef={travelokaPayRef}
                        stripeRef={stripeRef}
                        clientSecret={clientSecret}
                        setClientSecret={setClientSecret}
                        displayHowToPay={displayHowToPay}
                        setDisplayHowToPay={setDisplayHowToPay}
                        checkoutTokenState={checkoutTokenState}
                        refSummary={SummaryRef}
                        setCheckoutTokenState={setCheckoutTokenState}
                        config={config}
                    />

                    <Confirmation t={t} checkout={checkout} setCheckout={setCheckout} storeConfig={storeConfig} ConfirmationView={ConfirmationView} />
                    
                    {!enableMultiSeller ? (
                        <div className={classNames(
                            'border-b border-b-neutral-150',
                            'p-8'
                        )}>
                            <div className="xs:basis-full sm:basis-full md:basis-full xl:basis-full">
                                <OrderComment
                                    t={t}
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    handleOpenMessage={handleOpenMessage}
                                    formik={formik}
                                    storeConfig={storeConfig}
                                    OrderCommentView={OrderCommentView}
                                />
                            </div>
                        </div>
                    ) : null}
                </>
            </div>
            <div className="xs:basis-full sm:basis-4/12 md:basis-4/12 lg:basis-3/12">
                <PromoModalItem
                    t={t}
                    storeConfig={storeConfig}
                    checkout={checkout}
                    setCheckout={setCheckout}
                    PromoModalItemView={PromoModalItemView}
                />
                <Summary
                    {...props}
                    loading={loading}
                    disabled={disabled}
                    checkout={checkout}
                    updateFormik={updateFormik}
                    setCheckout={setCheckout}
                    handleOpenMessage={handleOpenMessage}
                    formik={formik}
                    storeConfig={storeConfig}
                    SummaryView={SummaryView}
                    refSummary={SummaryRef}
                    isOnlyVirtualProductOnCart={isOnlyVirtualProductOnCart}
                    checkoutTokenState={checkoutTokenState}
                    setCheckoutTokenState={setCheckoutTokenState}
                />
            </div>
            <div className="xs:basis-full sm:basis-8/12 hidden-mobile center">
                <Button
                    customRootStyle={{ marginBottom: 80, marginTop: 50 }}
                    onClick={handleClick}
                    fullWidth
                    loading={loading}
                    disabled={
                        errorItems ||
                        disabled ||
                        checkout.error.shippingAddress ||
                        (isSelectedPurchaseOrder && !isPurchaseOrderApply) ||
                        (storeConfig.minimum_order_enable && checkout.data.cart.prices.grand_total.value < storeConfig.minimum_order_amount)
                    }
                    className={classNames('w-full', 'checkout-placeOrder-btn')}
                >
                    <Typography variant="bd-2" letter="uppercase" type="bold" color="white">
                        {t('checkout:placeOrder')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default Content;