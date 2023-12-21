import Page from '@core_modules/customer/pages/address/';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'customer', 'otp', 'validate', 'login'])),
            withAuth: true,
            query: ctx.query,
        },
    };
}

export default Page;
