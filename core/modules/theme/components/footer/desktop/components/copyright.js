import Backdrop from '@common_backdrop';
import Badge from '@common_badge';
import { useTranslation } from 'next-i18next';

import dynamic from 'next/dynamic';

const CopyrightV1 = dynamic(() => import('@core_modules/theme/components/footer/desktop/components/v1/copyright'), { ssr: true });
const CopyrightV2 = dynamic(() => import('@core_modules/theme/components/footer/desktop/components/v2/copyright'), { ssr: true });

const v1 = 'pwa_footer_v1';
const v2 = 'pwa_footer_v2';

const Copyright = (props) => {
    const { loading, error, storeConfig } = props;
    const { t } = useTranslation(['common']);

    const version = storeConfig?.pwa?.footer_version || v1;

    if (error) {
        return <Badge danger>{t('common:error:fetchError')}</Badge>;
    }
    if (loading) return <Backdrop open={loading} />;

    if (version === v2) {
        return <CopyrightV2 {...props} />;
    }

    return <CopyrightV1 {...props} />;
};

export default Copyright;
