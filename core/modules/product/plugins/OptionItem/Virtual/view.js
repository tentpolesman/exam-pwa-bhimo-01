import React from 'react';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@plugin_optionitem/components/Footer'), { ssr: true });

const SimpleOptionView = ({
    qty = 1,
    setQty = () => {},
    handleAddToCart = () => {},
    t,
    loading = false,
    disabled = false,
    showQty = true,
    showAddToCart = true,
    CustomFooter,
    ...other
}) => (
    <>
        <div />
        {React.isValidElement(CustomFooter)
            ? React.cloneElement(CustomFooter, {
                ...other,
                loading,
                disabled,
                showQty,
                handleAddToCart,
                qty,
                setQty,
                t,
                showAddToCart,
            })
            : (
                <Footer
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
            )}
    </>
);

export default SimpleOptionView;
