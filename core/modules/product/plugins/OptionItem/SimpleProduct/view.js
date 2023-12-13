import React from 'react';
import dynamic from 'next/dynamic';

const OptionAction = dynamic(() => import('@core_modules/product/plugins/OptionItemAction'), { ssr: true });

const SimpleOptionView = ({
    qty = 1,
    setQty = () => { },
    handleAddToCart = () => { },
    t,
    loading = false,
    disabled = false,
    showQty = true,
    showAddToCart = true,
    ...other
}) => (
    <OptionAction
        loading={loading}
        disabled={disabled}
        showQty={showQty}
        handleAddToCart={handleAddToCart}
        qty={qty}
        setQty={setQty}
        t={t}
        showAddToCart={showAddToCart}
        {...other}
    />
);

export default SimpleOptionView;
