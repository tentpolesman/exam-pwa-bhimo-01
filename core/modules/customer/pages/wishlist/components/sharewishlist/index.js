/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import classNames from 'classnames';
import TextField from '@common_textfield';

const ShareWishlistView = (props) => {
    const {
        open, setOpen, handleShareWishlist, t, shareLoading,
    } = props;
    const [emailCollection, setEmailCollection] = React.useState('');
    const [message, setMessage] = React.useState('');
    const handleSetEmail = (event) => {
        setEmailCollection(event.target.value);
    };
    const handleSetMessage = (event) => {
        setMessage(event.target.value);
    };
    const setShareWishlist = async () => {
        const response = await handleShareWishlist(emailCollection, message);
        if (response === 1) {
            setOpen();
        }
    };
    return null;
    // return (
    //     <Dialog
    //         open={open}
    //         TransitionComponent={Transition}
    //         onClose={setOpen}
    //         maxWidth="sm"
    //         fullWidth={!!isDesktop}
    //         fullScreen={!isDesktop}
    //     >
    //         <div>
    //             <DialogContent dividers>
    //                 <div className={classNames('md:basis-full', styles.container)}>
    //                     <IconButton
    //                         style={{
    //                             position: 'absolute',
    //                             right: 5,
    //                             top: 0,
    //                         }}
    //                         edge="start"
    //                         onClick={setOpen}
    //                         aria-label="close"
    //                     >
    //                         <CloseIcon />
    //                     </IconButton>
    //                     <Typography variant="h5" type="bold" letter="uppercase" style={{ marginLeft: 0, marginBottom: 35 }}>
    //                         {t('customer:wishlist:wishlistSharing')}
    //                     </Typography>
    //                     <Typography variant="h7" type="bold" letter="uppercase" style={{ margin: 0 }}>
    //                         {t('customer:wishlist:sharingInformation')}
    //                     </Typography>
    //                     <Divider style={{ marginBottom: 20 }} />
    //                     <div className={styles.wrapperText}>
    //                         <TextField
    //                             label={t('customer:wishlist:labelEmail')}
    //                             value={emailCollection}
    //                             onChange={handleSetEmail}
    //                             multiline
    //                             rows={5}
    //                             error={false}
    //                         />
    //                     </div>
    //                     <div className={styles.wrapperText}>
    //                         <TextField
    //                             label={t('customer:wishlist:message')}
    //                             value={message}
    //                             onChange={handleSetMessage}
    //                             multiline
    //                             rows={5}
    //                             error={false}
    //                         />
    //                     </div>
    //                     <div>
    //                         <Button
    //                             onClick={() => setShareWishlist()}
    //                             className={styles.btnWishlist}
    //                             loading={shareLoading}
    //                             align="left"
    //                         >
    //                             <Typography variant="span" type="bold" letter="uppercase" color="white">
    //                                 {t('customer:wishlist:shareWishlist')}
    //                             </Typography>
    //                         </Button>
    //                     </div>
    //                 </div>
    //             </DialogContent>
    //         </div>
    //     </Dialog>
    // );
};

const ShareWishlistComponent = (props) => (
    <ShareWishlistView
        {...props}
    />
);

export default ShareWishlistComponent;
