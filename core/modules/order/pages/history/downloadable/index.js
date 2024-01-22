import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/order/pages/history/downloadable/core';
import Content from '@core_modules/order/pages/history/components/downloadable';

const DefaultOrder = (props) => <Core {...props} Content={Content} />;

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
