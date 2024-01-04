/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
// Library
import Button from '@common_button';
import Skeleton from '@common_skeleton';
import Typography from '@common_typography';

import { SkeletonMobile, SkeletonTable } from '@core_modules/customer/pages/address/components/skeleton';

import Layout from '@layout_customer';
import AddressFormDialog from '@plugin_addressform';

import dynamic from 'next/dynamic';

import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

import cx from 'classnames';

const ItemMobile = dynamic(() => import('@core_modules/customer/pages/address/components/ItemMobile'), { ssr: false });
const TableAddress = dynamic(() => import('@core_modules/customer/pages/address/components/table'), { ssr: false });

// Main Render Page
const Content = (props) => {
    const {
        // prettier-ignore
        loading,
        address,
        selectedAddressId,
        handleOpenNew,
        handleAddress,
        loadingAddress,
        success,
        openNew,
        setOpenDialogNew,
        t,
        handleChange,
        removeAddress,
    } = props;

    return (
        <Layout {...props}>
            <div className={cx('flex', 'flex-col', 'w-full', 'h-full', 'text-base', 'pt-5', 'px-4')}>
                <div className={cx('desktop:hidden')}>
                    {loading ? (
                        <SkeletonMobile />
                    ) : (
                        <>
                            {address && address.length > 0 ? (
                                <>
                                    {address.map((item, index) => (
                                        <ItemMobile
                                            {...item}
                                            first={index === 0}
                                            handleAddress={handleAddress}
                                            checked={item.id === selectedAddressId}
                                            key={item.id}
                                            addressId={item.id}
                                            firstname={item.firstname}
                                            lastname={item.lastname}
                                            telephone={item.telephone}
                                            postcode={item.postcode}
                                            region={item.region.region}
                                            city={item.city}
                                            country={{
                                                id: item.country.code,
                                                full_name_locale: item.country.label,
                                            }}
                                            street={item.street.join(' ')}
                                            value={item.id}
                                            defaultBilling={item.default_billing}
                                            defaultShipping={item.default_shipping}
                                            loadingAddress={loadingAddress}
                                            success={success}
                                            handleChange={handleChange}
                                            selectedAddressId={selectedAddressId}
                                            t={t}
                                        />
                                    ))}
                                </>
                            ) : (
                                <Button
                                    icon={<ExclamationTriangleIcon />}
                                    iconPosition="left"
                                    className={cx(
                                        'w-full',
                                        'bg-yellow-500',
                                        'hover:bg-yellow-500',
                                        'focus:bg-yellow-500',
                                        'active:bg-yellow-500',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'cursor-auto',
                                        'hover:cursor-auto',
                                        'focus:cursor-auto',
                                        'active:cursor-auto',
                                    )}
                                >
                                    <Typography className={cx('!text-neutral-white')}>{t('customer:address:emptyMessage')}</Typography>
                                </Button>
                            )}
                        </>
                    )}
                </div>
                <div className={cx('relative', 'overflow-x-auto', 'rounded-lg', 'mobile:max-desktop:hidden')}>
                    <table className={cx('w-full', 'text-base', 'border-[1px]', 'border-neutral-100')}>
                        <thead>
                            <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left')}>
                                <th className={cx('px-4', 'py-3')}>Default</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:address:firstname')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:address:lastname')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:address:street')}</th>
                                <th className={cx('px-4', 'py-3')}>{t('customer:address:phone')}</th>
                                <th colSpan="2" className={cx('px-4', 'py-3')}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {loading ? (
                            <div className={cx('mobile:max-desktop:hidden')}>
                                <SkeletonTable />
                            </div>
                        ) : (
                            <tbody>
                                {address && address.length > 0 ? (
                                    <>
                                        {address.map((item, index) => (
                                            <TableAddress
                                                {...item}
                                                handleAddress={handleAddress}
                                                removeAddress={removeAddress}
                                                checked={item.id == selectedAddressId}
                                                key={item.id}
                                                addressId={item.id}
                                                firstname={item.firstname}
                                                lastname={item.lastname}
                                                telephone={item.telephone}
                                                postcode={item.postcode}
                                                region={item.region.region}
                                                city={item.city}
                                                country={{
                                                    id: item.country.code,
                                                    full_name_locale: item.country.label,
                                                }}
                                                street={item.street.join(' ')}
                                                value={item.id}
                                                defaultBilling={item.default_billing}
                                                defaultShipping={item.default_shipping}
                                                loadingAddress={loadingAddress}
                                                success={success}
                                                handleChange={handleChange}
                                                selectedAddressId={selectedAddressId}
                                                t={t}
                                                idx={index}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={6}>
                                            <Button
                                                icon={<ExclamationTriangleIcon />}
                                                iconPosition="left"
                                                className={cx(
                                                    'w-full',
                                                    'bg-yellow-500',
                                                    'hover:bg-yellow-500',
                                                    'focus:bg-yellow-500',
                                                    'active:bg-yellow-500',
                                                    'hover:shadow-none',
                                                    'focus:shadow-none',
                                                    'active:shadow-none',
                                                    'cursor-auto',
                                                    'hover:cursor-auto',
                                                    'focus:cursor-auto',
                                                    'active:cursor-auto',
                                                )}
                                            >
                                                <Typography className={cx('!text-neutral-white')}>{t('customer:address:emptyMessage')}</Typography>
                                            </Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        )}
                    </table>
                </div>
                <div className={cx('pt-4')}>
                    {loading ? (
                        <div className={cx('px-4')}>
                            <Skeleton height={24} width={124} />
                        </div>
                    ) : (
                        <Button icon={<PlusIcon />} iconPosition="right" onClick={() => setOpenDialogNew(true)}>
                            <Typography className={cx('!text-neutral-white')}>{t('customer:address:addTitle')}</Typography>
                        </Button>
                    )}
                </div>
                <AddressFormDialog
                    {...props}
                    onSubmitAddress={(data, type) => {
                        handleAddress(data, type);
                    }}
                    loading={loadingAddress}
                    success={success}
                    open={openNew}
                    setOpen={() => handleOpenNew(!openNew)}
                />
            </div>
        </Layout>
    );
};

export default Content;
