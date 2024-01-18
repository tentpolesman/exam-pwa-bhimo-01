import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import { debuging } from '@config';
import { getStoreCredit } from '@core_modules/storecredit/services/graphql';
import { useReactiveVar } from '@apollo/client';
import { currencyVar } from '@core/services/graphql/cache';

const PageStoreCredit = (props) => {
    const {
        t, Content, pageConfig, rowsPerPage = 10, ErrorView,
    } = props;
    const config = {
        title: t('storecredit:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('storecredit:title'),
        bottomNav: false,
    };

    // cache currency
    const currencyCache = useReactiveVar(currencyVar);

    const [page, setPage] = React.useState(1);
    const [perPage, setRowsPerPage] = React.useState(rowsPerPage);

    const handleChangePage = (value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(1);
    };
    let storeCredit = {
        current_balance: {
            value: 0,
            currency: 'USD',
        },
        transaction_history: {
            items: [],
        },
    };
    const { data, loading, error } = getStoreCredit({
        pageSizeStoreCredit: perPage,
        currentPageStoreCredit: page,
    });
    if (error) {
        return (
            <Layout {...props} pageConfig={pageConfig || config}>
                <CustomerLayout {...props}>
                    <ErrorView {...props} message={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')} />
                </CustomerLayout>
            </Layout>
        );
    }

    if (data) {
        storeCredit = data.customer.store_credit;
    }
    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                t={t}
                storeCredit={storeCredit}
                loading={loading}
                rowsPerPage={perPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                currencyCache={currencyCache}
            />
        </Layout>
    );
};

export default PageStoreCredit;
