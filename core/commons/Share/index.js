import Typography from '@common_typography';
import Show from '@common_show';
import Button from '@common_button';
import Image from 'next/image';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import { getHost } from '@helper_config';
import { useRouter } from 'next/router';

const isMobileOrTablet = () => /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
const whatsappLink = (text) => {
    const prefixUrlWA = (isMobileOrTablet() ? 'api' : 'web');
    return `https://${prefixUrlWA}.whatsapp.com/send?text=${text}`;
};

const facebookLink = (text) => `https://www.facebook.com/sharer/sharer.php?u=${text}`;

const twitterLink = (text) => `https://twitter.com/share?text=${text}`;

const Share = ({
    showLabel = true,
    whatsapp = true,
    instagram = true,
    facebook = true,
    twitter = true,
    label,
}) => {
    const route = useRouter();
    const { t } = useTranslation(['product']);
    const labelFinal = label || `${t('product:shareTitle')}:`;
    const linkShare = getHost() + route.asPath;

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
                        variant="plain"
                        iconOnly
                        icon={<Image src="/assets/img/logo_whatsapp.svg" width={16} height={16} style={{ width: 16, height: 16 }} />}
                        className="!p-0"
                    />
                </Show>
                <Show when={instagram}>
                    <Button
                        variant="plain"
                        iconOnly
                        classNameText="w-[16px] h-[16px]"
                        icon={<Image src="/assets/img/logo_instagram.svg" width={16} height={16} style={{ width: 16, height: 16 }} />}
                        className="!p-0"
                    />
                </Show>
                <Show when={facebook}>
                    <Button
                        link={facebookLink(linkShare)}
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
