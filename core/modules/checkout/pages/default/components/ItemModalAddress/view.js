import Typography from '@common_typography';
import React from 'react';
import AddressFormDialog from '@plugin_addressform';
import Radio from '@common/Forms/Radio';
import Button from '@common/Button';

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
        id,
        t,
        onChange,
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
            <div className="flex flex-col checkoutListItemAddress">
                <Radio
                    variant="single"
                    id={id}
                    checked={checked}
                    value={value}
                    onClick={() => {
                        if (onChange) {
                            onChange({
                                target: {
                                    value: id,
                                },
                            });
                        }
                    }}
                    className="flex flex-row items-center gap-3"
                >
                    <div className="w-full border-b pb-2 flex flex-col">
                        <label for={id} className="flex flex-col">
                            <Typography className="" variant="p">
                                {`${firstname} ${lastname}`}
                            </Typography>
                            <Typography className="" variant="p">
                                {street}
                                ,
                            </Typography>
                            <Typography className="" variant="p">
                                {city !== '' && `${city}, `}
                                {region !== '' && `${region.region || ''}, `}
                                {country !== '' && `${country.full_name_locale || ''}, `}
                                {postcode !== '' && postcode}
                            </Typography>
                            <Typography className="" variant="p">
                                {telephone}
                            </Typography>
                        </label>

                        <Button variant="plain" onClick={() => setOpen(true)} className="!p-0">
                            <Typography className="mt-3 cursor-pointer" variant="bd-2">
                                {t('customer:address:editTitle')}
                            </Typography>
                        </Button>
                    </div>
                </Radio>

            </div>
        </>
    );
};

export default ItemAddress;
