import { withTranslation } from 'next-i18next';
import { withApollo } from '@lib_apollo';
import CoreBase from '@core_modules/rma/pages/history/core';
import Content from '@core_modules/rma/pages/history/components';

const Page = (props) => (
    <CoreBase
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: true })(withTranslation()(Page));
