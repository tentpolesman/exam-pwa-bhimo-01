import Backdrop from '@common_backdrop';
import Badge from '@common_badge';
import { useTranslation } from 'next-i18next';

import cx from 'classnames';

const Copyright = (props) => {
    const { loading, error, storeConfig } = props;
    const { t } = useTranslation(['common']);

    if (error) {
        return <Badge danger>{t('common:error:fetchError')}</Badge>;
    }
    if (loading) return <Backdrop open={loading} />;

    return (
        <div className={cx('copyright', 'text-center', 'p-[10px]', 'bg-neutral-100')}>
            <span className={cx('text-base', 'font-normal', 'leading-5', 'text-neutral-500')}>{storeConfig.copyright}</span>
        </div>
    );
};

export default Copyright;
