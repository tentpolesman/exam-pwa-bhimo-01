import Button from '@common_button';
import PasswordField from '@common_forms/Password';
import Select from '@common_forms/Select';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
// import useStyles from '@core_modules/register/pages/default/components/style';
import DateDayJs from '@date-io/dayjs';
import { breakPointsUp } from '@helper_theme';
import Checkbox from '@common_forms/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import OtpBlock from '@plugin_otp';
import cx from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';
import PhoneInput from '@common_forms/PhoneInput';

const RegisterView = ({
    t,
    formik,
    enableOtp,
    setdisabled,
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
    // const styles = useStyles();
    const desktop = breakPointsUp('sm');
    const divInputStyle = cx('w-full', 'mb-[24px]');

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
                        id="register-email-textfield"
                        label="Email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.email && formik.errors.email)}
                        errorMessage={(formik.touched.email && formik.errors.email) || null}
                    />
                    <TextField
                        className={divInputStyle}
                        id="register-firstname-textfield"
                        label={t('common:form:firstName')}
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.firstName && formik.errors.firstName)}
                        errorMessage={(formik.touched.firstName && formik.errors.firstName) || null}
                    />
                    <TextField
                        className={divInputStyle}
                        id="register-lastname-textfield"
                        label={t('common:form:lastName')}
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.lastName && formik.errors.lastName)}
                        errorMessage={(formik.touched.lastName && formik.errors.lastName) || null}
                    />

                    {gender && (
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
                            error={!!(formik.touched.gender && formik.errors.gender)}
                            errorMessage={(formik.touched.gender && formik.errors.gender) || null}
                        />
                    )}
                    {dob && (
                        <DatePicker
                            fullWidth
                            label={t('common:form:dob')}
                            name="dob"
                            value={formik.values.dob}
                            onChange={handleChangeDate}
                            error={!!(formik.touched.dob && formik.errors.dob)}
                            helperText={(formik.touched.dob && formik.errors.dob) || null}
                        />
                    )}
                    <PasswordField
                        className={cx('register-form-password', divInputStyle)}
                        classLabel={cx('capitalize', 'font-normal')}
                        id="register-password-passfield"
                        label="Password"
                        showVisible
                        showPasswordMeter
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.password && formik.errors.password)}
                        errorMessage={(formik.touched.password && formik.errors.password) || null}
                    />
                    <PasswordField
                        className={cx('register-form-password', divInputStyle)}
                        classLabel={cx('capitalize', 'font-normal')}
                        id="register-passwordConfirm-passfield"
                        label={t('common:form:confirm')}
                        showVisible
                        name="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        errorMessage={(formik.touched.confirmPassword && formik.errors.confirmPassword) || null}
                    />
                    <PhoneInput
                        id="register-phoneNumber-textfield"
                        className={cx('phone-number', divInputStyle)}
                        classNameField={divInputStyle}
                        label={`${t('common:form:phoneNumber')}`}
                        name="whatsappNumber"
                        value={formik.values.whatsappNumber}
                        onChange={handleChangeWa}
                        error={!!(formik.touched.whatsappNumber && formik.errors.whatsappNumber)}
                        errorMessage={(formik.touched.whatsappNumber && formik.errors.whatsappNumber) || null}
                    />
                    {enableOtp && false ? (
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
                    ) : null}
                    <div className="">
                        <FormControlLabel
                            value={formik.values.subscribe}
                            onChange={formik.handleChange}
                            name="subscribe"
                            control={<Checkbox id="register-newsletter-checkbox" name="subscribe" color="primary" size="small" />}
                            label={(
                                <Typography variant="p" letter="capitalize" className="flex flex-row center">
                                    {t('register:subscribe')}
                                </Typography>
                            )}
                            style={{ marginBottom: enableRecaptcha ? 25 : 0 }}
                        />

                        {enableRecaptcha ? (
                            <>
                                <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                {formik.errors.captcha && <Typography color="red">{formik.errors.captcha}</Typography>}
                            </>
                        ) : null}
                        <Button
                            disabled={disabled}
                            fullWidth={!desktop}
                            // className={styles.btnSigin}
                            id="register-btnRegister"
                            type="submit"
                            align={desktop ? 'left' : 'center'}
                        >
                            <Typography variant="span" type="bold" letter="uppercase">
                                {t('register:button')}
                            </Typography>
                        </Button>
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
