import { withApollo } from '@lib_apollo';
import { withTranslation } from 'next-i18next';
import Core from '@core_modules/customer/pages/address/core';

const Page = (props) => <Core {...props} />;

export default withApollo({ ssr: false })(withTranslation()(Page));
