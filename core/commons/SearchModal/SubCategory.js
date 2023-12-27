import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';

const SubCategory = ({
    open, data, setOpenModal, onBack,
    handleClickMenu,
}) => {
    if (!open) return null;
    return (
        <div className="slide-container">
            <div className="flex flex-col justify-center items-center pt-[20px] pb-[20px] px-[80px]">
                <Button
                    fullWidth
                    variant="text"
                    onClick={() => {
                        setOpenModal(false);
                        setTimeout(() => {
                            handleClickMenu(data[0]);
                        }, 200);
                    }}
                >
                    <Typography className="font-bold text-md uppercase text-center">
                        {data[0].name}
                    </Typography>
                </Button>
                <div className="m-0 flex flex-col justify-center items-center">
                    {data[0].children.map((item, indx) => (
                        <Button
                            key={indx}
                            fullWidth
                            variant="text"
                            onClick={() => {
                                setOpenModal(false);
                                setTimeout(() => {
                                    handleClickMenu(item);
                                }, 300);
                            }}
                            className={indx === data[0].children.length - 1 ? 'm-0 p-[2px] h-auto !mb-[40px]' : 'p-[2px] h-auto'}
                        >
                            <Typography className="first-letter:uppercase text-md text-center">
                                {item.name}
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
};

export default SubCategory;
