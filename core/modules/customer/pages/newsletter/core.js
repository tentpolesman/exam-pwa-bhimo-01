/* eslint-disable no-return-assign */
import { useRef, useEffect, useState } from 'react';
import Layout from '@layout';
import { useMutation } from '@apollo/client';
import { getCustomerSettings } from '../../services/graphql';

import * as Schema from '../../services/graphql/schema';

const NewsletterPage = (props) => {
    const {
        t, Content, pageConfig, app_cookies,
    } = props;
    const [actUpdateCustomer, { data: dataUpdate, loadingUpdate }] = useMutation(Schema.updateCustomer, {
        context: {
            request: 'internal',
        },
    });
    const { data, loading } = getCustomerSettings();

    const [customer, setCustomer] = useState({});
    const [settings, setSettings] = useState({
        is_subscribed: false,
    });

    const mount = useRef();
    const config = {
        title: t('customer:setting:newsletter'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:setting:newsletter'),
        bottomNav: false,
    };

    const [checkData, setCheckData] = React.useState(customer.is_subscribed ? ['subscribed'] : []);
    const handleChange = (val) => {
        setCheckData(val);
        const tmpSettings = {};
        tmpSettings.is_subscribed = val.length === 1;
        setSettings({ ...tmpSettings });
    };

    /**
     * [useEffect] lifecycle react
     * @check []
     */
    useEffect(() => {
        mount.current = true;
        if (mount.current) {
            if (typeof window !== 'undefined') {
                if (data && data.customer) {
                    const customerData = data.customer;
                    const { is_subscribed } = customerData;
                    const settingConfig = { is_subscribed };
                    setCustomer(customerData);
                    setSettings({
                        ...settingConfig,
                    });
                }
            }
        }
        return () => (mount.current = false);
    }, [data]);

    /**
     * [useEffect] check
     * @check [loading]
     */
    useEffect(() => {
        if (mount.current && !loadingUpdate && dataUpdate !== undefined) {
            setTimeout(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('customer:setting:newsletter_success'),
                    variant: 'success',
                });
            }, 500);
        }
    }, [loadingUpdate]);

    /**
     * [METHOD] handle save button
     */
    const handleSave = async () => {
        window.backdropLoader(true);
        try {
            await actUpdateCustomer({
                variables: {
                    isSubscribed: settings.is_subscribed,
                },
                context: {
                    request: 'internal',
                },
            });
            window.backdropLoader(false);
        } catch (e) {
            await window.toastMessage({
                open: true,
                text: e.message.split(':')[1] || t('customer:setting:newsletter_error'),
                variant: 'error',
            });
            window.backdropLoader(false);
        }
    };

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                t={t}
                customer={customer}
                setSettings={setSettings}
                handleSave={handleSave}
                app_cookies={app_cookies}
                checkData={checkData}
                handleChange={handleChange}
                loading={loading || loadingUpdate}
            />
        </Layout>
    );
};

export default NewsletterPage;
