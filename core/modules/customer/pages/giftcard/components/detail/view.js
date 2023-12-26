/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Header from '@common_headermobile';
import Typography from '@common_typography';
import { debuging } from '@config';
import { formatPrice } from '@helper_currency';
import Loader from '@core_modules/customer/pages/giftcard/components/skeleton';

const DetailView = (props) => {
    const {
        t, loading, error, data, open, close, storeConfig, code, currencyCache,
    } = props;
    if (error) {
        return (
            <div className="m-15" severity="error">
                {debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
            </div>
        );
    }
    let detail;
    return null;
    // if (loading || !data) detail = () => (<Loader />);
    // if (data) {
    //     detail = () => (
    //         <List>
    //             {
    //                 Object.keys(data.giftCardAccount).map((item) => {
    //                     if (item !== '__typename' && data.giftCardAccount[item] !== '' && data.giftCardAccount[item] !== null) {
    //                         return (
    //                             <ListItem key={item}>
    //                                 <ListItemText primary={(
    //                                     <Typography letter="capitalize">
    //                                         {
    //                                             item.split('_').map((text) => (`${text} `))
    //                                         }
    //                                     </Typography>
    //                                 )}
    //                                 />
    //                                 <ListItemSecondaryAction>
    //                                     <Typography variant="span" type="bold">
    //                                         {
    //                                             // eslint-disable-next-line no-restricted-globals
    //                                             isNaN(data.giftCardAccount[item]) ? data.giftCardAccount[item]
    //                                                 : formatPrice(data.giftCardAccount[item], storeConfig.base_currency_code, currencyCache)
    //                                         }
    //                                     </Typography>
    //                                 </ListItemSecondaryAction>
    //                             </ListItem>
    //                         );
    //                     }
    //                     return null;
    //                 })
    //             }
    //         </List>
    //     );
    // }
    // return (
    //     <Dialog open={open} onClose={close} fullWidth maxWidth="md">
    //         <DialogTitle>
    //             <Header
    //                 LeftComponent={{
    //                     onClick: close,
    //                 }}
    //                 pageConfig={{
    //                     headerTitle: `Detail gift card code: ${code}`,
    //                     headerBackIcon: 'close',
    //                     header: 'relative',
    //                 }}
    //             />
    //         </DialogTitle>
    //         <DialogContent>
    //             {detail()}
    //         </DialogContent>
    //     </Dialog>
    // );
};

export default DetailView;
