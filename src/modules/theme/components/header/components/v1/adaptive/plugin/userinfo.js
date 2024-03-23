/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import Link from 'next/link';
import cx from 'classnames';
import Popover from '@common_popover';
import Typography from '@common_typography';
import UserCircle from '@heroicons/react/24/outline/UserCircleIcon';
import Show from '@common_show';
import Skeleton from '@common_skeleton';

const UserInfo = (props) => {
    const { t, isLogin, customer, open, setOpen, PopoverContent, withLabel = true, withUsername = true } = props;

    return (
        <>
            {isLogin ? (
                <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className={cx('myaccount-menu')}>
                    <Popover
                        content={<PopoverContent />}
                        open={open}
                        setOpen={setOpen}
                        className={cx('w-[160px]', 'top-[99%]', 'left-[0%]')}
                        contentClassName={cx('rounded-sm')}
                    >
                        <div className="popover-children flex flex-row">
                            <div>
                                <UserCircle className={cx('w-[18px]', 'text-neutral-400', 'inline-block')} />
                            </div>
                            <Show when={customer?.firstname && withUsername}>
                                <Typography variant="bd-2b" className={cx('inline-block', 'pl-2', '!text-primary-700')}>
                                    {customer?.firstname?.length <= 15 ? `${customer?.firstname}` : `${customer?.firstname?.substring(0, 15)}...`}
                                </Typography>
                            </Show>
                            <Show when={!customer?.firstname}>
                                <div className={cx('ml-[10px]')}>
                                    <Skeleton height={24} width={70} />
                                </div>
                            </Show>
                        </div>
                    </Popover>
                </div>
            ) : (
                <Link href="/customer/account/login" className={cx('swift-login-register-link flex')}>
                    <UserCircle
                        className={cx(
                            'w-[18px]',
                            'text-neutral-400',
                            'hover:text-primary-700',
                            'inline-block',
                            'group-hover:text-neutral-700',
                        )}
                    />
                    <Show when={withLabel}>
                        <Typography variant="bd-2b" className={cx('inline-block', 'pl-2', 'hover:text-primary-700', 'group-hover:text-primary-700')}>
                            {t('common:menu:sign')}/{t('common:menu:register')}
                        </Typography>
                    </Show>
                </Link>
            )}
        </>
    );
};

export default UserInfo;
