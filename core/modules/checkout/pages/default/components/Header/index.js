/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { getStoreHost } from '@helpers/config';
import { modules } from '@config';
import Router from 'next/router';
import { getAppEnv } from '@root/core/helpers/env';

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
        <div id="header">
            <div
                role="button"
                tabIndex={0}
                className="flex flex-col justify-center items-center h-44 cursor-pointer"
                onClick={BackToStore}
            >
                <img
                    className="w-auto max-h-32"
                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                    alt="logo"
                />
            </div>
        </div>
    );
};

export default HeaderCheckout;
