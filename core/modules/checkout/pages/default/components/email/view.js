/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable max-len */
import Typography from '@common_typography';
import TextField from '@common_forms/TextField';
import Button from '@common_button';
import CircularProgress from '@common_circularprogress';

const EmailView = (props) => {
    const {
        t, formik, setAnchorEl, anchorEl, idButton, open, config,
        handleBlur, load,
    } = props;

    let isExternalLoginLink = false;
    if (config && config.loginRedirect && config.loginRedirect.link) {
        if (config.loginRedirect.link.indexOf('http') > -1) {
            isExternalLoginLink = true;
        }
    }
    const generateLoginRedirect = () => {
        if (config && config.loginRedirect && config.loginRedirect.link) {
            return config.loginRedirect.link;
        }
        return '/customer/account/login?redirect=/checkout';
    };

    return (
        <div className="border-b border-b-neutral-400 p-[30px]" id="checkoutEmailSetup">
            <Typography variant="h2" className="font-bold uppercase">
                {t('checkout:emailAddress')}
            </Typography>
            <div className="m-[5px]">
                <div
                    error={!!(formik.errors.email && formik.touched.email)}
                    className="form-control mt-[10px] mb-[20px]"
                >
                    <TextField
                        id="checkout-email-input"
                        name="email"
                        placeholder="john.doe@gmail.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                        endAdornment={(
                            <>
                                {
                                    load ? (
                                        <CircularProgress size="1rem" />
                                    ) : null
                                }
                                {/* <InputAdornment position="end">
                                    <Button
                                        aria-describedby={idButton}
                                        aria-label="toggle password visibility"
                                        onClick={(event) => {
                                            setAnchorEl(event.currentTarget);
                                        }}
                                    >
                                        <InformationCircleIcon />
                                    </Button>
                                    <Popover
                                        id={idButton}
                                        open={open}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                        }}
                                        onClose={() => {
                                            setAnchorEl(null);
                                        }}
                                    >
                                        <Typography variant="p">{t('checkout:emailHelper')}</Typography>
                                    </Popover>
                                </InputAdornment> */}
                            </>
                        )}
                    />
                    {(formik.touched.email && formik.errors.email) ? <div className="form-control-error text-red">{formik.errors.email || null}</div> : null}
                </div>
            </div>
            {!isExternalLoginLink
                ? (
                    <Button align="left" variant="text" href={generateLoginRedirect()} className="clear-margin-padding">
                        <Typography variant="span" type="regular" decoration="underline" size="14">
                            {t('checkout:haveAccount')}
                        </Typography>
                    </Button>
                )
                : (
                    <Button
                        align="left"
                        variant="text"
                        className="clear-margin-padding"
                        onClick={() => { window.location.href = generateLoginRedirect(); }}
                    >
                        <Typography variant="span" type="regular" decoration="underline" size="14">
                            {t('checkout:haveAccount')}
                        </Typography>
                    </Button>
                )}
        </div>
    );
};

export default EmailView;
