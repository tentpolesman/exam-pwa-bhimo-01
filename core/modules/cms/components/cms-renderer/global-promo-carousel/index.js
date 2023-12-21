/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import useStyles from '@core_modules/cms/components/cms-renderer/global-promo-carousel/style';
import cx from 'classnames';
import parse, { domToReact } from 'html-react-parser';
import propTypes from 'prop-types';
import React from 'react';

import Button from '@common_button';
import { features } from '@config';
import { setCookies } from '@helpers/cookies';

import ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';

const WidgetSliderCarousel = (props) => {
    const {
        content, className, showClose, key_cookies, handleClose: customHandleClose,
    } = props;
    const styles = useStyles();

    const [activeTabs, setActiveTabs] = React.useState(0);
    const countTabs = React.useRef(0);

    const optionSlider = {
        replace: ({ name, children, attribs }) => {
            if (name === 'ul') {
                return (
                    // eslint-disable-next-line no-return-assign
                    <div className={cx('slide-content-wrapper', 'relative', 'mobile:max-tablet:pt-1')}>{domToReact(children, optionSlider)}</div>
                );
            }
            if (name === 'li') {
                countTabs.current = parseInt(attribs['data-index'], 10);
                return (
                    <div
                        className={cx('slide-content', {
                            hidden: activeTabs !== parseInt(attribs['data-index'], 10),
                        })}
                        // className={cx('slide-content', 'translate-y-10')}
                        key={parseInt(attribs['data-index'], 10)}
                    >
                        {domToReact(children, optionSlider)}
                    </div>
                );
            }
        },
    };

    const options = {
        replace: ({ attribs, children }) => {
            if (attribs) {
                if (attribs.id === 'slides') {
                    return <div className="slide-container">{domToReact(children, optionSlider)}</div>;
                }
            }
        },
    };

    const handleClose = () => {
        setCookies(key_cookies, false);
        customHandleClose(false);
        const globalPromoMessage = document.getElementById('global-promo-message');
        const headerInner = document.getElementById('header-inner');
        if (headerInner) {
            headerInner.classList.remove('top-[38px]');
        }
        if (globalPromoMessage) {
            globalPromoMessage.style.display = 'none';
            globalPromoMessage.style.height = '0px';
            // globalPromoMessage.remove();
        }
    };

    if (content && content !== '') {
        return (
            <div className={className && className !== '' ? className : styles.container}>
                <div className="slider-container">
                    <Button
                        onClick={() => {
                            if (activeTabs - 1 < 0) {
                                setActiveTabs(countTabs.current);
                            } else {
                                setActiveTabs(activeTabs - 1);
                            }
                        }}
                        className={cx(
                            'absolute',
                            'mobile:max-tablet:left-[10%]',
                            'tablet:left-[15%]',
                            'tablet:!top-[40%]',
                            'mobile:max-tablet:!top-[60%]',
                            '!py-0',
                            'bg-[transparent]',
                        )}
                        variant="plain"
                        iconOnly
                        icon={<ChevronLeftIcon />}
                        iconProps={{ className: '!text-neutral-white !opacity-100 mobile:max-tablet:h-[20px] mobile:max-tablet:w-[20px]' }}
                    />
                    {parse(content, options)}
                    <Button
                        onClick={() => {
                            if (activeTabs + 1 > countTabs.current) {
                                setActiveTabs(0);
                            } else {
                                setActiveTabs(activeTabs + 1);
                            }
                        }}
                        className={cx(
                            'absolute',
                            'mobile:max-tablet:right-[10%]',
                            'tablet:right-[15%]',
                            'tablet:!top-[40%]',
                            'mobile:max-tablet:!top-[60%]',
                            '!py-0',
                            'bg-[transparent]',
                        )}
                        variant="plain"
                        iconOnly
                        icon={<ChevronRightIcon />}
                        iconProps={{ className: '!text-neutral-white !opacity-100 mobile:max-tablet:h-[20px] mobile:max-tablet:w-[20px]' }}
                    />
                    {showClose ? (
                        <Button
                            onClick={handleClose}
                            className={cx('absolute', 'right-0', 'tablet:!top-[40%]', 'mobile:max-tablet:!top-[60%]', '!py-0', 'bg-[transparent]')}
                            variant="plain"
                            iconOnly
                            icon={<XMarkIcon />}
                            iconProps={{ className: '!text-neutral-white !opacity-100 mobile:max-tablet:h-[20px] mobile:max-tablet:w-[20px]' }}
                        />
                    ) : null}
                </div>
                <style jsx>
                    {`
                        .close-btn-widget-slider {
                            background: none;
                        }
                        .slider-container {
                            height: 45px;
                            overflow: hidden;
                            text-align: center;
                            padding: 8px 25%;
                            font-size: 14px;
                            justify-content: center;
                        }

                        @media (max-width: 768px) {
                            .slider-container {
                                height: auto;
                                padding: 5px 10px;
                                font-size: 12px;
                            }
                        }

                        .btn-bar {
                            display: none;
                        }
                    `}
                </style>
            </div>
        );
    }
    return null;
};

WidgetSliderCarousel.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    content: propTypes.string.isRequired,
    className: propTypes.string,
    showClose: propTypes.bool,
    key_cookies: propTypes.string,
};

WidgetSliderCarousel.defaultProps = {
    className: '',
    showClose: true,
    key_cookies: features.globalPromo.key_cookies,
};

export default WidgetSliderCarousel;
