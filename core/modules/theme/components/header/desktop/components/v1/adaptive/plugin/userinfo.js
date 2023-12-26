/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import Link from 'next/link';

import cx from 'classnames';

import Popover from '@common_popover';
import Typography from '@common_typography';

import UserIcon from '@heroicons/react/24/solid/UserIcon';

const UserInfo = (props) => {
    const { t, isLogin, customer, open, setOpen, PopoverContent } = props;

    return (
        <>
            {isLogin ? (
                <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                    <Popover
                        content={<PopoverContent />}
                        open={open}
                        setOpen={setOpen}
                        className={cx('w-[160px]', 'top-[99%]', 'left-[0%]')}
                        contentClassName={cx('rounded-sm')}
                    >
                        <div className="popover-children">
                            <UserIcon className={cx('w-[24px]', 'text-neutral-600', 'inline-block', 'ml-1')} />
                            {customer && customer.firstname && (
                                <Typography variant="bd-2b" className={cx('inline-block', 'pl-2', '!text-primary-700')}>
                                    {customer.firstname.length <= 12 ? `${customer.firstname}` : `${customer.firstname.substring(0, 10)}...`}
                                </Typography>
                            )}
                        </div>
                    </Popover>
                </div>
            ) : (
                <Link href="/customer/account/login">
                    <UserIcon
                        className={cx(
                            'w-[24px]',
                            'text-neutral-600',
                            'hover:text-primary-700',
                            'inline-block',
                            'ml-1',
                            'group-hover:text-primary-700',
                        )}
                    />
                    <Typography variant="bd-2b" className={cx('inline-block', 'pl-2', 'hover:text-primary-700', 'group-hover:text-primary-700')}>
                        {t('common:menu:sign')}/{t('common:menu:register')}
                    </Typography>
                </Link>
            )}
        </>
    );
};

export default UserInfo;
