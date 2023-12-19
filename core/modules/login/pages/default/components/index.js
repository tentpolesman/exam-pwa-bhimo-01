/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import ReCAPTCHA from 'react-google-recaptcha';

import Typography from '@common_typography';
import TextField from '@common_forms/TextField';
import PasswordField from '@common_forms/Password';
import PhoneField from '@common_forms/PhoneInput';
import Tabs from '@common_tabs';
import Button from '@common_button';

import OtpView from '@plugin_otpfield';
import { features } from '@config';

const Login = (props) => {
    const {
        otpConfig,
        t,
        formik,
        formikOtp,
        toastMessage,
        socialLoginMethodData,
        socialLoginMethodLoading,
        enableRecaptcha,
        sitekey,
        handleChangeCaptcha,
        recaptchaRef,
        query,
        showOtp,
        setShowOtp,
        phonePassword,
        formikPhoneEmail,
        disabled,
    } = props;

    const [activeTabs, setActiveTabs] = useState(0);
    const tabsData = [
        { title: 'Email' },
        { title: t('login:Phone') },
    ];
    const signInOptions = [];

    if (features.firebase.config.apiKey !== '' && firebase && firebase.auth && socialLoginMethodData && socialLoginMethodData.length > 0) {
        for (let idx = 0; idx < socialLoginMethodData.length; idx += 1) {
            const code = socialLoginMethodData[idx];
            if (code.match(/google/i) && firebase.auth.GoogleAuthProvider && firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.GoogleAuthProvider.PROVIDER_ID);
            }

            if (code.match(/facebook/i) && firebase.auth.FacebookAuthProvider && firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.FacebookAuthProvider.PROVIDER_ID);
            }

            if (code.match(/twitter/i) && firebase.auth.TwitterAuthProvider && firebase.auth.TwitterAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.TwitterAuthProvider.PROVIDER_ID);
            }

            if (code.match(/github/i) && firebase.auth.GithubAuthProvider && firebase.auth.GithubAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.GithubAuthProvider.PROVIDER_ID);
            }

            if (code.match(/email/i) && firebase.auth.EmailAuthProvider && firebase.auth.EmailAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.EmailAuthProvider.PROVIDER_ID);
            }
        }
    }

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions,
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
    };

    const [firebaseLoaded, setFirebaseLoaded] = useState(false);

    useEffect(() => {
        if (features.firebase.config.apiKey === '') {
            setFirebaseLoaded(false);
        } else {
            setFirebaseLoaded(true);
        }
    }, [firebaseLoaded]);
    return (
        <div>
            <Typography className="flex justify-center mb-10 mt-14 tablet:mt-0" variant="h1">
                {t('login:login')}
            </Typography>
            <div className="flex justify-center">
                {showOtp
                    ? (
                        <OtpView
                            {...props}
                            type="login"
                            name="otp"
                            value={formikOtp.values.otp}
                            onChange={(e) => formikOtp.setFieldValue('otp', e)}
                            onSubmit={formikOtp.handleSubmit}
                            phoneNumber={formikOtp.values.username}
                            show={showOtp}
                            setShow={setShowOtp}
                        />
                    )
                    : (
                        <div className="max-w-[400px] w-full tablet:w-[550px] tablet:max-w-[550px] desktop:w-[650px] desktop:max-w-[650px]
                            rounded-md border border-neutral-200 bg-white flex-col gap-6 inline-flex
                            mobile:mx-4 mx-auto px-3 pb-6 tablet:p-8 pt-5 "
                        >
                            {otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login
                                && (
                                    <Tabs
                                        data={tabsData}
                                        allItems={false}
                                        tabTitleWrapperClassName="grid grid-cols-2"
                                        tabTitleClassName="min-w-full tablet:min-w-full"
                                        onChange={setActiveTabs}
                                        activeTabsProps={activeTabs}
                                    />
                                )}

                            {activeTabs === 0
                                ? (phonePassword !== false
                                    ? (
                                        <form
                                            onSubmit={formikPhoneEmail.handleSubmit}
                                            className="flex-col gap-6 inline-flex mx-auto w-full"
                                        >
                                            <TextField
                                                id="login-email-textfield"
                                                className="border border-neutral-300 w-full"
                                                name="username"
                                                label={t('login:emailAddress')}
                                                placeholder="e.g: user@gmail.com"
                                                value={formikPhoneEmail.values.username}
                                                onChange={formikPhoneEmail.handleChange}
                                                hintProps={{
                                                    displayHintText: !!formikPhoneEmail.errors.username,
                                                    hintType: 'error',
                                                    hintText: formikPhoneEmail.errors.username || null,
                                                    className: 'mt-2',
                                                }}
                                                absolute={false}
                                                error={!!formikPhoneEmail.errors.username}
                                                errorMessage={formikPhoneEmail.errors.username || null}
                                            />
                                            <div className={`flex-col ${formikPhoneEmail.errors.password ? 'gap-9' : 'gap-3'} inline-flex `}>
                                                <PasswordField
                                                    id="login-password-passfield"
                                                    className="w-full"
                                                    name="password"
                                                    label="Password"
                                                    classLabel="capitalize font-medium"
                                                    value={formikPhoneEmail.values.password}
                                                    onChange={(e) => formikPhoneEmail.setFieldValue('password', e.target.value)}
                                                    error={!!formikPhoneEmail.errors.password}
                                                    errorMessage={formikPhoneEmail.errors.password || null}
                                                    showVisible
                                                />
                                                <Link href="/customer/account/forgotpassword">
                                                    <Typography
                                                        variant="p-3"
                                                        className="text-sm whitespace-nowrap flex items-center text-neutral-500 underline"
                                                    >
                                                        {t('login:forgotPassword')}
                                                    </Typography>
                                                </Link>
                                            </div>
                                            {enableRecaptcha ? (
                                                <div className="w-full">
                                                    <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                                    {formikPhoneEmail.errors.captcha && (
                                                        <Typography color="red">
                                                            {formikPhoneEmail.errors.captcha}
                                                        </Typography>
                                                    )}
                                                </div>
                                            ) : null}

                                            <Button
                                                className="flex justify-center capitalize"
                                                type="submit"
                                                disabled={disabled}
                                            >
                                                {t('login:pageTitle')}
                                            </Button>
                                        </form>
                                    )
                                    : (
                                        <form
                                            onSubmit={formik.handleSubmit}
                                            className="flex-col gap-6 inline-flex mx-auto w-full"
                                        >
                                            <TextField
                                                id="login-email-textfield"
                                                className="border border-neutral-300 w-full"
                                                name="username"
                                                label={t('login:emailAddress')}
                                                placeholder="e.g: user@gmail.com"
                                                value={formik.values.username}
                                                onChange={formik.handleChange}
                                                hintProps={{
                                                    displayHintText: !!formik.errors.username,
                                                    hintType: 'error',
                                                    hintText: formik.errors.username || null,
                                                    className: 'mt-2',
                                                }}
                                                absolute={false}
                                                error={!!formik.errors.username}
                                                errorMessage={formik.errors.username || null}
                                            />
                                            <div className={`flex-col ${formik.errors.password ? 'gap-9' : 'gap-3'} inline-flex `}>
                                                <PasswordField
                                                    id="login-password-passfield"
                                                    className="w-full"
                                                    name="password"
                                                    label="Password"
                                                    classLabel="capitalize font-medium"
                                                    value={formik.values.password}
                                                    onChange={(e) => formik.setFieldValue('password', e.target.value)}
                                                    error={!!formik.errors.password}
                                                    errorMessage={formik.errors.password || null}
                                                    showVisible
                                                />
                                                <Link href="/customer/account/forgotpassword">
                                                    <Typography
                                                        variant="p-3"
                                                        className="text-sm whitespace-nowrap flex items-center text-neutral-500 underline"
                                                    >
                                                        {t('login:forgotPassword')}
                                                    </Typography>
                                                </Link>
                                            </div>
                                            {enableRecaptcha ? (
                                                <div className="w-full">
                                                    <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                                    {formik.errors.captcha && <Typography color="red">{formik.errors.captcha}</Typography>}
                                                </div>
                                            ) : null}

                                            <Button
                                                className="flex justify-center capitalize"
                                                type="submit"
                                                disabled={disabled}
                                            >
                                                {t('login:pageTitle')}
                                            </Button>
                                        </form>
                                    )
                                )
                                : (
                                    <form onSubmit={formikOtp.handleSubmit} className="flex-col gap-6 inline-flex mx-auto w-full">
                                        <PhoneField
                                            id="login-phone-phonefield"
                                            classNameField="border border-neutral-300 w-full"
                                            classLabel="font-medium"
                                            name="username"
                                            label={t('login:phoneNumber')}
                                            value={formikOtp.values.username}
                                            onChange={(e) => formikOtp.setFieldValue('username', e)}
                                            error={!!formikOtp.errors.username}
                                            errorMessage={formikOtp.errors.username || null}
                                            showVisible
                                        />
                                        <Button
                                            className="flex justify-center capitalize"
                                            type="submit"
                                            disabled={disabled}
                                        >
                                            {t('login:pageTitle')}
                                        </Button>
                                    </form>
                                )}
                            <div
                                class="mt-4 flex items-center before:mt-0.5 before:flex-1 before:border-t
                                    before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
                            >
                                <Typography variant="p-2" className="mx-4 text-center !text-neutral-400">
                                    {t('login:orSignWith')}
                                </Typography>
                            </div>

                            {firebaseLoaded && firebase.app() && !socialLoginMethodLoading && (
                                <div>
                                    <StyledFirebaseAuth className="text-primary-500" uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                </div>
                            )}

                            <Typography variant="p-2" className="text-neutral-500 inline-flex gap-1 justify-center">
                                {t('login:newCustomer')}
                                {'? '}
                                <Link href={query && query.redirect ? `/customer/account/create?redirect=${query.redirect}`
                                    : '/customer/account/create'}
                                >
                                    <Typography
                                        variant="p-2"
                                        className="!text-primary-600 underline"
                                    >
                                        {t('login:createAnAccount')}
                                    </Typography>
                                </Link>
                            </Typography>
                        </div>
                    )}
            </div>
            {toastMessage}

        </div>
    );
};

export default Login;
