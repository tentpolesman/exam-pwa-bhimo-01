/* eslint-disable react/no-danger */
import Typography from '@common_typography';
import Button from '@common_button';
import TextField from '@common_textfield';
import ReCAPTCHA from 'react-google-recaptcha';
import dynamic from 'next/dynamic';

const Message = dynamic(() => import('@common_toast'), { ssr: false });

const ContactForm = (props) => {
    const {
        t, formik, sitekey, handleChangeCaptcha, recaptchaRef,
        message, setMessage, load, enableRecaptcha,
    } = props;
    return (
        <form onSubmit={formik.handleSubmit}>
            <Message
                open={message.open}
                variant={message.variant}
                setOpen={() => setMessage({ ...message, open: false })}
                message={message.text}
            />
            <TextField
                label={t('contact:fullName')}
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={!!(formik.touched.fullName && formik.errors.fullName)}
                errorMessage={(formik.touched.fullName && formik.errors.fullName) || null}
            />
            <TextField
                label={t('contact:email')}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!(formik.touched.email && formik.errors.email)}
                errorMessage={(formik.touched.email && formik.errors.email) || null}
            />
            <TextField
                label={t('contact:telephone')}
                name="telephone"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                error={!!(formik.touched.telephone && formik.errors.telephone)}
                errorMessage={(formik.touched.telephone && formik.errors.telephone) || null}
            />
            <TextField
                label={t('contact:message')}
                name="message"
                multiline
                rows="4"
                value={formik.values.message}
                onChange={formik.handleChange}
                error={!!(formik.touched.message && formik.errors.message)}
                errorMessage={(formik.touched.message && formik.errors.message) || null}
                style={{ marginBottom: 20 }}
            />
            {
                enableRecaptcha ? (
                    <>
                        <ReCAPTCHA
                            sitekey={sitekey}
                            onChange={handleChangeCaptcha}
                            ref={recaptchaRef}
                        />
                        {formik.touched.captcha && formik.errors.captcha && (
                            <Typography color="red">{formik.errors.captcha}</Typography>
                        )}
                    </>
                ) : null
            }
            <Button
                disabled={load}
                loading={load}
                rootClassName="contact-btn-container"
                align="left"
                type="submit"
            >
                <Typography variant="span" letter="uppercase" color="white" type="bold">
                    {t('common:button:send')}
                </Typography>
            </Button>
            <style jsx global>
                {`
                    .contact-btn-container {
                        margin-top: 50px;
                    }
                `}
            </style>
        </form>
    );
};

const ContactPage = (props) => {
    const {
        data, t, loading, Skeleton,
    } = props;
    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <Typography variant="h1" type="bold" align="left">
                {t('contact:contactUs')}
            </Typography>
            <div className="flex flex-row">
                <div className="md:basis-1/2 xs:basis-full">
                    {(!loading && <div dangerouslySetInnerHTML={{ __html: data.cmsBlocks.items[0].content }} />)}
                    {(loading && <Skeleton />)}
                </div>
                <div className="md:basis-1/2 xs:basis-full">
                    <ContactForm {...props} />
                </div>
            </div>
        </>
    );
};

export default ContactPage;
