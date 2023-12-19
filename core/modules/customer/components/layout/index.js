/* eslint-disable no-plusplus */
import Typography from '@common_typography';
import { modules } from '@config';
import useStyles from '@layout_customer/style';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = (props) => {
    const {
        children, t, title, activeMenu, storeConfig,
    } = props;
    const pushIf = (condition, ...elements) => (condition ? elements : []);
    const styles = useStyles();
    const router = useRouter();
    let titlePage = '';

    const menu = [
        { href: '/customer/account', title: t('customer:menu:myAccount') },
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        { href: '/inboxnotification/notification', title: t('customer:menu:notification') },
        { href: '/customer/account/address', title: t('customer:menu:address') },
        { href: '/customer/account/profile', title: t('customer:menu:accountInformation') },
        ...pushIf(modules.wishlist.enabled, {
            href: '/wishlist',
            title: t('customer:menu:wishlist'),
        }),
        {
            href: storeConfig && storeConfig.OmsRma.enable_oms_rma ? storeConfig.OmsRma.oms_rma_link : '/rma/customer',
            title: t('customer:menu:return'),
        },
        ...pushIf(modules.storecredit.enabled, {
            href: '/customer/account/storecredit',
            title: t('customer:menu:storeCredit'),
        }),
        { href: '/sales/downloadable/history', title: t('customer:menu:myDownload') },
        ...pushIf(modules.productreview.enabled, {
            href: '/review/customer',
            title: t('customer:menu:myProductReview'),
        }),
        ...pushIf(modules.giftcard.enabled, {
            href: '/awgiftcard/card',
            title: 'Gift Card',
        }),
        ...pushIf(modules.rewardpoint.enabled, {
            href: '/aw_rewardpoints/info',
            title: t('customer:menu:rewardPoint'),
        }),
        ...pushIf(modules.notification.enabled, {
            href: '/inboxnotification/notification',
            title: t('customer:menu:notification'),
        }),
        { href: '/customer/newsletter', title: t('customer:setting:newsletter') },
    ];
    for (let index = 0; index < menu.length; index++) {
        const item = menu[index];
        if (item.href === router.asPath) {
            titlePage = item.title;
        }
    }
    return (
        <div className="flex flex-row desktop:gap-x-[18px]">
            <div className={cx('md:basis-2/12', 'xs:basis-full', 'mobile:max-desktop:hidden')}>
                <div className={styles.listMenuContainer}>
                    <ul className={styles.listMenu}>
                        {menu.map((val, idx) => (
                            <li
                                key={idx}
                                className={
                                    router.asPath === val.href || val.href === activeMenu
                                        ? cx(styles.listMenuItem, styles.listMenuItemActive)
                                        : styles.listMenuItem
                                }
                            >
                                <Link href={val.href}>{val.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="md:basis-10/12 xs:basis-full sm:basis-full">
                <Typography variant="h2" type="bold" letter="capitalize" className={cx('mobile:max-desktop:hidden', 'pl-0')}>
                    {title || titlePage}
                </Typography>
                {children}
            </div>
        </div>
    );
};

export default Layout;
