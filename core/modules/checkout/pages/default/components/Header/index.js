/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { getStoreHost } from '@helpers/config';
import { modules } from '@config';
import Router from 'next/router';
import { getAppEnv } from '@root/core/helpers/env';
import Image from '@common_image';

const HeaderCheckout = ({
    storeConfig,
}) => {
    const BackToStore = () => {
        if (modules.checkout.checkoutOnly) {
            window.location.replace(getStoreHost(getAppEnv()));
        } else {
            Router.push('/');
        }
    };

    return (
        <div id="header" className="flex flex-col justify-center items-center w-full h-44">
            <button
                className="border-none w-max"
                onClick={BackToStore}
                type="button"
            >
                <Image
                    width={230}
                    height={68}
                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                    alt="logo"
                    className="!w-[230px] !h-[68px]"
                    classContainer="!w-[230px] !h-[68px]"
                    quality={100}
                    storeConfig={storeConfig}
                />
            </button>
        </div>
    );
};

export default HeaderCheckout;
