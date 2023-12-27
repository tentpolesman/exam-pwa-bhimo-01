/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Router from 'next/router';
import formatDate from '@helper_date';

const NotificationView = (props) => {
    const { notification, styles, t } = props;
    const handleItemClick = (item) => {
        Router.push({
            pathname: '/inboxnotification/notification/data',
            query: { notif: item.entityId },
        });
    };
    return null;
    // return (
    //     <>
    //         <h2 className={styles.infoTitle}>
    //             {t('customer:menu:notification')}
    //             <Link
    //                 href="/inboxnotification/notification"
    //                 className={styles.desktopLinkHeader}
    //             >
    //                 {t('customer:menu:viewall')}
    //             </Link>
    //         </h2>
    //         <hr />
    //         <div className="flex flex-row notification">
    //             <div className="sm:basis-full lg:basis-full">
    //                 {
    //                     notification && notification.items && notification.totalUnread && notification.totalUnread && (
    //                         <TableContainer component={Paper}>
    //                             <Table aria-label="simple table">
    //                                 <TableBody>
    //                                     {notification.items ? (
    //                                         notification.items.map((val, idx) => {
    //                                             if (val.unread) {
    //                                                 return (
    //                                                     <TableRow
    //                                                         className="notification-list"
    //                                                         key={idx}
    //                                                         onClick={() => handleItemClick(val)}
    //                                                     >
    //                                                         <TableCell>{val.subject}</TableCell>
    //                                                         <TableCell align="right">{formatDate(val.createdAt)}</TableCell>
    //                                                     </TableRow>
    //                                                 );
    //                                             }
    //                                             return null;
    //                                         })

    //                                     ) : null }
    //                                     {!notification.totalUnread || notification.totalUnread === 0
    //                                         ? (
    //                                             <TableRow>
    //                                                 <TableCell align="center" colSpan="2">{t('customer:notHaveNotification')}</TableCell>
    //                                             </TableRow>
    //                                         )
    //                                         : null}
    //                                 </TableBody>
    //                             </Table>
    //                         </TableContainer>
    //                     )
    //                 }

    //             </div>
    //         </div>
    //     </>
    // );
};

export default NotificationView;
