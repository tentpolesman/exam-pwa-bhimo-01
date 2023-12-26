import { breakPointsUp } from '@helper_theme';
import Button from '@common_button';
import Skeleton from '@common_skeleton';
import classNames from 'classnames';
import Typography from '@common_typography';
import Layout from '@layout_customer';
import CheckboxSettings from '@core_modules/customer/pages/newsletter/components/checkbox';
import CheckboxView from '@core_modules/customer/pages/newsletter/components/checkbox/view';

const subData = [{ value: 'subscribed', label: 'Subscribtion' }];

const SettingPage = (props) => {
    const {
        t, customer, setSettings, handleSave,
    } = props;
    const desktop = breakPointsUp('sm');
    return (
        <Layout {...props} title={t('customer:setting:newsletter')}>
            <div className={classNames('md:basis-full')}>
                <div>
                    {typeof customer.is_subscribed !== 'undefined' ? (
                        <CheckboxSettings
                            name="is_subscribed"
                            t={t}
                            value={customer.is_subscribed ? ['subscribed'] : []}
                            setSettings={setSettings}
                            data={subData}
                            CheckboxView={CheckboxView}
                        />
                    ) : (
                        <Skeleton variant="rect" height={80} />
                    )}
                </div>
                <div>
                    <Button onClick={handleSave} fullWidth={!desktop} align={desktop ? 'left' : 'center'}>
                        <Typography letter="capitalize" color="white" type="bold">
                            {t('common:button:save')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default SettingPage;
