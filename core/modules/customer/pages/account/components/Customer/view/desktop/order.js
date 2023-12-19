/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import { useReactiveVar } from '@apollo/client';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { currencyVar } from '@root/core/services/graphql/cache';
import Cookies from 'js-cookie';
import Link from 'next/link';

import cx from 'classnames';

import Button from '@common_button';
import Typography from '@common_typography';

const OrderView = (props) => {
    const {
        customerOrders, styles, t, reOrder,
    } = props;

    // cache currency
    const currencyCache = useReactiveVar(currencyVar);

    const customerData = Cookies.get('cdt') && JSON.parse(Cookies.get('cdt'));
    const currencyData = Cookies.get('app_currency') && JSON.parse(Cookies.get('app_currency'));
    return (
        <div className={cx('pt-10')}>
            <div className={cx('address-title-section', 'pb-[18px]', 'border-b-[1.5px]', 'border-neutral-200', 'flex', 'flex-row')}>
                <Typography variant="h3" className={cx('mobile:max-desktop:hidden', 'pl-0')}>
                    {t('customer:order:recentOrder')}
                </Typography>
                <Button link="/sales/order/history" variant="plain" className={cx('pl-6', '!py-0')}>
                    <Typography variant="bd-2a" className={cx('!text-neutral-500', 'underline', 'underline-offset-2')}>
                        {t('customer:menu:viewall')}
                    </Typography>
                </Button>
            </div>
            {/* <h2 className={styles.infoTitle}>
                {t('customer:order:recentOrder')}
                <Link href="/sales/order/history" className={styles.desktopLinkHeader}>
                    {t('customer:menu:viewall')}
                </Link>
            </h2> */}
            <hr />
            <div className="flex flex-row">
                <div className="lg:basis-full">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('customer:order:order')} #</TableCell>
                                    <TableCell>{t('customer:order:date')}</TableCell>
                                    <TableCell>{t('customer:order:shippedTo')}</TableCell>
                                    <TableCell>{t('customer:order:orderTotal')}</TableCell>
                                    <TableCell>{t('customer:order:status')}</TableCell>
                                    <TableCell>{t('customer:order:action')}</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customerOrders.items && customerOrders.items.length > 0 ? (
                                    <>
                                        {customerOrders.items.map((val, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell component="td" scope="row">
                                                    {val.order_number}
                                                </TableCell>
                                                <TableCell component="td" scope="row">
                                                    {formatDate(val.created_at)}
                                                </TableCell>
                                                <TableCell component="td" scope="row">
                                                    {val.detail[0].shipping_address !== null
                                                        ? val.detail[0].shipping_address.firstname
                                                        : customerData.firstname}{' '}
                                                    {val.detail[0].shipping_address !== null
                                                        ? val.detail[0].shipping_address.lastname
                                                        : customerData.lastname}
                                                </TableCell>
                                                <TableCell component="td" scope="row">
                                                    {formatPrice(
                                                        val.grand_total,
                                                        val.detail[0].global_currency_code
                                                            ? val.detail[0].global_currency_code
                                                            : currencyData.default_display_currency_code,
                                                        currencyCache,
                                                    )}
                                                </TableCell>
                                                <TableCell component="td" scope="row">
                                                    {val.status_label}
                                                </TableCell>
                                                <TableCell component="td" scope="row">
                                                    <Link href={`/sales/order/view/order_id/${val.order_number}`} className={styles.desktopLink}>
                                                        Detail
                                                    </Link>
                                                    <button type="button" className={styles.reorderButton} onClick={() => reOrder(val.order_number)}>
                                                        <a className={styles.desktopLink}>Reorder</a>
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                ) : null}
                                {customerOrders.items && customerOrders.items.length === 0 ? (
                                    <TableRow>
                                        <TableCell component="td" colSpan="6">
                                            {t('customer:notHaveOrder')}
                                        </TableCell>
                                    </TableRow>
                                ) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default OrderView;
