import Page from '@core_modules/customer/pages/newpassword';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'validate', 'customer'])),
            withAuth: false,
            query: ctx.query,
        },
    };
}

export default Page;
