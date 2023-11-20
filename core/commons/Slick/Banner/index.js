/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Slider from 'react-slick';
import ImageSlide from '@common_slick/Banner/ImageSlider';
import { PRIMARY } from '@root/core/theme/colors';

const Banner = ({
    data = [],
    height,
    width,
    contentWidth = '',
    autoPlay = true,
    noLink = false,
    showArrow = true,
    speed = 500,
    autoplaySpeed = 4000,
    storeConfig = {},
}) => {
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

    const generateDotItemProps = (isActive) => {
        const dotItemProps = {
            className: 'hidden',
        };

        if (data.length > 1) {
            if (isActive) {
                dotItemProps.className = 'w-[10px] h-[10px] rounded-[100px] m-[5px] cursor-pointer';
                dotItemProps.style = { backgroundColor: PRIMARY };
            } else {
                dotItemProps.className = 'w-[7px] h-[7px] rounded-[100px] m-[5px] cursor-pointer bg-white';
            }
        }

        return dotItemProps;
    };

    const handleRightArrow = () => {
        if (slideIndex === data.length - 1) {
            sliderRef.slickNext(0);
        } else {
            sliderRef.slickNext(slideIndex + 1);
        }
    };

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: autoPlay,
        speed,
        autoplaySpeed,
        rtl: false,
        arrows: false,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
    };

    return (
        <div className="w-full h-full relative sm:h-auto">
            <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                {data.map((item, key) => (
                    <ImageSlide
                        storeConfig={storeConfig}
                        height={height}
                        width={width}
                        noLink={noLink}
                        contentWidth={contentWidth}
                        key={key}
                        lazy={key !== 0}
                        {...item}
                    />
                ))}
            </Slider>
            {showArrow ? (
                <>
                    <div
                        className="text-[1.5rem] bg-[rgba(255,255,255,0.5)] p-[10px] rounded flex flex-col justify-center items-center pl-[5px] w-[40px] h-[40px] cursor-pointer absolute top-[calc(50%-1rem)] left-[20px]"
                        onClick={handleLeftArrow}
                    >
                        <i class="fas fa-chevron-left" />
                    </div>
                    <div
                        className="text-[1.5rem] bg-[rgba(255,255,255,0.5)] p-[10px] rounded flex flex-col justify-center items-center pl-[5px] w-[40px] h-[40px] cursor-pointer absolute top-[calc(50%-1rem)] right-[20px]"
                        onClick={handleRightArrow}
                    >
                        <i class="fas fa-chevron-right" />
                    </div>
                </>
            ) : null}
            <div className="z-[2] flex flex-row justify-around absolute bottom-[33px] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                {data.map((item, id) => (
                    <div {...generateDotItemProps(slideIndex === id)} key={id} onClick={() => sliderRef.slickGoTo(id)} />
                ))}
            </div>
        </div>
    );
};

export default Banner;
