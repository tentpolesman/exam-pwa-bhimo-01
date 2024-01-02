/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import Button from '@common_button';
import Radio from '@common_forms/Radio';
import Typography from '@common_typography';
import AddressFormDialog from '@plugin_addressform';

import cx from 'classnames';

const ItemAddress = (props) => {
    const {
        addressId,
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = '',
        region = '',
        city = '',
        telephone = '',
        value = '',
        checked = false,
        handleAddress,
        loadingAddress,
        success,
        t,
        selectedAddressId,
        handleChange,
    } = props;

    const [open, setOpen] = useState(false);
    React.useEffect(() => {
        if (open && success) {
            setOpen(false);
        }
    }, [loadingAddress]);

    return (
        <div className={cx('py-2')}>
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => setOpen(!open)}
                pageTitle={t('customer:address:editTitle')}
            />
            <div
                className={cx('flex', 'flex-row', 'shadow-sm', 'p-4', 'justify-start', 'rounded-lg', 'gap-x-4', 'border-[1px]', 'border-neutral-300')}
            >
                <div className={cx('flex', 'justify-center', 'items-center', 'basis-1/12')}>
                    <Radio
                        color="default"
                        size="sm"
                        variant="single"
                        value={addressId}
                        checked={!loadingAddress && checked && addressId === selectedAddressId}
                        onClick={handleChange}
                        id={`${addressId}_${value}`.replace(/ /g, '_')}
                        className={cx('text-center')}
                        classNames={{
                            radioClasses: cx('cursor-pointer', '!mr-0', {
                                'border-[3px] border-primary': addressId === selectedAddressId,
                            }),
                        }}
                    />
                </div>
                <div>
                    {country.id === 'ID' ? (
                        <div className={cx('flex', 'flex-col', 'gap-y-0', 'pb-4')}>
                            <p>{`${firstname} ${lastname}`}</p>
                            <p>{`${city.split(', ')[0]}`}</p>
                            <p>{`${street},`}</p>
                            <p>{`Kec. ${city.split(', ')[1]}, Kel. ${city.split(', ')[2]}`}</p>
                            <p>{`${city.split(', ')[0]} ${postcode}`}</p>
                            <p>{`${region}, ${country.full_name_locale || ''}`}</p>
                            <p>{`T: ${telephone}`}</p>
                        </div>
                    ) : (
                        <div className={cx('flex', 'flex-col', 'gap-y-0', 'pb-4')}>
                            <p>{`${firstname} ${lastname}`}</p>
                            <p>{`${city.split(', ')[0]},`}</p>
                            <p>{`${street}`}</p>
                            <p>{`${city}, ${region},`}</p>
                            <p>{`${country.full_name_locale || ''}, ${postcode},`}</p>
                            <p>{`T: ${telephone}`}</p>
                        </div>
                    )}
                    <Button variant="plain" className={cx('pl-0', '!py-0')} onClick={() => setOpen(true)}>
                        <Typography className={cx('underline', 'underline-offset-2', 'cursor-pointer')}>
                            {t('customer:address:editAddress')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ItemAddress;
