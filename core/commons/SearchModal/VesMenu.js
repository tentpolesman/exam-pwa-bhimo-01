/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable react/no-danger */
import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';

const SubCategory = ({
    openSub, data, handleClickMenu, handleOpenSub,
    historyData, historyPosition, onBackHistory, back,
}) => {
    if (!openSub) return null;
    return (
        <div className="slide-container">
            <div className="flex flex-col justify-center items-center pt-[20px] pb-[20px] px-[80px]">
                <div className="m-0 flex flex-col justify-center items-center">
                    {data
                        ? data.map((catlvl1, index) => {
                            const renderMenu = () => (
                                <div key={index} className="flex flex-col">
                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={() => handleClickMenu(catlvl1)}
                                    >
                                        <Typography variant="label" size="14" letter="uppercase" type="bold" align="center">
                                            <div dangerouslySetInnerHTML={{ __html: catlvl1.name }} />
                                        </Typography>
                                    </Button>
                                    {catlvl1.children.map((catlvl2, indx) => (
                                        <Button
                                            key={indx}
                                            fullWidth
                                            variant="text"
                                            onClick={() => handleOpenSub(catlvl2)}
                                            className={indx === catlvl1.children.length - 1 ? 'm-0 p-[2px] h-auto !mb-[40px]' : 'p-[2px] h-auto'}
                                        >
                                            <Typography className="first-letter:uppercase text-md text-center">
                                                <div dangerouslySetInnerHTML={{ __html: catlvl2.name }} />
                                            </Typography>
                                        </Button>
                                    ))}
                                </div>
                            );
                            if (catlvl1.link !== null && !catlvl1.link.includes('storelocator')) {
                                return renderMenu();
                            }

                            if (catlvl1.link === null) {
                                return renderMenu();
                            }
                            return null;
                        })
                        : null}
                </div>
                {
                    (historyPosition > 0 && historyData.length > 1) && (
                        <Button onClick={onBackHistory}>
                            <ArrowLeftIcon />
                        </Button>
                    )
                }
            </div>
        </div>
    );
};

export default SubCategory;
