import Button from '@common_button';
import PasswordField from '@common_forms/Password';
import Select from '@common_forms/Select';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import DateDayJs from '@date-io/dayjs';
import Checkbox from '@common_forms/CheckBox';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import cx from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';
import Show from '@common_show';

const PhoneInput = dynamic(() => import('@common_forms/PhoneInput'), { ssr: false });

const RegisterView = ({
    t,
    formik,
    // enableOtp,
    // setdisabled,
    handleChangePhone,
    handleWa,
    handleChangeDate,
    phoneIsWa,
    enableRecaptcha,
    sitekey,
    handleChangeCaptcha,
    handleChangeWa,
    disabled,
    recaptchaRef,
    gender,
    dob,
}) => {
    const divInputStyle = cx('w-full');
    const divInputWrapperStyle = cx('mb-[24px]');

    const checkIsFieldError = (name = '') => !!(formik.touched[name] && formik.errors[name]);

    const fieldErrorMessage = (name = '') => (formik.touched[name] && formik.errors[name]) || null;

    return (
        <>
            <div className={cx('register-container', 'justify-center')}>
                <div className={cx('register-title', 'text-center', 'mb-[40px]')}>
                    <Typography variant="h1">{t('register:pageTitle')}</Typography>
                </div>

                <form
                    className={cx(
                        'register-form',
                        'mx-auto',
                        'pt-[24px]',
                        'px-[32px]',
                        'pb-[32px]',
                        'border-[1px]',
                        'border-neutral-200',
                        'rounded-[6px]',
                        'desktop:w-[650px]',
                    )}
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        className={divInputStyle}
                        classWrapper={divInputWrapperStyle}
                        id="register-email-textfield"
                        label={t('common:form:emailAddress')}
                        placeholder={t('common:placeholder:email')}
                        type="email"
                        name="email"
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        absolute={false}
                        rightIcon={<></>}
                        hintProps={{
                            displayHintText: checkIsFieldError('email'),
                            hintType: checkIsFieldError('email') ? 'error' : '',
                            hintText: fieldErrorMessage('email'),
                            className: cx('my-2'),
                        }}
                    />

                    <TextField
                        className={divInputStyle}
                        classWrapper={divInputWrapperStyle}
                        id="register-firstname-textfield"
                        label={t('common:form:firstName')}
                        placeholder={t('common:placeholder:firstName')}
                        name="firstName"
                        required
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        absolute={false}
                        rightIcon={<></>}
                        hintProps={{
                            displayHintText: checkIsFieldError('firstName'),
                            hintType: checkIsFieldError('firstName') ? 'error' : '',
                            hintText: fieldErrorMessage('firstName'),
                            className: cx('my-2'),
                        }}
                    />

                    <TextField
                        className={divInputStyle}
                        classWrapper={divInputWrapperStyle}
                        id="register-lastname-textfield"
                        label={t('common:form:lastName')}
                        placeholder={t('common:placeholder:lastName')}
                        name="lastName"
                        required
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        absolute={false}
                        rightIcon={<></>}
                        hintProps={{
                            displayHintText: checkIsFieldError('lastName'),
                            hintType: checkIsFieldError('lastName') ? 'error' : '',
                            hintText: fieldErrorMessage('lastName'),
                            className: cx('my-2'),
                        }}
                    />

                    <Show when={gender}>
                        <Select
                            className={cx('select-gender', divInputStyle)}
                            options={[
                                { label: 'Male', value: 1 },
                                { label: 'Female', value: 2 },
                            ]}
                            label={t('common:form:gender')}
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            helperText={t('common:form:select')}
                            error={checkIsFieldError('gender')}
                            errorMessage={fieldErrorMessage('gender')}
                        />
                    </Show>

                    <Show when={dob}>
                        <DatePicker
                            fullWidth
                            label={t('common:form:dob')}
                            name="dob"
                            value={formik.values.dob}
                            onChange={handleChangeDate}
                            error={checkIsFieldError('dob')}
                            errorMessage={fieldErrorMessage('dob')}
                        />
                    </Show>

                    <PasswordField
                        className={cx('register-form-password', divInputStyle, divInputWrapperStyle)}
                        classWrapper={divInputWrapperStyle}
                        classLabel={cx('capitalize', '!font-medium')}
                        id="register-password-passfield"
                        label="Password"
                        showVisible
                        showPasswordMeter
                        name="password"
                        required
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={checkIsFieldError('password')}
                        errorMessage={fieldErrorMessage('password')}
                    />

                    <PasswordField
                        className={cx('register-form-password', divInputStyle, divInputWrapperStyle)}
                        classLabel={cx('capitalize', '!font-medium')}
                        id="register-passwordConfirm-passfield"
                        label={t('common:form:confirm')}
                        showVisible
                        name="confirmPassword"
                        required
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={checkIsFieldError('confirmPassword')}
                        errorMessage={fieldErrorMessage('confirmPassword')}
                    />

                    <PhoneInput
                        id="register-phoneNumber-textfield"
                        className={cx('phone-number', divInputStyle, divInputWrapperStyle)}
                        classLabel={cx('capitalize', '!font-medium')}
                        classNameField={cx(
                            'w-full',
                            '!border-neutral-300 hover:!border-neutral-400 focus:!border-primary focus:!shadow-[0_0_0_4px] focus:!shadow-primary-200',
                        )}
                        label={`${t('common:form:phoneNumber')}`}
                        placeholder={`${t('common:form:phoneNumber')}`}
                        name="phoneNumber"
                        required
                        value={formik.values.phoneNumber}
                        onChange={handleChangePhone}
                        error={checkIsFieldError('phoneNumber')}
                        errorMessage={fieldErrorMessage('phoneNumber')}
                    />

                    <div className={cx('checkbox-wa-wrapper', divInputWrapperStyle)}>
                        <Checkbox
                            id="register-waRegitered-checkbox"
                            name="whastapptrue"
                            label={t('register:subscribe')}
                            variant="single"
                            size="sm"
                            value={phoneIsWa}
                            onChange={handleWa}
                        >
                            <Typography variant="bd-2b">{t('register:isWhatsapp')}</Typography>
                        </Checkbox>
                    </div>

                    <Show when={!phoneIsWa}>
                        <PhoneInput
                            id="register-waNumber-textfield"
                            className={cx('phone-number', divInputStyle, divInputWrapperStyle)}
                            classLabel={cx('capitalize', '!font-medium')}
                            classNameField={cx(
                                'w-full',
                                '!border-neutral-300',
                                'hover:!border-neutral-400 focus:!border-primary focus:!shadow-[0_0_0_4px] focus:!shadow-primary-200',
                            )}
                            label={`${t('common:form:phoneNumber')} Whatsapp`}
                            placeholder={`${t('common:form:phoneNumber')}`}
                            name="whatsappNumber"
                            required
                            value={formik.values.whatsappNumber}
                            onChange={handleChangeWa}
                            error={checkIsFieldError('whatsappNumber')}
                            errorMessage={fieldErrorMessage('whatsappNumber')}
                        />
                    </Show>

                    {/* {enableOtp && false ? (
                        <>
                            <OtpBlock
                                type="register"
                                setDisabled={setdisabled}
                                phoneProps={{
                                    id: 'register-phonenumber-textfield',
                                    name: 'phoneNumber',
                                    value: formik.values.phoneNumber,
                                    onChange: handleChangePhone,
                                    error: !!formik.errors.phoneNumber,
                                    errorMessage: formik.errors.phoneNumber || null,
                                }}
                                codeProps={{
                                    id: 'register-otp-textfield',
                                    name: 'otp',
                                    value: formik.values.otp,
                                    onChange: formik.handleChange,
                                    error: !!(formik.touched.otp && formik.errors.otp),
                                    errorMessage: (formik.touched.otp && formik.errors.otp) || null,
                                    footer: (
                                        <FormControlLabel
                                            onChange={handleWa}
                                            // className={styles.checkWa}
                                            control={<Checkbox id="register-waRegitered-checkbox" name="whastapptrue" color="primary" size="small" />}
                                            label={<Typography variant="p">{t('register:isWhatsapp')}</Typography>}
                                        />
                                    ),
                                }}
                            />
                            {!phoneIsWa && (
                                <PhoneInput
                                    id="register-waNumber-textfield"
                                    label={`${t('common:form:phoneNumber')} Whatsapp`}
                                    name="whatsappNumber"
                                    value={formik.values.whatsappNumber}
                                    onChange={handleChangeWa}
                                    error={!!(formik.touched.whatsappNumber && formik.errors.whatsappNumber)}
                                    errorMessage={(formik.touched.whatsappNumber && formik.errors.whatsappNumber) || null}
                                />
                            )}
                        </>
                    ) : null} */}

                    <div className={cx('register-footer', 'border-t-[1px] pt-[24px] border-neutral-200')}>
                        <div className={cx('checkbox-newsletter-wrapper', 'mb-[24px]')}>
                            <Checkbox
                                id="register-newsletter-checkbox"
                                variant="single"
                                name="subscribe"
                                label={t('register:subscribe')}
                                size="sm"
                                value={formik.values.subscribe}
                                onChange={formik.handleChange}
                            >
                                <Typography variant="bd-2b">{t('register:subscribe')}</Typography>
                            </Checkbox>
                        </div>

                        <Show when={enableRecaptcha}>
                            <>
                                <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                <Show when={formik.errors.captcha}>
                                    <Typography className={cx('text-md font-normal leading-lg tracking-normal text-pwa-font my-2 !text-red')}>
                                        {formik.errors.captcha}
                                    </Typography>
                                </Show>
                            </>
                        </Show>
                        <Button
                            disabled={disabled}
                            id="register-btnRegister"
                            type="submit"
                            className={cx('!w-full', disabled ? '!bg-neutral-200' : '', enableRecaptcha ? 'mt-[24px]' : '')}
                            classNameText={cx('!justify-center')}
                        >
                            <Typography className={cx(disabled ? '!text-neutral-400' : '!text-neutral-white')}>{t('register:button')}</Typography>
                        </Button>
                        <div className={cx('flex', 'justify-center', 'mt-[16px]')}>
                            <Typography variant="bd-2b" className={cx('!text-neutral-500')}>
                                {t('register:haveAccount')}
                                <Link href="/customer/account/login">
                                    {' '}
                                    <Typography variant="bd-2b" className={cx('!text-primary-600')}>
                                        {t('register:login')}
                                    </Typography>
                                </Link>
                            </Typography>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

const RegisterViewProvider = (props) => (
    <MuiPickersUtilsProvider utils={DateDayJs}>
        <RegisterView {...props} />
    </MuiPickersUtilsProvider>
);

export default RegisterViewProvider;
