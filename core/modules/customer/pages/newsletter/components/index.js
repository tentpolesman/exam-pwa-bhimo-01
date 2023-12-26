import cx from 'classnames';
import Button from '@common_button';
import Skeleton from '@core_modules/customer/pages/newsletter/components/skeleton';
import Typography from '@common_typography';
import Layout from '@layout_customer';
import Checkbox from '@common_forms/CheckBox';

const subData = [{ value: 'subscribed', label: 'Subscription' }];

const SettingPage = (props) => {
    const {
        t, customer, checkData, handleChange, handleSave, loading,
    } = props;

    return (
        <Layout {...props} title={t('customer:setting:newsletter')}>
            <div className={cx('pt-5')}>
                {typeof customer.is_subscribed !== 'undefined' ? (
                    <Checkbox
                        label={t('customer:setting:newsletter_subscription')}
                        flex="column"
                        data={subData}
                        value={checkData}
                        onChange={handleChange}
                    />
                ) : (
                    <Skeleton />
                )}
                <div className={cx('pt-5')}>
                    <Button onClick={handleSave} disabled={loading}>
                        <Typography className={cx('!text-neutral-white')}>{t('common:button:save')}</Typography>
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default SettingPage;
