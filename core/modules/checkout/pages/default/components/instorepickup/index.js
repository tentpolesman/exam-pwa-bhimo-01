import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import Dialog from '@common_dialog';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import cx from 'classnames';
import { pickupLocations, setInstoreShippingAddress, setShippingMethod } from '@core_modules/checkout/services/graphql';
import { useEffect, useState } from 'react';

const ModalPickupLocations = (props) => {
    const {
        t, open, setOpen, locations = [], checkout, setCheckout,
        handleOpenMessage,
    } = props;
    const [loading, setLoading] = useState(false);
    const [listLocations, setListLocations] = useState(locations);
    const [selected, setSelected] = useState(checkout);
    const [search, setSearch] = useState('');
    const [setShipMethod] = setShippingMethod();
    const [setInstoreAddress] = setInstoreShippingAddress();

    const handleSave = async () => {
        setLoading(true);
        const { cart } = checkout.data;
        const newCheckout = { ...checkout };
        try {
            const updatedShippingAddress = await setInstoreAddress({
                variables: {
                    cartId: cart.id,
                    city: selected.city,
                    countryCode: selected.country_id,
                    firstname: selected.name,
                    lastname: selected.name,
                    telephone: selected.phone,
                    postcode: selected.postcode,
                    street: selected.street,
                    region: selected.region_id.toString(),
                    latitude: selected.latitude.toString(),
                    longitude: selected.longitude.toString(),
                    pickup_location_code: selected.pickup_location_code,
                },
            });

            await setShipMethod({
                variables: {
                    cartId: cart.id,
                    carrierCode: 'instore',
                    methodCode: 'pickup',
                },
            });

            newCheckout.selected.billing = updatedShippingAddress.data.setBillingAddressOnCart.cart;
            /* eslint-disable */
            newCheckout.selected.address = updatedShippingAddress.data.setShippingAddressesOnCart.cart.shipping_addresses[0];

            await setCheckout({
                ...newCheckout,
                pickup_location_code: updatedShippingAddress.data.setShippingAddressesOnCart.cart.shipping_addresses[0].pickup_location_code,
            });

            setLoading(false);
            setOpen(!open);
        } catch (error) {
            let msg = t('checkout:message:serverError');
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                msg = error.graphQLErrors[0].message;
            }
            setLoading(false);
            setOpen(!open);
            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        const searched = locations.filter(({ name }) => name.toLowerCase().search(value.toLowerCase()) > -1);

        setSearch(value);
        setListLocations(searched);
    };

    useEffect(() => {
        setListLocations(locations);
    }, [locations]);

    /* eslint-disable */
    return (
        <Dialog open={open} onClose={() => setOpen(!open)} fullWidth={true} maxWidth="sm">
            <div className={
                cx(
                    'relative bg-neutral-white p-[10px] shadow-none h-[51px] flex flex-row justify-center items-center'
                )
            }>
                <Button className="absolute left-[10px]" onClick={() => setOpen(!open)} aria-label="close">
                    <XMarkIcon className="text-[30px] text-primary" />
                </Button>
                <Typography className="justify-center my-[16px font-bold text-center uppercase]">
                    {t('checkout:pickupInformation:label')}
                </Typography>
            </div>
            <div className='dialog-content'>
                <div className="w-full h-[80vh]">
                    <div className="flex flex-col relative h-full">
                        <TextField label="Search" value={search} onChange={handleSearch} />
                        {listLocations && listLocations.length > 0 ? (
                            listLocations.map((loc) => {
                                return (
                                    <div
                                        key={loc.pickup_location_code}
                                        onClick={() => setSelected(loc)}
                                        className={cx(
                                            "w-full my-[10px] p-[17px] flex flex-col justify-between items-start border border-neutral-400 rounded-[10px]",
                                            selected && selected.pickup_location_code === loc.pickup_location_code && "border border-primary-700"
                                        )}
                                    >
                                        <Typography className="font-bold">
                                            {loc.name}
                                        </Typography>
                                        <Typography>
                                            {loc.street}
                                            <br />
                                            {loc.city}
                                            <br />
                                            {loc.region}
                                            <br />
                                            {loc.country_id}
                                            <br />
                                            {loc.postcode}
                                            <br />
                                            {loc.telephone}
                                        </Typography>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="alert-warning-container p-2 m-15 bg-yellow-500 text-neutral-white">
                                {t('checkout:storesNotFound')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='dialog-footer'>
                <div className="flex flex-row w-full justify-around items-center bottom-0 bg-neutral-white p-[10px]">
                    <Button className="block m-auto w-[calc(100%-12px)] h-[41px]" type="button" onClick={handleSave} loading={loading} disabled={loading}>
                        {t('common:button:save')}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

const InStorePickup = (props) => {
    const { t, checkout, setCheckout, handleOpenMessage } = props;
    const [getPickupLocations, results] = pickupLocations();
    const [open, setOpen] = useState(false);
    const locations = results.data?.pickupLocations.items;
    const { pickup_location_code } = checkout;
    const { address } = checkout.selected;

    useEffect(() => {
        getPickupLocations();
    }, [results.called]);

    return (
        <div className="border-b border-b-neutral-400 p-[30px]">
            <ModalPickupLocations
                t={t}
                open={open}
                setOpen={setOpen}
                locations={locations}
                checkout={checkout}
                setCheckout={setCheckout}
                handleOpenMessage={handleOpenMessage}
            />
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:pickupInformation:label')}
            </Typography>
            <Typography>{t('checkout:pickupInformation:pickupAtLabel')}</Typography>
            <div className={cx("mb-[15px] ml-0 mr-0")}>
                <div className="flex flex-col">
                    {address && pickup_location_code && Object.keys(address).length > 0 && (
                        <>
                            <Typography className="font-bold">
                                {address.name}
                            </Typography>
                            <Typography>
                                {address.street[0]}
                                <br />
                                {address.city}
                                <br />
                                {address.region.label}
                                <br />
                                {address.country.label}
                                <br />
                                {address.postcode}
                                <br />
                                {address.telephone}
                            </Typography>
                        </>
                    )}
                    <Button className="clear-margin-padding text-left p-0 m-0" onClick={() => setOpen(!open)}>
                        <Typography variant="span" letter="uppercase" type="bold">
                            {t('checkout:pickupInformation:changePickupLocation')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InStorePickup;
