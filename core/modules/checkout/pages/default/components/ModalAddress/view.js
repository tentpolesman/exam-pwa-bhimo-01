import Button from '@common_button';
import Header from '@common_headermobile';
import Dialog from '@common_dialog';
import useMediaQuery from '@hook/useMediaQuery';
import Skeleton from '@common_skeleton';
import Radio from '@common_forms/Radio';
import PlusIcon from '@heroicons/react/20/solid/PlusIcon';
import AddressFormDialog from '@plugin_addressform';
import Typography from '@common_typography';
import ItemAddress from '@core_modules/checkout/pages/default/components/ItemModalAddress';

const AddressView = (props) => {
    const {
        t, open, setOpen, loading, success,
        address, handleAddress, selectedAddressId, loadingAddress,
        handleChange, handleCloseDiff, handleOpenNew, openNew, typeAddress, dataEdit,
        updateAddress, manageCustomer,
    } = props;
    const headerConfig = {
        headerTitle: t('customer:address:pageTitle'),
        header: 'relative',
        headerBackIcon: 'close',
    };
    const { isDesktop } = useMediaQuery();

    const getItemAddress = () => {
        let content;
        if (loading) {
            content = <Skeleton variant="rect" width="100%" height={118} />;
        } else if (!address) {
            content = <Skeleton variant="rect" width="100%" height={118} />;
        } else if (address.length === 0) {
            content = null;
        } else {
            content = address.map((item) => (
                <ItemAddress
                    {...item}
                    selectedAddressId={selectedAddressId}
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
                    t={t}
                    handleOpenNew={handleOpenNew}
                    manageCustomer={manageCustomer}
                    updateAddress={updateAddress}
                    handleChange={handleChange}
                    handleCloseDiff={handleCloseDiff}
                />
            ));
        }

        return content;
    };

    return (
        <>
            <AddressFormDialog
                {...props}
                open={openNew}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => handleOpenNew(typeAddress)}
                pageTitle={typeAddress === 'new' ? t('customer:address:addTitle') : t('customer:address:editTitle')}
                {...dataEdit}
            />
            <Dialog open={open} className="left-0 w-full" maxWidth="sm" fullWidth={!!isDesktop} fullScreen={!isDesktop}>
                <div className="w-full self-center mobile:max-w-[960px]" id="checkoutListAddress">
                    <Header
                        pageConfig={headerConfig}
                        LeftComponent={{
                            onClick: () => {
                                setOpen(false);
                            },
                        }}
                        className="mb-0"
                    />
                    <div className="p-[15px] overflow-y-auto mobile:h-[80vh]">
                        <div>
                            <Radio variant="single" row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                                {getItemAddress()}
                            </Radio>
                            <div className="p-[15px]">
                                <Button
                                    className="checkout-modalAddress-addAddressBtn"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleOpenNew('new')}
                                >
                                    <Typography variant="span" letter="uppercase" type="bold">
                                        {t('customer:address:addTitle')}
                                    </Typography>
                                    <PlusIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AddressView;
