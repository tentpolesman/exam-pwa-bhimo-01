/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import cx from 'classnames';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import Button from '@common_button';
import Typography from '@common_typography';

const SwitcherLanguage = dynamic(() => import('@core_modules/theme/components/header/desktop/components/burgermenu/account/plugins/language/index'), {
    ssr: false,
});
const SwitcherCurrency = dynamic(() => import('@core_modules/theme/components/header/desktop/components/burgermenu/account/plugins/currency/index'), {
    ssr: false,
});

const BurgerMenuAccount = (props) => {
    const { isLogin, handleLogout } = props;

    const [switcherContentActive, setSwitcherContentActive] = React.useState(false);
    const [SwitcherContent, setSwitcherContent] = React.useState(null);

    return (
        <>
            {!switcherContentActive && (
                <>
                    {isLogin ? (
                        <div className={cx('p-4')}>
                            <div className={cx('grid', 'grid-cols-1', 'gap-y-4', 'pb-4', 'border-b-[1px]', 'border-neutral-300')}>
                                <Link href="/customer/account" prefetch={false}>
                                    <Typography className={cx('py-[13px]', 'px-4')}>My Account</Typography>
                                </Link>
                                <Link href="/wishlist" prefetch={false}>
                                    <Typography className={cx('py-[13px]', 'px-4')}>My Wishlist</Typography>
                                </Link>
                                <Link href="/catalog/product_compare" prefetch={false}>
                                    <Typography className={cx('py-[13px]', 'px-4')}>Compare Products</Typography>
                                </Link>
                                <Button
                                    className={cx(
                                        '!px-0',
                                        '!py-0',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'active:shadow-none',
                                    )}
                                    onClick={handleLogout}
                                    variant="tertiary"
                                    classNameText={cx('!text-red-500')}
                                >
                                    <Typography className={cx('py-[0]', 'px-4', 'text-red-500')}>Log Out</Typography>
                                </Button>
                            </div>
                            <div className={cx('grid', 'grid-cols-1')}>
                                <SwitcherCurrency
                                    switcherContentActive={switcherContentActive}
                                    setSwitcherContentActive={setSwitcherContentActive}
                                    switcherContent={SwitcherContent}
                                    setSwitcherContent={setSwitcherContent}
                                    {...props}
                                />
                                <SwitcherLanguage
                                    switcherContentActive={switcherContentActive}
                                    setSwitcherContentActive={setSwitcherContentActive}
                                    switcherContent={SwitcherContent}
                                    setSwitcherContent={setSwitcherContent}
                                    {...props}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={cx('p-4')}>
                            <div className={cx('grid', 'grid-cols-1', 'gap-y-4', 'pb-4', 'border-b-[1px]', 'border-neutral-300')}>
                                <Link href="/customer/account/login" prefetch={false}>
                                    <Typography className={cx('py-[13px]', 'px-4')}>Log in / Register</Typography>
                                </Link>
                                <Link href="/catalog/product_compare" prefetch={false}>
                                    <Typography className={cx('py-[13px]', 'px-4')}>Compare Products</Typography>
                                </Link>
                            </div>
                            <div className={cx('grid', 'grid-cols-1')}>
                                <SwitcherCurrency
                                    switcherContentActive={switcherContentActive}
                                    setSwitcherContentActive={setSwitcherContentActive}
                                    switcherContent={SwitcherContent}
                                    setSwitcherContent={setSwitcherContent}
                                    {...props}
                                />
                                <SwitcherLanguage
                                    switcherContentActive={switcherContentActive}
                                    setSwitcherContentActive={setSwitcherContentActive}
                                    switcherContent={SwitcherContent}
                                    setSwitcherContent={setSwitcherContent}
                                    {...props}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
            {switcherContentActive && SwitcherContent && <div className={cx('px-4')}>{React.cloneElement(SwitcherContent)}</div>}
        </>
    );
};

export default BurgerMenuAccount;
