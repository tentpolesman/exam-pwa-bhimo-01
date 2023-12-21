import Dialog from '@common_dialog';
import useStyles from '@core_modules/customer/pages/address/components/style';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import AddressFormDialog from '@plugin_addressform';
import React, { useState } from 'react';

import cx from 'classnames';

const TableAddress = (props) => {
    const {
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
        removeAddress,
        addressId,
        idx,
    } = props;
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    React.useEffect(() => {
        if (open && success) {
            setOpen(false);
        }
    }, [loadingAddress]);
    const styles = useStyles();
    const handleRemoveAddress = () => {
        removeAddress(addressId);
        setOpenDelete(true);
    };
    return (
        <>
            <Dialog
                open={openDelete}
                handleCancel={() => setOpenDelete(!openDelete)}
                handleYes={handleRemoveAddress}
                message={t('customer:address:warningDelete')}
            />
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => setOpen(!open)}
                pageTitle={t('customer:address:editTitle')}
            />
            <tr
                className={cx({
                    'bg-white': idx % 2 === 1,
                    'bg-neutral-50': idx % 2 !== 1,
                })}
            >
                <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-2')}>
                    <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                        <FormControlLabel
                            className={[styles.address_shipping].join(' ')}
                            value={value}
                            checked={checked}
                            control={<Radio color="primary" size="small" />}
                            label=""
                            labelPlacement="end"
                        />
                    </RadioGroup>
                </td>
                <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-2')}>{firstname}</td>
                <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-2')}>{lastname}</td>
                <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-2')}>
                    {country.id === 'ID' ? (
                        <>
                            <p>{`${street},`}</p>
                            <p>{`Kec. ${city.split(', ')[1]}`}</p>
                            <p>{`Kel. ${city.split(', ')[2]}`}</p>
                            <p>{`${city.split(', ')[0]}`}</p>
                            <p>{`${postcode}`}</p>
                            <p>{`${region}`}</p>
                            <p>{`${country.full_name_locale || ''}`}</p>
                        </>
                    ) : (
                        <>
                            <p>{`${city.split(', ')[0]},`}</p>
                            <p>{`${street}`}</p>
                            <p>{`${city}, ${region},`}</p>
                            <p>{`${country.full_name_locale || ''}, ${postcode},`}</p>
                        </>
                    )}
                </td>
                <td className={cx('text-neutral-700', 'text-md', 'font-normal', 'leading-2lg', 'p-2')}>{telephone}</td>
                {selectedAddressId !== addressId ? (
                    <>
                        <td>
                            <button type="button" onClick={() => setOpen(!open)}>
                                <a className={cx('text-md', 'px-4', 'hover:text-primary-700', 'underline', 'underline-offset-2')}>
                                    {t('customer:address:editAddress')}
                                </a>
                            </button>
                        </td>
                        <td>
                            {selectedAddressId !== addressId && (
                                <button type="button" onClick={() => setOpenDelete(true)}>
                                    <a className={cx('text-md', 'px-4', 'hover:text-primary-700', 'underline', 'underline-offset-2')}>
                                        {t('customer:address:removeTitle')}
                                    </a>
                                </button>
                            )}
                        </td>
                    </>
                ) : (
                    <>
                        <td>
                            <button type="button" onClick={() => setOpen(!open)}>
                                <a className={cx('text-md', 'px-4', 'hover:text-primary-700', 'underline', 'underline-offset-2')}>
                                    {t('customer:address:editAddress')}
                                </a>
                            </button>
                        </td>
                        <td />
                    </>
                )}
            </tr>
        </>
    );
};

export default TableAddress;
