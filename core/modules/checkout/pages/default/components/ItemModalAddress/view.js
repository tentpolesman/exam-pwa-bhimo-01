import Radio from '@common_forms/Radio';
import Typography from '@common_typography';
import React from 'react';
import AddressFormDialog from '@plugin_addressform';

const ItemAddress = (props) => {
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
        loading,
        open,
        setOpen,
        handleSave,
        success,
        t,
        // eslint-disable-next-line no-unused-vars
    } = props;
    return (
        <>
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleSave}
                loading={loading}
                success={success}
                setOpen={() => setOpen(false)}
                pageTitle={t('customer:address:editTitle')}
            />
            <div className="item-modal-address" id="checkoutListItemAddress">
                <div className="text-sm border-b border-b-neutral-400 pb-[15px]">
                    <div
                        className="p-[15px] w-full m-0"
                        value={value}
                        checked={checked}
                        control={<Radio variant="single" color="primary" size="small" />}
                        label={(
                            <>
                                <Typography className="text-sm">
                                    {`${firstname} ${lastname}`}
                                </Typography>
                                <Typography className="text-sm">
                                    {street}
                                    ,
                                </Typography>
                                <Typography className="text-sm">
                                    {city !== '' && `${city}, `}
                                    {region !== '' && `${region}, `}
                                    {country !== '' && `${country.full_name_locale || ''}, `}
                                    {postcode !== '' && postcode}
                                </Typography>
                                <Typography className="text-sm">
                                    {telephone}
                                </Typography>
                            </>
                        )}
                        labelPlacement="end"
                    />
                    <Typography className="cursor-pointer ml-[58px] underline text-sm" onClick={() => setOpen(true)}>
                        {t('customer:address:editTitle')}
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default ItemAddress;
