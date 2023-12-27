import React from 'react';
import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import Dialog from '@common_dialog';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import gqlService from '@core_modules/checkout/services/graphql';
import { regexPhone } from '@helper_regex';
import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalPickupInformation = ({
    open,
    setOpen,
    checkout,
    setCheckout,
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const [setPickupStore] = gqlService.setPickupStore();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        person: Yup.string().required(`${t('checkout:pickupInformation:pickupPerson')} ${t('validate:required')}`),
        phoneNumber: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
    });

    const [loading, setLoading] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            email: checkout.pickupInformation.pickup_person_email || '',
            phoneNumber: checkout.pickupInformation.pickup_person_phone || '',
            person: checkout.pickupInformation.pickup_person_name || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const pickupInformation = {
                pickup_person_email: values.email,
                pickup_person_name: values.person,
                pickup_person_phone: values.phoneNumber,
            };
            await setLoading(true);
            if (Object.keys(checkout.selectStore).length > 0) {
                await setPickupStore({
                    variables: {
                        cart_id: checkout.data.cart.id,
                        code: checkout.selectStore.code,
                        extension_attributes: pickupInformation,
                        store_address: {
                            city: checkout.selectStore.city,
                            country_code: checkout.selectStore.country_id,
                            name: checkout.selectStore.name,
                            postcode: checkout.selectStore.postcode,
                            region: checkout.selectStore.region,
                            street: [checkout.selectStore.street],
                            telephone: checkout.selectStore.telephone,
                        },
                    },
                }).then(async (res) => {
                    const paymentMethod = res.data.setPickupStore.available_payment_methods.map((method) => ({
                        ...method,
                        label: method.title,
                        value: method.code,
                        image: null,
                    }));
                    await setCheckout({
                        ...checkout,
                        data: {
                            ...checkout.data,
                            cart: {
                                ...checkout.data.cart,
                                ...res.data.setPickupStore,
                            },
                            paymentMethod,
                        },
                        pickupInformation,
                        error: {
                            selectStore: false,
                            pickupInformation: false,
                        },
                    });
                    await setLoading(false);
                    setOpen();
                }).catch(() => {
                    setLoading(false);
                });
            } else {
                await setCheckout({
                    ...checkout,
                    pickupInformation,
                    error: {
                        ...checkout.error,
                        selectStore: true,
                    },
                });
                await setLoading(false);
                setOpen();
            }
        },
    });

    return (
        <Dialog
            open={open}
            onClose={setOpen}
        >
            <div className="app-bar relative bg-neutral-white p-[10px] shadow-none h-[51px] flex flex-row justify-center items-center">
                <Button
                    className="absolute left-[10px]"
                    edge="start"
                    onClick={setOpen}
                    aria-label="close"
                >
                    <XMarkIcon className="text-[30px] text-primary" />
                </Button>
                <Typography
                    className="font-bold text-center uppercase self-center my-[16px]"
                >
                    {t('checkout:pickupInformation:label')}
                </Typography>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="dialog-content">
                    <div className="flex flex-row w-full justify-around items-center bottom-0 bg-neutral-white p-[10px]">
                        <TextField
                            label={t('checkout:pickupInformation:pickupPerson')}
                            name="person"
                            value={formik.values.person}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.person && formik.errors.person)}
                            errorMessage={(formik.touched.person && formik.errors.person) || null}
                        />
                        <TextField
                            label={t('common:form:phoneNumber')}
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                            errorMessage={(formik.touched.phoneNumber && formik.errors.phoneNumber) || null}
                        />
                        <TextField
                            label="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.email && formik.errors.email)}
                            errorMessage={(formik.touched.email && formik.errors.email) || null}
                        />
                    </div>
                </div>

                <div className="dialog-footer">
                    <div className="flex flex-row w-full justify-around items-center bottom-0 bg-neutral-white p-[10px]">
                        <Button loading={loading} className="block m-auto w-[calc(100% - 12px)] h-[41px]" type="submit">
                            {t('common:button:save')}
                        </Button>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default ModalPickupInformation;
