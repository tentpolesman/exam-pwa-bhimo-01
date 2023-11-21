import Button from '@common_button';
import cx from 'classnames';
import React from 'react';

const ScrollTop = (props) => {
    const { storeConfig } = props;

    const classes = cx(
        'fixed',
        'bottom-space-16',
        'right-space-16',
        'z-1099',
    );

    const [triger, setTriger] = React.useState(false);
    const maxHeigtToShow = 600;

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const header = document.getElementById('header');
            const headerInner = document.getElementById('header-inner');
            const checkScrollTop = () => {
                // handle show hide header
                if (storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header && header) {
                    if (window.pageYOffset > 100) {
                        header.classList.add('header-small');
                        if (headerInner) {
                            headerInner.classList.add('header-inner');
                        }
                    } else {
                        header.classList.remove('header-small');
                        if (headerInner) {
                            headerInner.classList.remove('header-inner');
                        }
                    }
                }
                if (!triger && window.pageYOffset > maxHeigtToShow) {
                    setTriger(true);
                } else if (triger && window.pageYOffset < maxHeigtToShow) {
                    setTriger(false);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        }
    }, [window, triger]);

    const scrollTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div onClick={scrollTop} role="presentation" className={cx(classes)}>
            <Button
                iconProps={{
                    icon: 'keyboard_arrow_up',
                    iconOnly: true,
                }}
                variant="secondary"
            />
        </div>
    );
};

export default ScrollTop;
