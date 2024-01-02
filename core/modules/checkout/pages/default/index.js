/* eslint-disable react/destructuring-assignment */
import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/checkout/pages/default/core';

const Page = (props) => (
    <Core
        {...props}
        pageConfig={{
            title: props.t('checkout:pageTitle'),
            header: 'relative', // available values: "absolute", "relative", false (default)
            headerTitle: props.t('checkout:pageTitle'),
            headerDesktop: false,
            footer: false,
            bottomNav: false,
            pageType: 'checkout',
        }}
    />
);

export default withApollo({ ssr: false })(withTranslation()(Page));
