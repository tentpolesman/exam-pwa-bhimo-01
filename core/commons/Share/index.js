import React from 'react';
import Typography from '@common_typography';
import Show from '@common_show';
import Button from '@common_button';
import Image from 'next/image';
import ShareIcon from '@heroicons/react/24/solid/ShareIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import useMediaQuery from '@hook/useMediaQuery';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import { getHost } from '@helper_config';
import { useRouter } from 'next/router';
import Dialog from '@common/Dialog';

const isMobileOrTablet = () => {
    if (typeof navigator !== 'undefined') {
        return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
    }
    return false;
};
const whatsappLink = (text) => {
    const prefixUrlWA = (isMobileOrTablet() ? 'api' : 'web');
    return `https://${prefixUrlWA}.whatsapp.com/send?text=${text}`;
};

const facebookLink = (text) => `https://www.facebook.com/sharer/sharer.php?u=${text}`;

const twitterLink = (text) => `https://twitter.com/share?text=${text}`;

const Share = ({
    showLabel = true,
    whatsapp = true,
    facebook = true,
    twitter = true,
    label,
}) => {
    const { t } = useTranslation(['common', 'product']);
    const route = useRouter();
    const { isMobile } = useMediaQuery();
    const labelFinal = label || `${t('product:shareTitle')}:`;
    const linkShare = getHost() + route.asPath;
    const [showShareBottom, setShowShareBottom] = React.useState(false);

    if (isMobile) {
        return (
            <>
                <Button
                    variant="plain"
                    icon={false}
                    iconOnly={false}
                    className="!p-0 whitespace-nowrap"
                    onClick={() => setShowShareBottom(true)}
                >
                    <Typography color="text-neutral-500 hover:text-neutral-400 flex items-center" variant="bd-2a">
                        <ShareIcon className="h-[20px] w-[20px]" />
                    </Typography>
                </Button>

                <Dialog
                    useCloseButton
                    open={showShareBottom}
                    variant="plain"
                    classWrapper="w-full"
                    onClickClose={() => setShowShareBottom(false)}
                >
                    <div className="share-bottom-sheet p-[16px] absolute bg-neutral-white w-full bottom-0 rounded-t-[8px]">
                        <div className="share-bottom-sheet-title flex justify-between items-center">
                            <Typography variant="bd-1">{t('common:label:shareToYourFriend')}</Typography>
                            <Button
                                variant="plain"
                                className="!p-0"
                                onClick={() => setShowShareBottom(false)}
                            >
                                <XMarkIcon className="h-[20px] w-[20px]" />
                            </Button>
                        </div>
                        <div className="share-bottom-sheet-content mt-[16px]">
                            <Show when={whatsapp}>
                                <Button
                                    link={whatsappLink(linkShare)}
                                    linkTarget="_blank"
                                    variant="plain"
                                    className="flex justify-center items-center border border-neutral-200 px-[18px] py-[10px] mb-[16px]"
                                >
                                    <Image src="/assets/img/logo_whatsapp.svg" width={16} height={16} style={{ width: 16, height: 16 }} />
                                    <Typography variant="bd-2a" className="ml-[6px]">WhatsApp</Typography>
                                </Button>
                            </Show>
                            <Show when={facebook}>
                                <Button
                                    link={facebookLink(linkShare)}
                                    linkTarget="_blank"
                                    variant="plain"
                                    className="flex justify-center items-center border border-neutral-200 px-[18px] py-[10px] mb-[16px]"
                                >
                                    <Image src="/assets/img/logo_facebook.svg" width={16} height={16} style={{ width: 16, height: 16 }} />
                                    <Typography variant="bd-2a" className="ml-[6px]">Facebook</Typography>
                                </Button>
                            </Show>
                            <Show when={twitter}>
                                <Button
                                    link={twitterLink(linkShare)}
                                    linkTarget="_blank"
                                    variant="plain"
                                    className="flex justify-center items-center border border-neutral-200 px-[18px] py-[10px] mb-[16px]"
                                >
                                    <Image src="/assets/img/logo_x.svg" width={16} height={16} style={{ width: 16, height: 16 }} />
                                    <Typography variant="bd-2a" className="ml-[6px]">Twitter</Typography>
                                </Button>
                            </Show>
                        </div>
                    </div>
                </Dialog>
            </>
        );
    }

    return (
        <div className={cx('share', 'flex items-center', 'gap-[12px]')}>
            <Show when={showLabel}>
                <div className={cx('share-label')}>
                    <Typography variant="bd-2b">
                        {labelFinal}
                    </Typography>
                </div>
            </Show>
            <div className={cx('share-action', 'flex items-center', 'gap-[12px]')}>
                <Show when={whatsapp}>
                    <Button
                        link={whatsappLink(linkShare)}
                        linkTarget="_blank"
                        variant="plain"
                        iconOnly
                        icon={<Image src="/assets/img/logo_whatsapp.svg" width={16} height={16} style={{ width: 16, height: 16 }} />}
                        className="!p-0"
                    />
                </Show>
                <Show when={facebook}>
                    <Button
                        link={facebookLink(linkShare)}
                        linkTarget="_blank"
                        variant="plain"
                        iconOnly
                        classNameText="w-[16px] h-[16px]"
                        icon={<Image src="/assets/img/logo_facebook.svg" width={16} height={16} style={{ width: 16, height: 16 }} />}
                        className="!p-0"
                    />
                </Show>
                <Show when={twitter}>
                    <Button
                        link={twitterLink(linkShare)}
                        linkTarget="_blank"
                        variant="plain"
                        iconOnly
                        classNameText="w-[16px] h-[16px]"
                        icon={<Image src="/assets/img/logo_x.svg" width={16} height={16} style={{ width: 16, height: 16 }} />}
                        className="!p-0"
                    />
                </Show>
            </div>
        </div>
    );
};

export default Share;
