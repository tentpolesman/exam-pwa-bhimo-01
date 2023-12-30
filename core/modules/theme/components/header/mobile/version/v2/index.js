/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Typography from '@common_typography';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
// import BrowseModal from '@common_searchmodal';
import ShoppingBagIcon from '@plugin_shoppingbag';

const CategoryList = dynamic(() => import('@core_modules/theme/components/header/mobile/CategoryList'), { ssr: true });
const VesMenuCategoryList = dynamic(() => import('@core_modules/theme/components/header/mobile/VesMenuCategoryList'), { ssr: true });

const BurgerV2 = ({
    isLogin,
    styles,
    logoUrl,
    toggleDrawer,
    openModal,
    handleOpenModal,
    storeConfig,
    router,
    a11yProps,
    value,
    drawerOpen,
    setDrawerOpen,
    data,
    loading,
    error,
    vesMenu,
    dataVesMenu,
    loadingVesMenu,
    errorVesMenu,
    TabPanel,
    handleChange,
}) =>
    null
    // return (
    //     <>
    //         <AppBar position="fixed">
    //             <Toolbar>
    //                 <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
    //                     <MenuIcon />
    //                 </IconButton>
    //                 <div className={classNames(styles.logo, 'hidden-desktop')}>
    //                     {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
    //                     <img src={logoUrl} alt="logo" className={styles.imgLogoHamburger} onClick={() => router.push('/')} />
    //                 </div>
    //                 <div className={styles.navRightMenu}>
    //                     <BrowseModal open={openModal} setOpenModal={handleOpenModal} storeConfig={storeConfig} />
    //                     <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => handleOpenModal(true)}>
    //                         <SearchIcon />
    //                     </IconButton>
    //                     <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => router.push('/checkout/cart')}>
    //                         <ShoppingBagIcon storeConfig={storeConfig} />
    //                     </IconButton>
    //                 </div>
    //             </Toolbar>
    //         </AppBar>
    //         <SwipeableDrawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
    //             <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
    //                 <Tab label="Menu" {...a11yProps(0)} />
    //                 <Tab label="Account" {...a11yProps(1)} />
    //                 <IconButton
    //                     edge="start"
    //                     color="inherit"
    //                     aria-label="menu"
    //                     onClick={() => setDrawerOpen(false)}
    //                     style={{
    //                         position: 'absolute',
    //                         right: '0',
    //                     }}
    //                 >
    //                     <CloseIcon />
    //                 </IconButton>
    //             </Tabs>
    //             <TabPanel value={value} index={0}>
    //                 <div className={styles.hamburgerList} role="presentation">
    //                     <List>
    //                         {data && !vesMenu && data.categoryList[0] ? (
    //                             <CategoryList loading={loading} data={data} error={error} toggleDrawer={setDrawerOpen} />
    //                         ) : (
    //                             <VesMenuCategoryList
    //                                 loading={loadingVesMenu}
    //                                 data={dataVesMenu}
    //                                 error={errorVesMenu}
    //                                 storeConfig={storeConfig}
    //                                 toggleDrawer={setDrawerOpen}
    //                             />
    //                         )}
    //                     </List>
    //                 </div>
    //             </TabPanel>
    //             <TabPanel value={value} index={1}>
    //                 <div className={styles.hamburgerList} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
    //                     <List>
    //                         <ListItem button divider onClick={() => router.push('/confirmpayment')}>
    //                             <ListItemText
    //                                 primary={
    //                                     <Typography variant="label" size="14" letter="uppercase" type="bold">
    //                                         Confirm Payment
    //                                     </Typography>
    //                                 }
    //                             />
    //                         </ListItem>
    //                         <ListItem button divider onClick={() => router.push('/sales/order/track')}>
    //                             <ListItemText
    //                                 primary={
    //                                     <Typography variant="label" size="14" letter="uppercase" type="bold">
    //                                         Track Order
    //                                     </Typography>
    //                                 }
    //                             />
    //                         </ListItem>
    //                         {isLogin ? (
    //                             <ListItem button divider onClick={() => router.push('/customer/account')}>
    //                                 <ListItemText
    //                                     primary={
    //                                         <Typography variant="label" size="14" letter="uppercase" type="bold">
    //                                             Account Dashboard
    //                                         </Typography>
    //                                     }
    //                                 />
    //                             </ListItem>
    //                         ) : (
    //                             <>
    //                                 <ListItem button divider onClick={() => router.push('/customer/account/create')}>
    //                                     <ListItemText
    //                                         primary={
    //                                             <Typography variant="label" size="14" letter="uppercase" type="bold">
    //                                                 Create an Account
    //                                             </Typography>
    //                                         }
    //                                     />
    //                                 </ListItem>
    //                                 <ListItem button divider onClick={() => router.push('/customer/account/login')}>
    //                                     <ListItemText
    //                                         primary={
    //                                             <Typography variant="label" size="14" letter="uppercase" type="bold">
    //                                                 Sign In
    //                                             </Typography>
    //                                         }
    //                                     />
    //                                 </ListItem>
    //                             </>
    //                         )}
    //                     </List>
    //                 </div>
    //             </TabPanel>
    //             <style jsx global>
    //                 {`
    //                     div[id^='simple-tabpanel-'] .MuiBox-root {
    //                         padding-top: 0rem !important;
    //                         margin-top: -1rem;
    //                     }

//                     div[role='tablist'] {
//                         min-height: 4rem;
//                     }

//                     button[id^='simple-tab-'] {
//                         padding: 1rem !important;
//                     }
//                 `}
//             </style>
//         </SwipeableDrawer>
//         <Toolbar />
//     </>
// );
;

export default BurgerV2;
