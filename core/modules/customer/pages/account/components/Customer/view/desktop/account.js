/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unescaped-entities */
import cx from 'classnames';

import Button from '@common_button';
import Typography from '@common_typography';

const AddressView = ({ customer, t }) => (
    <>
        <Typography variant="h3" className={cx('mobile:max-desktop:hidden', 'pl-0', 'pb-[18px]', 'border-b-[1.5px]', 'border-neutral-200')}>
            {t('customer:menu:accountInformation')}
        </Typography>
        <div className={cx('flex', 'flex-row', 'pt-[18px]', 'gap-x-5')}>
            <div className={cx('sm:basis-1/2', 'lg:basis-1/2', 'border-[1px]', 'border-neutral-200', 'rounded-md', 'pl-5', 'py-5')}>
                <Typography variant="bd-1a">{t('customer:menu:contactInformation')}</Typography>
                <p className={cx('pt-5')}>
                    <Typography className={cx('block', 'font-normal')}>
                        {customer.firstname} {customer.lastname}
                    </Typography>
                    <Typography className={cx('block', 'pt-3', 'font-normal')}>{customer.email}</Typography>
                    <div className={cx('account-action', 'pt-5', 'grid', 'grid-cols-[2fr_10fr]')}>
                        <div className={cx('account-action-btn', 'border-r-[1px]', 'border-neutral-700')}>
                            <Button link="/customer/account/profile" variant="plain" className={cx('pl-0', '!py-0')}>
                                <Typography variant="bd-2a" className={cx('!text-primary-700')}>
                                    {t('common:button:change')}
                                </Typography>
                            </Button>
                        </div>
                        <div className={cx('account-action-btn')}>
                            <Button link="/customer/account/profile" variant="plain" className={cx('pl-6', '!py-0')}>
                                <Typography variant="bd-2a" className={cx('!text-primary-700')}>
                                    {t('customer:newPassword:title')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </p>
            </div>
            <div className={cx('sm:basis-1/2', 'lg:basis-1/2', 'border-[1px]', 'border-neutral-200', 'rounded-md', 'pl-5', 'py-5')}>
                <Typography variant="bd-1a">{t('customer:menu:newsletter')}</Typography>
                <p className={cx('pt-5')}>
                    <Typography className={cx('block', 'font-normal')}>
                        {customer.is_subscribed ? t('customer:menu:subcription') : t('customer:menu:noSubcription')}
                    </Typography>
                    <div className={cx('account-action', 'pt-5', 'grid', 'grid-cols-[2fr_10fr]')}>
                        <div className={cx('newsletter-action-btn')}>
                            <Button link="/customer/newsletter" variant="plain" className={cx('pl-0', '!py-0')}>
                                <Typography variant="bd-2a" className={cx('!text-primary-700')}>
                                    {t('common:button:change')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </p>
            </div>
        </div>
    </>
);

export default AddressView;
