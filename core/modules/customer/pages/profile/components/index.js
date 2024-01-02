import dynamic from 'next/dynamic';
import cx from 'classnames';
import Layout from '@layout_customer';
import Button from '@common_button';
import PasswordField from '@common_forms/Password';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import Checkbox from '@common_forms/CheckBox';
import Show from '@common_show';

const PhoneInput = dynamic(() => import('@common_forms/PhoneInput'), { ssr: false });

const ProfileForm = (props) => {
    const {
        t,
        formik,
        handleChangePhone,
        handleWa,
        phoneIsWa,
        setEditEmail,
        editEmail,
        setEditPass,
        editPass,
        updateCustomerStatus,
        changeCustomerPasswordStatus,
        handleChangeWa,
    } = props;

    return (
        <div
            className={cx('desktop:w-[50%] w-full pt-5')}
        >
            <form
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    className={cx('w-full')}
                    classWrapper={cx('mb-[24px]')}
                    label={t('common:form:firstName')}
                    placeholder={t('common:placeholder:firstName')}
                    name="firstName"
                    required
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    absolute={false}
                    hintProps={{
                        displayHintText: !!formik.errors.firstName,
                        hintType: 'error',
                        hintText: formik.errors.firstName || null,
                        className: cx('my-2'),
                    }}
                />
                <TextField
                    className={cx('w-full')}
                    classWrapper={cx('mb-[24px]')}
                    label={t('common:form:lastName')}
                    placeholder={t('common:placeholder:lastName')}
                    name="lastName"
                    required
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    absolute={false}
                    hintProps={{
                        displayHintText: !!formik.errors.lastName,
                        hintType: 'error',
                        hintText: formik.errors.lastName || null,
                        className: cx('my-2'),
                    }}
                />
                <PhoneInput
                    className={cx('w-full mb-[24px]')}
                    classLabel={cx('capitalize', '!font-medium')}
                    classNameField={cx(
                        'w-full',
                        '!border-neutral-300',
                        'hover:!border-neutral-400 focus:!border-primary focus:!shadow-[0_0_0_4px] focus:!shadow-primary-200',
                    )}
                    label={`${t('common:form:phoneNumber')}`}
                    placeholder={`${t('common:form:phoneNumber')}`}
                    name="phonenumber"
                    required
                    value={formik.values.phonenumber}
                    onChange={handleChangePhone}
                    error={!!(formik.touched.phonenumber && formik.errors.phonenumber)}
                    errorMessage={(formik.touched.phonenumber && formik.errors.phonenumber) || null}
                />
                <div className={cx('flex content-center mb-[24px]')}>
                    <Checkbox
                        id="profile-whatsapptrue"
                        label={t('customer:isWhatsapp')}
                        variant="single"
                        checked={phoneIsWa}
                        onChange={handleWa}
                        classNames={{ checkboxContainerClasses: cx('flex', 'items-center') }}
                    >
                        <label for="profile-whatsapptrue">
                            <Typography variant="bd-2b">{t('customer:isWhatsapp')}</Typography>
                        </label>
                    </Checkbox>
                </div>
                <Show when={!phoneIsWa}>
                    <PhoneInput
                        className={cx('w-full mb-[24px]')}
                        classLabel={cx('capitalize', '!font-medium')}
                        classNameField={cx(
                            'w-full',
                            '!border-neutral-300',
                            'hover:!border-neutral-400 focus:!border-primary focus:!shadow-[0_0_0_4px] focus:!shadow-primary-200',
                        )}
                        label={`${t('common:form:phoneNumber')} Whatsapp`}
                        placeholder={`${t('common:form:phoneNumber')} Whatsapp`}
                        name="whatsapp_number"
                        required
                        value={formik.values.whatsapp_number}
                        onChange={handleChangeWa}
                        error={!!(formik.touched.whatsapp_number && formik.errors.whatsapp_number)}
                        errorMessage={(formik.touched.whatsapp_number && formik.errors.whatsapp_number) || null}
                    />
                </Show>
                <div className={cx('flex content-center mb-[24px]')}>
                    <Checkbox
                        id="profile-emailtrue"
                        label={`${t('common:button:change')} Email`}
                        variant="single"
                        checked={editEmail}
                        onChange={() => setEditEmail(!editEmail)}
                        classNames={{ checkboxContainerClasses: cx('flex', 'items-center') }}
                    >
                        <label for="profile-emailtrue">
                            <Typography variant="bd-2b">{`${t('common:button:change')} Email`}</Typography>
                        </label>
                    </Checkbox>
                </div>
                <Show when={editEmail}>
                    <TextField
                        className={cx('w-full')}
                        classWrapper={cx('mb-[24px]')}
                        label={t('common:form:email')}
                        placeholder={t('common:placeholder:email')}
                        name="email"
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        absolute={false}
                        hintProps={{
                            displayHintText: !!formik.errors.email,
                            hintType: 'error',
                            hintText: formik.errors.email || null,
                            className: cx('my-2'),
                        }}
                    />
                </Show>
                <div className={cx('flex content-center mb-[24px]')}>
                    <Checkbox
                        id="profile-passwordtrue"
                        label={`${t('common:button:change')} Password`}
                        variant="single"
                        checked={editPass}
                        onChange={() => setEditPass(!editPass)}
                        classNames={{ checkboxContainerClasses: cx('flex', 'items-center') }}
                    >
                        <label for="profile-passwordtrue">
                            <Typography variant="bd-2b">{`${t('common:button:change')} Password`}</Typography>
                        </label>
                    </Checkbox>
                </div>
                <Show when={editPass}>
                    <PasswordField
                        className={cx('w-full mb-[24px]')}
                        classLabel={cx('capitalize', '!font-medium')}
                        label={t('common:form:currentPassword')}
                        showVisible
                        name="currentPassword"
                        required
                        absolute={false}
                        hintClassName={cx('my-2')}
                        value={formik.values.currentPassword}
                        onChange={(e) => formik.setFieldValue('currentPassword', e.target.value)}
                        error={!!(formik.touched.currentPassword && formik.errors.currentPassword)}
                        errorMessage={(formik.touched.currentPassword && formik.errors.currentPassword) || null}
                    />
                    <PasswordField
                        className={cx('w-full mb-[24px]')}
                        classLabel={cx('capitalize', '!font-medium')}
                        label="Password"
                        showVisible
                        showPasswordMeter
                        name="password"
                        required
                        absolute={false}
                        hintClassName={cx('my-2')}
                        value={formik.values.password}
                        onChange={(e) => formik.setFieldValue('password', e.target.value)}
                        error={!!(formik.touched.password && formik.errors.password)}
                        errorMessage={(formik.touched.password && formik.errors.password) || null}
                    />
                    <PasswordField
                        className={cx('w-full mb-[24px]')}
                        classLabel={cx('capitalize', '!font-medium')}
                        label={t('common:form:confirm')}
                        showVisible
                        name="confirmPassword"
                        required
                        absolute={false}
                        hintClassName={cx('my-2')}
                        value={formik.values.confirmPassword}
                        onChange={(e) => formik.setFieldValue('confirmPassword', e.target.value)}
                        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        errorMessage={(formik.touched.confirmPassword && formik.errors.confirmPassword) || null}
                    />
                </Show>
                <div className={cx('pt-5')}>
                    <Button
                        type="submit"
                        disabled={updateCustomerStatus.loading || changeCustomerPasswordStatus.loading}
                    >
                        <Typography className={cx('!text-neutral-white')}>{t('common:button:save')}</Typography>
                    </Button>
                </div>
            </form>
        </div>
    );
};

const ProfilePage = (props) => {
    const { data } = props;

    return (
        <Layout {...props}>
            <ProfileForm {...props} data={data.customer} />
        </Layout>
    );
};

export default ProfilePage;
