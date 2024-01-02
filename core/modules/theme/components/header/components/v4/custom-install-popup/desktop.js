/* eslint-disable react/jsx-one-expression-per-line */
import Button from '@common_button';
import TagManager from 'react-gtm-module';

const DesktopInstall = ({ installMessage = 'Install' }) => {
    const onClick = () => {
        const timestamp = Date.now();
        const identifier = `${Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100)}_${timestamp}`;
        const dataLayer = {
            event: 'countPopupInstallation',
            eventCategory: 'Count Popup Installation',
            eventAction: 'Installed',
            eventLabel: 'installPWA',
            eventValue: identifier,
        };
        TagManager.dataLayer({ dataLayer });
    };

    return (
        <div id="popup-desktop__install">
            {installMessage}
            <Button id="btn-install" variant="contained" color="primary" onClick={onClick}>
                Install
            </Button>{' '}
        </div>
    );
};

export default DesktopInstall;
