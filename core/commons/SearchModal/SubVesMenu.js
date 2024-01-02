/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable react/no-danger */
import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';

const SubCategory = ({
    open, data, onBack, handleOpenCat, handleClickMenu, back,
}) => (
    <div
        className="slider-container"
    >
        <div className="flex flex-col justify-center items-center pt-[20px] pb-[20px] px-[80px]">
            <Button
                fullWidth
                variant="text"
                onClick={() => handleClickMenu(data[0])}
            >
                <Typography className="font-bold text-md uppercase text-center">
                    <div dangerouslySetInnerHTML={{ __html: data[0].name }} />
                </Typography>
            </Button>
            <div className="m-0 flex flex-col justify-center items-center">
                {data && data[0].children && data[0].children.length > 0
                    && data[0].children.map((item, indx) => (
                        <Button
                            key={indx}
                            fullWidth
                            variant="text"
                            onClick={() => handleOpenCat(item)}
                            className={indx === data[0].children.length - 1 ? 'm-0 p-[2px] h-auto !mb-[40px]' : 'p-[2px] h-auto'}
                        >
                            <Typography
                                variant="span"
                                letter="capitalize"
                                size="14"
                                align="center"
                            >
                                <div dangerouslySetInnerHTML={{ __html: item.name }} />
                            </Typography>

                        </Button>
                    ))}
            </div>
            <Button onClick={() => onBack()}>
                <ArrowLeftIcon />
            </Button>
        </div>
    </div>
);

export default SubCategory;
