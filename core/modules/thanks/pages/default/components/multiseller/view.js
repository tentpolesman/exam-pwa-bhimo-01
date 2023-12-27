/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import Button from '@common_button';
import Typography from '@common_typography';
import cx from 'classnames';
import Link from 'next/link';
import propTypes from 'prop-types';
import { GRAY_PRIMARY } from '@theme_color';

const ViewThanksMultiSeller = (props) => {
    const {
        t,
        isLogin,
        handleContinue,
        customerOrder,
    } = props;

    return null;
    // return (
    //     <div className={cx(styles.container, 'thanks-pages')}>
    //         <div className={styles.info}>
    //             <Typography variant="h1" type="bold" letter="uppercase" className={styles.title}>
    //                 {t('thanks:thanks')}
    //             </Typography>
    //             <Typography variant="span" className="clear-margin-padding" letter="none">
    //                 {t('thanks:placeInfo')}
    //             </Typography>
    //         </div>
    //         <TableContainer component={Paper} className={styles.table}>
    //             <Table aria-label="customized table">
    //                 <TableHead>
    //                     <TableRow>
    //                         <StyledTableCell>{`${t('thanks:seller')}`}</StyledTableCell>
    //                         <StyledTableCell align="right">Order ID</StyledTableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                     {customerOrder
    //                         && customerOrder.length > 0
    //                         && customerOrder.map((item, key) => (
    //                             <TableRow key={key}>
    //                                 <StyledTableCell component="th" scope="row">
    //                                     {item.seller_name && `${item.seller_name}`}
    //                                     {item.seller_city && ` - ${item.seller_city}`}
    //                                 </StyledTableCell>
    //                                 <StyledTableCell align="right">
    //                                     {isLogin && isLogin == 1 ? (
    //                                         (
    //                                             <Link href={`/sales/order/view/order_id/${item?.order_number}`} passhref>

    //                                                 <b>{`#${item?.order_number}`}</b>

    //                                             </Link>
    //                                         )
    //                                     ) : (
    //                                         <b>{`#${item?.order_number}`}</b>
    //                                     )}
    //                                 </StyledTableCell>
    //                             </TableRow>
    //                         ))}
    //                 </TableBody>
    //             </Table>
    //         </TableContainer>
    //         <Link href="/sales/order/history" passHref legacyBehavior>
    //             <Typography size="10" type="bold" color="primary" letter="uppercase" className={styles.txtConfirmMultiseller}>
    //                 {t('thanks:orderInfo')}
    //             </Typography>
    //         </Link>
    //         <Button onClick={handleContinue} className={styles.btnConfirmMultiseller} endIcon={<IconArrow className={styles.btnConfirmIcon} />}>
    //             <Typography size="10" type="bold" color="white" letter="uppercase" className={styles.txtConfirm}>
    //                 {t('thanks:continue')}
    //             </Typography>
    //         </Button>
    //     </div>
    // );
};

ViewThanksMultiSeller.propTypes = {
    storeConfig: propTypes.object.isRequired,
    checkoutData: propTypes.object.isRequired,
    t: propTypes.func.isRequired,
    customerOrder: propTypes.array.isRequired,
};

export default ViewThanksMultiSeller;
