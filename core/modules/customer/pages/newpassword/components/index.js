import Button from '@common_button';
import Password from '@common_password';
import useStyles from '@core_modules/customer/pages/newpassword/components/style';

const ForgotPassword = (props) => {
    const styles = useStyles();
    const { t, formik, disabled } = props;
    return (
        <div className="flex flex-row">
            <div className="md:basis-1/2 xs:basis-full">
                <form className={styles.container} onSubmit={formik.handleSubmit}>
                    <Password
                        label="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={!!formik.errors.password}
                        errorMessage={formik.errors.password || null}
                        showVisible
                        showPasswordMeter
                    />
                    <Password
                        label={t('common:form:confirm')}
                        className={styles.email}
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={!!formik.errors.confirmPassword}
                        errorMessage={formik.errors.confirmPassword || null}
                    />
                    <Button disabled={disabled} className={styles.btn} fullWidth type="submit">
                        {t('common:button:send')}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
