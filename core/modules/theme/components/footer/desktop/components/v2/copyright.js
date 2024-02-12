import Backdrop from '@common_backdrop';
import Badge from '@common_badge';
import { useTranslation } from 'next-i18next';

import cx from 'classnames';
import Link from 'next/link';

const Copyright = (props) => {
    const { loading, error, storeConfig } = props;
    const { t } = useTranslation(['common']);

    if (error) {
        return <Badge danger>{t('common:error:fetchError')}</Badge>;
    }
    if (loading) return <Backdrop open={loading} />;

    return (
        <div className={cx(
            'copyright',
            'text-center',
            'p-[10px]',
            'pt-8',
            'pb-6',
            'bg-neutral-100',
            'flex flex-col gap-2 desktop:flex-row desktop:gap-4',
            'justify-center items-center',
        )}
        >
            <span className={cx(
                'text-base', 'font-normal', 'leading-5', 'text-neutral-500 desktop:text-neutral-400',
            )}
            >
                {storeConfig.copyright}
            </span>
            <div className="flex flex-row gap-4">
                <Link href="/privacy-policy-cookie-restriction-mode">
                    <span className={cx('text-base', 'font-normal', 'leading-5', 'text-neutral-400', 'cursor-pointer')}>
                        {t('common:label:privacyPolicy')}
                    </span>
                </Link>
                <Link href="/privacy-policy-cookie-restriction-mode">
                    <span className={cx('text-base', 'font-normal', 'leading-5', 'text-neutral-400', 'cursor-pointer')}>
                        {t('common:label:termCondition')}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Copyright;
