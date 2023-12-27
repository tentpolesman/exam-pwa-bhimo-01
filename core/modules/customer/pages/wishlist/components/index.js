/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// Library
import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import Layout from '@layout_customer';
import Item from '@core_modules/customer/pages/wishlist/components/item';
import ShareWishlistComponent from '@core_modules/customer/pages/wishlist/components/sharewishlist';

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
    return null;
    // return (
    //     <Layout {...props}>
    //         <div className={styles.root}>
    //             {
    //                 openShare && (
    //                     <ShareWishlistComponent
    //                         open={openShare}
    //                         setOpen={() => setOpenShare(false)}
    //                         handleShareWishlist={handleShareWishlist}
    //                         shareLoading={shareLoading}
    //                         t={t}
    //                     />
    //                 )
    //             }
    //             {wishlist.length === 0 && (
    //                 <div className="alert m-15" severity="warning">
    //                     {t('customer:wishlist:notFound')}
    //                 </div>
    //             )}
    //             <div className={[styles.content, styles.wishlistItems, 'row'].join(' ')}>
    //                 {wishlist.map((item, index) => (
    //                     <div className="md:basis-3/12 xs:basis-full">
    //                         <Item
    //                             key={index}
    //                             {...item}
    //                             {...props}
    //                             refetch={refetch}
    //                             handleRemove={handleRemove}
    //                             handleToCart={handleToCart}
    //                             storeConfig={storeConfig}
    //                         />
    //                     </div>
    //                 ))}
    //             </div>
    //             <div className={styles.footer}>
    //                 <div>
    //                     <Button
    //                         onClick={handleOpenShare}
    //                         disabled={loading || wishlist.length === 0}
    //                         className={styles.btnWishlist}
    //                     >
    //                         <Typography variant="span" type="bold" letter="uppercase" color="white">
    //                             {t('customer:wishlist:shareWishlist')}
    //                         </Typography>
    //                     </Button>
    //                 </div>
    //                 <div>
    //                     <Button
    //                         onClick={handleAddAlltoBag}
    //                         disabled={loading || wishlist.length === 0}
    //                         className={styles.btnWishlist}
    //                     >
    //                         <Typography variant="span" type="bold" letter="uppercase" color="white">
    //                             {t('customer:wishlist:addAllToBag')}
    //                         </Typography>
    //                     </Button>
    //                 </div>
    //             </div>
    //         </div>
    //     </Layout>
    // );
};

export default Content;
