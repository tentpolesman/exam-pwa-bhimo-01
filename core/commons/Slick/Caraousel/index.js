/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import ChevronLeft from '@heroicons/react/20/solid/ChevronLeftIcon';
import ChevronRight from '@heroicons/react/20/solid/ChevronRightIcon';

const Caraousel = (props) => {
    const {
        data = [], xs = 767, sm = 1024, md = 1200,
        slideXs = 1, slideSm = 3, slideMd = 4, slideLg = 6,
        showArrow = true, Item, onReInit = () => {}, storeConfig = {},
        className = '', ...other
    } = props;

    const [slideIndex, setIndex] = useState(0);
    const [count, setCount] = useState(0);

    let sliderRef = React.createRef();

    const handleLeftArrow = () => {
        if (slideIndex === 0) {
            sliderRef.slickPrev(data.length - 1);
        } else {
            sliderRef.slickPrev(slideIndex - 1);
        }
    };

    const handleRightArrow = () => {
        if (slideIndex === data.length - 1) {
            sliderRef.slickNext(0);
        } else {
            sliderRef.slickNext(slideIndex + 1);
        }
    };

    const settings = {
        arrows: false,
        dots: false,
        infinite: data.length >= slideLg,
        speed: 500,
        slidesToShow: slideLg,
        slidesToScroll: 1,
        rtl: true,
        className: 'slider',
        centerMode: true,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
        responsive: [
            {
                breakpoint: md,
                settings: {
                    slidesToShow: data.length < slideMd ? data.length : slideMd,
                    slidesToScroll: 1,
                    className: 'slider',
                    centerMode: false,
                    infinite: data.length >= slideMd,
                },
            },
            {
                breakpoint: sm,
                settings: {
                    slidesToShow: data.length < slideSm ? data.length : slideSm,
                    slidesToScroll: 1,
                    centerMode: true,
                    className: 'slider',
                    infinite: data.length >= slideSm,
                },
            },
            {
                breakpoint: xs,
                settings: {
                    slidesToShow: data.length < slideXs ? data.length : slideXs,
                    slidesToScroll: 1,
                    centerMode: true,
                    className: 'slider',
                    infinite: data.length >= slideXs,
                },
            },
        ],
    };

    // eslint-disable-next-line max-len
    const arrow = 'text-[1.5rem] bg-neutral-100 shadow-md absolute hidden group-hover:flex flex-col justify-center items-center p-[10px] rouded-[5px] text-center pl-[10px] top-[calc(50%-1rem)] w-[40px] h-[40px] cursor-pointer hover:bg-pwa-primary hover:text-white xs:hidden';

    return (
        <div className={classNames('carousel', 'w-full h-full relative xs:max-w-[100vw] sm:h-auto group', className)}>
            <Slider onInit={onReInit} ref={(slider) => sliderRef = slider} {...settings}>
                {
                    data && data.length > 0 && data.map((item, key) => (
                        <Item key={key} {...item} {...other} storeConfig={storeConfig} />
                    ))
                }
            </Slider>
            {
                showArrow ? (
                    <>
                        <div className={classNames(arrow, 'left-[20px]')} onClick={handleLeftArrow}>
                            <ChevronLeft className="w-6 h-6 text-primary" />

                        </div>
                        <div className={classNames(arrow, 'right-[20px]')} onClick={handleRightArrow}>
                            <ChevronRight className="w-6 h-6 text-primary" />
                        </div>
                    </>
                ) : null
            }
            <style jsx global>
                {`
                    .carousel .slick-track {
                        margin-left: auto;
                        margin-right: auto;
                    }
                `}
            </style>
        </div>
    );
};

export default Caraousel;
