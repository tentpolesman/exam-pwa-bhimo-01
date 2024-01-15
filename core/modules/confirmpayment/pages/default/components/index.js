/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import TextField from '@common_forms/TextField';
import Select from '@common_forms/Select';
import DropFile from '@common_dropfile';
import Button from '@common_button';
import Typography from '@common_typography';
import React from 'react';
import Datepicker from '@common_forms/Datepicker';
import cx from 'classnames';

const ConfirmPayment = (props) => {
    const {
        t, formik, handleChangeDate, handleDropFile, banks,
    } = props;
    return (
        <div className="flex flex-row">
            <div className="desktop:basis-1/2 xs:basis-full">
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                    <TextField
                        name="order_number"
                        label={t('payment:confirmPayment:form:orderNumber')}
                        value={formik.values.order_number}
                        onChange={formik.handleChange}
                        error={!!(formik.errors.order_number && formik.touched.order_number)}
                        errorMessage={(formik.errors.order_number && formik.touched.order_number) ? formik.errors.order_number : null}
                        className="w-full"
                        inputProps={{
                            className: 'w-full',
                        }}
                    />
                    {
                        banks.length > 0
                            ? (
                                <Select
                                    style={{ textTransform: 'capitalize' }}
                                    name="payment"
                                    label={t('payment:confirmPayment:form:bankName')}
                                    value={formik.values.payment}
                                    onChange={(val) => formik.setFieldValue('payment', val)}
                                    options={banks}
                                    error={!!(formik.errors.payment && formik.touched.payment)}
                                    errorMessage={(formik.errors.payment && formik.touched.payment) ? formik.errors.payment : null}
                                    classNameLabel="!text-md font-medium capitalize"
                                    textFiledProps={{
                                        className: '!w-full desktop:w-[50%]',
                                        classWrapper: 'mt-2',
                                    }}
                                />
                            )
                            : (
                                <TextField
                                    name="payment"
                                    label={t('payment:confirmPayment:form:bankName')}
                                    value={formik.values.payment}
                                    onChange={formik.handleChange}
                                    error={!!(formik.errors.payment && formik.touched.payment)}
                                    errorMessage={(formik.errors.payment && formik.touched.payment) ? formik.errors.payment : null}
                                    className="w-full"
                                    inputProps={{
                                        className: 'w-full',
                                    }}
                                />
                            )
                    }
                    <TextField
                        name="account_number"
                        label={t('payment:confirmPayment:form:bankAccountNumber')}
                        value={formik.values.account_number}
                        onChange={formik.handleChange}
                        error={!!(formik.errors.account_number && formik.touched.account_number)}
                        errorMessage={(formik.errors.account_name && formik.touched.account_number) ? formik.errors.account_number : null}
                        className="w-full"
                        inputProps={{
                            className: 'w-full',
                        }}
                    />
                    <TextField
                        name="account_name"
                        label={t('payment:confirmPayment:form:bankAccountName')}
                        value={formik.values.account_name}
                        onChange={formik.handleChange}
                        error={!!(formik.errors.account_name && formik.touched.account_name)}
                        errorMessage={(formik.errors.account_name && formik.touched.account_name) ? formik.errors.account_name : null}
                        className="w-full"
                        inputProps={{
                            className: 'w-full',
                        }}
                    />
                    <TextField
                        name="amount"
                        label={t('payment:confirmPayment:form:amountTranfer')}
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        error={!!(formik.errors.amount && formik.touched.amount)}
                        errorMessage={(formik.errors.amount && formik.touched.amount) ? formik.errors.amount : null}
                        className="w-full"
                        inputProps={{
                            className: 'w-full',
                        }}
                    />
                    <Datepicker
                        classWrapper="mb-5"
                        label={t('payment:confirmPayment:form:tranferDate')}
                        name="dob"
                        classLabel={cx('capitalize', 'mb-[8px]')}
                        value={formik.values.date}
                        onChange={handleChangeDate}
                    />
                    <DropFile
                        title={t('payment:confirmPayment:form:file')}
                        label={t('payment:confirmPayment:form:labelFile')}
                        acceptedFile=".jpg,.jpeg,.png,.pdf,.gif"
                        multiple={false}
                        error={(
                            (formik.errors.filename && formik.touched.filename)
                                || (formik.errors.image_base64 && formik.touched.image_base64)
                        )}
                        getBase64={handleDropFile}
                        showListFile
                        labelProps={{
                            className: '!font-medium',
                        }}
                    />
                    <div className="">
                        <Button type="submit" className="w-full" classNameText="justify-center">
                            <Typography variant="bd-2" className="uppercase" color="text-neutral-white">
                                {t('payment:confirmPayment:form:button')}
                            </Typography>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConfirmPayment;
