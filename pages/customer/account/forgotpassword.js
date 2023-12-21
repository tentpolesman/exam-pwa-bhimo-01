import Page from '@core_modules/forgotpassword/pages/default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['common', 'validate', 'forgotpassword'])),
            withAuth: false,
            query: ctx.query,
        },
    };
}

export default Page;
