import React from 'react';
import cx from 'classnames';
import Typography from '@common_typography';
import Button from '@common_button';
import Layout from '@layout_customer';
import Item from '@core_modules/customer/pages/wishlist/components/item';
import ShareWishlistComponent from '@core_modules/customer/pages/wishlist/components/sharewishlist';
import Alert from '@common/Alert';

// Main Render Page
const Content = (props) => {
    const {
        t, wishlist, refetch, handleRemove, handleToCart, handleAddAlltoBag, loading,
        handleShareWishlist, shareLoading, storeConfig,
    } = props;
    const [openShare, setOpenShare] = React.useState(false);
    const handleOpenShare = () => {
        setOpenShare(true);
    };

    return (
        <Layout {...props}>
            <div className={cx('pt-5')}>
                {
                    openShare && (
                        <ShareWishlistComponent
                            open={openShare}
                            setOpen={() => setOpenShare(false)}
                            handleShareWishlist={handleShareWishlist}
                            shareLoading={shareLoading}
                            t={t}
                        />
                    )
                }
                {wishlist.length === 0 && (
                    <Alert severity="warning">
                        <Typography
                            variant="p-2a"
                            className={cx()}
                        >
                            {t('customer:wishlist:notFound')}
                        </Typography>
                    </Alert>
                )}
                <div
                    className={cx(
                        'grid tablet:grid-cols-3 tablet:gap-3 mobile:grid-cols-1',
                    )}
                >
                    {wishlist.map((item, index) => (
                        <div
                            key={index}
                            className={cx(
                                '',
                            )}
                        >
                            <Item
                                {...item}
                                {...props}
                                refetch={refetch}
                                handleRemove={handleRemove}
                                handleToCart={handleToCart}
                                storeConfig={storeConfig}
                                noBorderTop={index > 0}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className={cx(
                        'flex items-center justify-center flex-wrap',
                        'mt-[24px]',
                    )}
                >
                    <div
                        className={cx(
                            'm-2',
                        )}
                    >
                        <Button
                            onClick={handleOpenShare}
                            disabled={loading || wishlist.length === 0}
                        >
                            <Typography className={cx('!text-neutral-white uppercase')}>
                                {t('customer:wishlist:shareWishlist')}
                            </Typography>
                        </Button>
                    </div>
                    <div
                        className={cx(
                            'm-2',
                        )}
                    >
                        <Button
                            onClick={handleAddAlltoBag}
                            disabled={loading || wishlist.length === 0}
                        >
                            <Typography className={cx('!text-neutral-white uppercase')}>
                                {t('customer:wishlist:addAllToBag')}
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Content;
