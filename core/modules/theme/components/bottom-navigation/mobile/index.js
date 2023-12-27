// import BrowseModal from '@common_searchmodal';
/* eslint-disable no-unused-vars */
import ShoppingBagIcon from '@plugin_shoppingbag';
import Router from 'next/router';
import { withApollo } from '@lib_apollo';
import { useState } from 'react';

const Navigation = ({ active, ...other }) => {
    // eslint-disable-next-line no-unused-vars
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (val) => {
        setOpenModal(val);
    };

    const { storeConfig } = other;

    return null;
    // if (active) {
    //     return (
    //         <>
    //             {/* {openModal ? (
    //                 <BrowseModal open={openModal} setOpenModal={handleOpenModal} {...other} />
    //             ) : null} */}
    //             <BottomNavigation
    //                 value={active}
    //                 showLabels={false}
    //                 onChange={(event, newValue) => {
    //                     switch (newValue) {
    //                     case 'home':
    //                         Router.push('/');
    //                         return;
    //                     case 'browse':
    //                         handleOpenModal(true);
    //                         return;
    //                     case 'cart':
    //                         Router.push('/checkout/cart');
    //                         return;
    //                     case 'account':
    //                         Router.push('/customer/account');
    //                         break;
    //                     default:
    //                     }
    //                 }}
    //             >
    //                 <BottomNavigationAction
    //                     label="Home"
    //                     value="home"
    //                     icon={<HomeIcon />}
    //                     classes={{
    //                         label: 'hide',
    //                     }}
    //                 />
    //                 <BottomNavigationAction
    //                     label="Search"
    //                     value="browse"
    //                     icon={<SearchIcon />}
    //                     classes={{
    //                         label: 'hide',
    //                     }}
    //                 />
    //                 <BottomNavigationAction
    //                     label="Cart"
    //                     value="cart"
    //                     icon={<ShoppingBagIcon storeConfig={storeConfig} />}
    //                     classes={{
    //                         label: 'hide',
    //                     }}
    //                 />
    //                 <BottomNavigationAction
    //                     label="Account"
    //                     value="account"
    //                     icon={<PersonIcon />}
    //                     classes={{
    //                         label: 'hide',
    //                     }}
    //                 />
    //             </BottomNavigation>
    //         </>
    //     );
    // }
    // return null;
};

export default withApollo({ ssr: false })(Navigation);
