/* eslint-disable no-unused-vars */
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import cx from 'classnames';
import React from 'react';

import { features } from '@config';
// import { setCookies } from '@helpers/cookies';

// import Button from '@common_button';

// import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import WidgetSliderCaraousel from '@core_modules/cms/components/cms-renderer/widget-slider-caraousel';
import useStyles from '@core_modules/theme/components/globalPromo/styles';
import { getCmsBlocks } from '@core_modules/theme/services/graphql';

// import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

const GlobalPromoMessage = (props) => {
    const styles = useStyles();

    const {
        storeConfig, showGlobalPromo, isMobile = false, ...other
    } = props;
    const { key_cookies } = features.globalPromo;

    // eslint-disable-next-line no-unused-vars
    const [isShown, setIsShown] = React.useState(showGlobalPromo);

    const { data, loading } = getCmsBlocks({
        identifiers: 'weltpixel_global_promo_message',
    });

    if (loading) {
        return (
            <Box className={styles.containerLoading}>
                <Skeleton animation="wave" variant="text" width="60%" height={16} />
            </Box>
        );
    }
    // const color = cx(`!text-[${storeConfig.global_promo.text_color}]`);

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
                        'pt-2',
                    )}
                >
                    <WidgetSliderCaraousel
                        className={styles.container}
                        content={data.cmsBlocks.items[0].content}
                        key_cookies={key_cookies}
                        backgroundColor={storeConfig.global_promo.background_color}
                        textColor={storeConfig.global_promo.text_color}
                        storeConfig={storeConfig}
                        {...other}
                    />
                    {/* <CmsRenderer content={data.cmsBlocks.items[0].content} />
                    {!isMobile ? (
                        <Button
                            className={cx(
                                'm-0',
                                '!p-0',
                                'absolute',
                                'top-2',
                                'right-4',
                                'hover:shadow-none',
                                'focus:shadow-none',
                                'active:shadow-none',
                                'active:shadow-none',
                                '!bg-[unset]',
                            )}
                            onClick={() => {
                                setCookies(key_cookies, false);
                                setIsShown(false);
                                document.getElementById('header-inner').classList.remove('top-[38px]');
                            }}
                            icon={<XMarkIcon />}
                            iconProps={{ className: cx('w-[18px]', color) }}
                            iconOnly
                            variant="tertiary"
                        />
                    ) : null} */}
                </div>
                <style jsx>
                    {`
                        .global-promo-message {
                            background-color: ${storeConfig.global_promo.background_color};
                            color: ${storeConfig.global_promo.text_color};
                        }
                    `}
                </style>
            </>
        );
    }

    return null;
};

export default GlobalPromoMessage;
