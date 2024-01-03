/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import dynamic from 'next/dynamic';

const HeaderV1 = dynamic(() => import('@core_modules/theme/components/header/components/v1'));
const HeaderV2 = dynamic(() => import('@core_modules/theme/components/header/components/v2'));
const HeaderV3 = dynamic(() => import('@core_modules/theme/components/header/components/v3'));
const HeaderV4 = dynamic(() => import('@core_modules/theme/components/header/components/v4'));

const ViewTopNavigation = (props) => {
    const { storeConfig } = props;
    let content = <></>;

    if (storeConfig && storeConfig.pwa) {
        if (storeConfig.pwa.header_version === 'v1') {
            content = <HeaderV1 {...props} />;
        }
        if (storeConfig.pwa.header_version === 'v2') {
            content = <HeaderV2 {...props} />;
        }
        if (storeConfig.pwa.header_version === 'v3') {
            content = <HeaderV3 {...props} />;
        }
        if (storeConfig.pwa.header_version === 'v4') {
            content = <HeaderV4 {...props} />;
        }
    }

    return content;
};

export default ViewTopNavigation;
