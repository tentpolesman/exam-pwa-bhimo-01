import Button from '@common_button';
import ArrowUp from '@heroicons/react/24/outline/ChevronUpIcon';
import cx from 'classnames';
import React from 'react';

const ScrollTop = (props) => {
    const { storeConfig, showGlobalPromo } = props;

    const [trigger, setTrigger] = React.useState(false);
    const maxHeightToShow = 200;

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            const headerInner = document.getElementById('header-inner');
            const desktopHeader = document.getElementsByClassName('desktop-header')[0];
            const desktopHeaderClassList = desktopHeader && desktopHeader.classList && Object.values(desktopHeader?.classList || {});
            const tabletHeader = document.getElementsByClassName('tablet-header')[0];
            const tabletHeaderClassList = tabletHeader && tabletHeader.classList && Object.values(tabletHeader?.classList || {});

            const checkScrollTop = () => {
                const globalPromo = document.getElementById('global-promo-message');
                const scrollTopPosition = window.pageYOffset || document.documentElement.scrollTop;

                if (storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header) {
                    if (window.pageYOffset > 200) {
                        if (headerInner) {
                            if (desktopHeader) {
                                const isShownDesktop = !(desktopHeaderClassList.filter((item) => item === 'hidden-this-desktop').length > 0);
                                if (isShownDesktop) {
                                    if (showGlobalPromo && globalPromo) {
                                        headerInner.classList.remove('top-[38px]');
                                    }
                                    if (scrollTopPosition > lastScrollTop) {
                                        headerInner.classList.remove('top-[-43px]');
                                        headerInner.classList.add('top-[-128px]');
                                    } else if (scrollTopPosition < lastScrollTop) {
                                        headerInner.classList.remove('top-[-128px]');
                                        headerInner.classList.add('top-[-43px]');
                                    }
                                    lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
                                }
                            }
                            if (tabletHeader) {
                                const isShownTablet = !(tabletHeaderClassList.filter((item) => item === 'hidden-this-tablet').length > 0);
                                if (isShownTablet) {
                                    if (showGlobalPromo && globalPromo) {
                                        headerInner.classList.remove('top-[38px]');
                                    }
                                    headerInner.classList.add('top-[-43px]');
                                }
                            }
                        }
                    } else if (window.pageYOffset > 0 && window.pageYOffset <= 200) {
                        if (desktopHeader) {
                            const isShownDesktop = !(desktopHeaderClassList.filter((item) => item === 'hidden-this-desktop').length > 0);
                            if (isShownDesktop) {
                                if (showGlobalPromo && globalPromo) {
                                    headerInner.classList.remove('top-[38px]');
                                }
                            }
                        }
                        if (tabletHeader) {
                            const isShownTablet = !(tabletHeaderClassList.filter((item) => item === 'hidden-this-tablet').length > 0);
                            if (isShownTablet) {
                                if (showGlobalPromo && globalPromo) {
                                    headerInner.classList.remove('top-[38px]');
                                }
                            }
                        }
                    } else {
                        if (desktopHeader) {
                            const isShownDesktop = !(desktopHeaderClassList.filter((item) => item === 'hidden-this-desktop').length > 0);
                            if (isShownDesktop) {
                                if (scrollTopPosition === 0) {
                                    headerInner.classList.remove('top-[-43px]');
                                    headerInner.classList.remove('top-[-128px]');
                                    if (showGlobalPromo && globalPromo) {
                                        headerInner.classList.add('top-[38px]');
                                    }
                                }
                                lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
                            }
                        }
                        if (tabletHeader) {
                            const isShownTablet = !(tabletHeaderClassList.filter((item) => item === 'hidden-this-tablet').length > 0);
                            if (isShownTablet) {
                                if (scrollTopPosition === 0) {
                                    headerInner.classList.remove('top-[-43px]');
                                    if (showGlobalPromo && globalPromo) {
                                        headerInner.classList.add('top-[38px]');
                                    }
                                }
                            }
                        }
                    }
                }
                if (!trigger && window.pageYOffset > maxHeightToShow && window.innerWidth > 768) {
                    setTrigger(true);
                } else if (trigger && window.pageYOffset < maxHeightToShow && window.innerWidth > 768) {
                    setTrigger(false);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        }
    }, [window, trigger]);

    const scrollTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div
            onClick={scrollTop}
            role="presentation"
            className={cx('fixed', 'bottom-space-16', 'right-space-16', 'z-scroll-to-top', 'visible', {
                'hidden invisible': !trigger,
            })}
        >
            <Button className="!px-[10px]" iconOnly icon={<ArrowUp />} variant="primary" />
        </div>
    );
};

export default ScrollTop;
