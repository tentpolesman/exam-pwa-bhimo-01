/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import Dialog from '@common_dialog';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import Typography from '@common_typography';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import GiftTopIcon from '@heroicons/react/24/solid/GiftTopIcon';
import ProductItem from '@plugin_productitem';

const Caraousel = dynamic(() => import('@common_slick/Caraousel'), { ssr: false });

const PromoModalItemView = (props) => {
    const {
        items, handleAddToCart, handleClickOpen, handleClose, open,
        availableMaxQty, customQty,
    } = props;

    const [triger, setTriger] = React.useState(false);
    const maxHeigtToShow = 51;

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const header = document.getElementById('header');
            const checkScrollTop = () => {
                // handle show hide header
                if (header) {
                    if (window.pageYOffset > 51) {
                        header.classList.add('header-small');
                    } else {
                        header.classList.remove('header-small');
                    }
                }
                if (!triger && window.pageYOffset > maxHeigtToShow) {
                    setTriger(true);
                } else if (triger && window.pageYOffset < maxHeigtToShow) {
                    setTriger(false);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        }
    }, [window, triger]);

    return (
        <>
            {availableMaxQty > 0 ? (
                <div className={
                    triger
                        ? 'flex flex-row justify-center items-center bg-yellow-700 sticky top-[37px] text-neutral-white [&>span]:text-neutral-white mobile:p-[10px] mobile:fixed mobile:top-0 mobile:w-full'
                        : 'flex flex-row justify-center items-center bg-yellow-700 sticky top-[37px] text-neutral-white [&>span]:text-neutral-white mobile:p-[10px] mobile:absolute mobile:top-0 mobile:w-full'
                }
                >
                    <GiftTopIcon />
            &nbsp;
                    <span>
                        Select your
                        <Button variant="plain" color="primary" onClick={handleClickOpen}>
                            <Typography type="bold" letter="uppercase">
                                Free Gift!
                            </Typography>
                        </Button>
                    </span>
                </div>
            ) : null }
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="md">
                <div class="dalog-title" disableTypography className="m-0 p-[2px]" id="customized-dialog-title">
                    <Typography variant="h6">Free Promo Items</Typography>
                    <Typography variant="span">{`Available max quatity : ${availableMaxQty}`}</Typography>
                    {handleClose ? (
                        <Button aria-label="close" className="absolute right-[1px] top-[1px] text-neutral-400" onClick={handleClose}>
                            <XMarkIcon />
                        </Button>
                    ) : null}
                </div>
                <div className={classNames('p-[20px] mobile:pb-[70px] mobile:pl-0 mobile:pr-0', 'xs:basis-full lg:basis-full')}>
                    <Caraousel
                        data={items}
                        Item={ProductItem}
                        enableAddToCart
                        enableOption
                        handleAddToCart={handleAddToCart}
                        enableWishlist={false}
                        enablePrice={false}
                        enableRating={false}
                        enableQuickView={false}
                        showQty
                        customQty={customQty}
                        maxQty={availableMaxQty}
                        slideLg={5}
                    />
                </div>
            </Dialog>
        </>
    );
};

export default PromoModalItemView;
