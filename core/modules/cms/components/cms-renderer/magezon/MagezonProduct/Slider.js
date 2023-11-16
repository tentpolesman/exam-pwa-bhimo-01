/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import { BREAKPOINTS } from '@root/core/theme/vars';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { useWindowSize } from '@uidotdev/usehooks';

const ProductSlider = (props) => {
    // prettier-ignore
    const {
        children,
        owl_active, owl_auto_height, owl_autoplay_timeout, owl_dots, owl_dots_speed,
        owl_item_xl, owl_item_lg, owl_item_md, owl_item_sm, owl_item_xs,
        owl_lazyload, owl_loop, owl_nav, owl_nav_position,
        owl_nav_size, owl_stage_padding,
        owl_active_background_color,
        owl_background_color, owl_color,
        owl_hover_background_color, owl_hover_color,
        owl_autoplay, owl_autoplay_hover_pause,
    } = props;

    const size = useWindowSize();
    const isXl = size.width >= BREAKPOINTS.xl;
    const isLg = size.width >= BREAKPOINTS.lg && size.width < BREAKPOINTS.xl;
    const isMd = size.width >= BREAKPOINTS.md && size.width < BREAKPOINTS.lg;
    const isSm = size.width >= BREAKPOINTS.sm && size.width < BREAKPOINTS.md;
    const isXs = size.width >= BREAKPOINTS.xs && size.width < BREAKPOINTS.sm;

    const navSize = owl_nav_size === 'mini' ? 10 : owl_nav_size === 'small' ? 15 : owl_nav_size === 'normal' ? 20 : 25;
    const [showNav, setShowNav] = useState(true);
    let sliderRef = useRef();

    const getItemsToShow = () => {
        let itemsToShow = 1;

        if (isXl && owl_item_xl) itemsToShow = owl_item_xl;
        if (isLg && owl_item_lg) itemsToShow = owl_item_lg;
        if (isMd && owl_item_md) itemsToShow = owl_item_md;
        if (isSm && owl_item_sm) itemsToShow = owl_item_sm;
        if (isXs && owl_item_xs) itemsToShow = owl_item_xs;

        return itemsToShow;
    };

    const settings = {
        autoplay: owl_autoplay,
        autoplaySpeed: owl_autoplay_timeout,
        speed: owl_dots_speed || 1000,
        dots: owl_dots,
        infinite: owl_loop,
        arrows: false,
        lazyload: owl_lazyload ? 'ondemand' : null,
        pauseOnHover: owl_autoplay_hover_pause,
        adaptiveHeight: owl_auto_height || false,
        customPaging: (i) => (
            <a key={i}>
                <div className="custom-slick-dots" />
            </a>
        ),
        slidesToShow: getItemsToShow(),
        slidesToScroll: getItemsToShow() || 1,
        initialSlide: owl_active ? owl_active - 1 : 0,
        onReInit: () => {
            if (isXl || document.querySelector('.slick-dots')) {
                setShowNav(true);
            } else {
                setShowNav(false);
            }
        },
    };

    return (
        <>
            <div className="mgz-product-slider">
                <div className={`mgz-product-slider-content ${owl_nav_position.includes('bottom') ? 'xs:max-sm:relative' : ''}`}>
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {children}
                    </Slider>
                    {owl_nav && showNav && children.length > 0 && (
                        <div className="mgz-product-slider-nav">
                            <div className="mgz-product-slider-nav--btn" onClick={() => sliderRef.slickPrev()}>
                                <i class="fas fa-chevron-left" />
                            </div>
                            <div className="mgz-product-slider-nav--btn" onClick={() => sliderRef.slickNext()}>
                                <i class="fas fa-chevron-right" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-product-slider {
                        min-height: 298.38px;
                    }
                    .mgz-product-slider :global(img) {
                        max-width: 100%;
                    }
                    .mgz-product-slider :global(.slick-slide) {
                        height: auto;
                    }
                    .mgz-product-slider :global(.slick-slider) {
                        padding: 0 ${owl_stage_padding}px;
                    }
                    .mgz-product-slider :global(.slick-list) {
                    }
                    .mgz-product-slider :global(.slick-dots) {
                        position: relative;
                    }
                    .mgz-product-slider :global(.slick-dots li) {
                        padding: 0 5px;
                    }
                    .mgz-product-slider :global(.slick-track) {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: stretch;
                    }
                    .mgz-product-slider :global(.custom-slick-dots) {
                        width: 10px;
                        height: 10px;
                        background-color: ${owl_background_color || '#eee'};
                        border-radius: 50px;
                    }
                    .mgz-product-slider :global(.slick-active .custom-slick-dots) {
                        background-color: ${owl_active_background_color || '#000000'};
                    }
                    .mgz-product-slider :global(.slick-slider li:not(.slick-active) .custom-slick-dots:hover) {
                        background-color: ${owl_hover_background_color || '#000000'};
                    }
                    .mgz-product-slider-content {
                        text-align: center;
                    }
                    .mgz-product-slider-nav {
                        position: absolute;
                        top: 50%;
                        bottom: ${owl_nav_position.includes('bottom') ? '-10%' : '50%'};
                        display: flex;
                        width: 98.5%;
                        justify-content: ${owl_nav_position === 'top_left' || owl_nav_position === 'bottom_left'
                            ? 'flex-start'
                            : owl_nav_position === 'top_right' || owl_nav_position === 'bottom_right'
                            ? 'flex-end'
                            : 'space-between'};
                    }
                    @media (max-width: ${BREAKPOINTS.sm}) {
                        .mgz-product-slider-nav {
                            top: ${owl_nav_position.includes('top') ? '2%' : '10%'};
                        }
                    }
                    .mgz-product-slider-nav--btn {
                        display: flex;
                        z-index: 1;
                        margin: 0 2px;
                        ${owl_nav_position === 'center_split' ? 'opacity: 0;' : ''}
                        align-items: center;
                        justify-content: center;
                        width: ${navSize * 2}px;
                        height: ${navSize * 2}px;
                        background-color: ${owl_background_color || '#eee'};
                        transition: opacity 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;
                    }
                    .mgz-product-slider:hover .mgz-product-slider-nav--btn {
                        ${owl_nav_position === 'center_split' ? 'opacity: 1;' : ''}
                    }
                    .mgz-product-slider-nav--btn:hover {
                        cursor: pointer;
                        border: 1px solid black;
                        background-color: ${owl_hover_background_color};
                    }
                    .mgz-product-slider-nav--btn :global(svg) {
                        font-size: 15px;
                        color: ${owl_color};
                    }
                    .mgz-product-slider-nav--btn:hover :global(svg) {
                        color: ${owl_hover_color};
                    }
                    .mgz-product-slider-dots {
                        display: flex;
                        justify-content: center;
                        margin: 5px;
                    }
                `}
            </style>
        </>
    );
};

export default ProductSlider;
