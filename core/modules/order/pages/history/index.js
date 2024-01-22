import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/order/pages/history/core';
import Content from '@core_modules/order/pages/history/components';

const DefaultOrder = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
