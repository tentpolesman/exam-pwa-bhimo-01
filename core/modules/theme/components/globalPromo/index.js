/* eslint-disable no-unused-vars */
import Skeleton from '@common_skeleton';
import cx from 'classnames';
import React from 'react';

import { features } from '@config';
import GlobalPromoCarousel from '@core_modules/cms/components/cms-renderer/global-promo-carousel';
import useStyles from '@core_modules/theme/components/globalPromo/styles';
import { getCmsBlocks } from '@core_modules/theme/services/graphql';

const GlobalPromoMessage = (props) => {
    const styles = useStyles();

    const {
        // prettier-ignore
        storeConfig,
        showGlobalPromo,
        isMobile = false,
        ...other
    } = props;
    const { key_cookies } = features.globalPromo;

    const [isShown, setIsShown] = React.useState(showGlobalPromo);

    const { data, loading } = getCmsBlocks({
        identifiers: 'weltpixel_global_promo_message',
    });

    if (loading) {
        return <Skeleton height={16} className={cx('top-[10px]', 'left-[25%]', '!w-[50vw]')} />;
    }

    if (!loading && data && data.cmsBlocks && data.cmsBlocks.items.length > 0 && data.cmsBlocks.items[0].content && isShown) {
        return (
            <>
                <div
                    id="global-promo-message"
                    className={cx(
                        'global-promo-message',
                        'h-[38px]',
                        'text-center',
                        'font-normal',
                        'tablet:text-md',
                        'mobile:max-tablet:text-sm',
                        'bg-primary-700',
                        'text-neutral-white',
                    )}
                >
                    <GlobalPromoCarousel
                        className={styles.container}
                        content={data.cmsBlocks.items[0].content}
                        key_cookies={key_cookies}
                        backgroundColor={storeConfig.global_promo.background_color}
                        textColor={storeConfig.global_promo.text_color}
                        storeConfig={storeConfig}
                        setIsShown={setIsShown}
                        {...other}
                    />
                </div>
            </>
        );
    }

    return null;
};

export default GlobalPromoMessage;
