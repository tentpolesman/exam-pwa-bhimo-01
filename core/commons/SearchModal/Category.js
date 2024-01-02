import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import { modules } from '@config';
import { useTranslation } from 'next-i18next';

const Category = ({
    setOpenModal,
    data,
    onClick,
    handleClickMenu,
}) => {
    const { t } = useTranslation(['common']);

    const content = () => (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center m-0">
                {data.length
                    ? data.map((catlvl1, index) => (
                        <div key={index} className="flex flex-col">
                            <Button
                                fullWidth
                                variant="text"
                                onClick={() => {
                                    setOpenModal(false);
                                    setTimeout(() => {
                                        handleClickMenu(catlvl1);
                                    }, 200);
                                }}
                            >
                                <Typography>
                                    {catlvl1.name}
                                </Typography>
                            </Button>
                            {catlvl1.children.map((catlvl2, indx) => (
                                <Button
                                    key={indx}
                                    fullWidth
                                    variant="text"
                                    onClick={() => onClick(catlvl2)}
                                    className={indx === catlvl1.children.length - 1 ? 'm-0 p-[2px] h-auto !mb-[40px]' : 'p-[2px] h-auto'}
                                >
                                    <Typography>
                                        {catlvl2.name}
                                    </Typography>

                                </Button>
                            ))}
                        </div>
                    ))
                    : null}
                {modules.brands.enabled ? (
                    <Button
                        variant="text"
                        onClick={() => {
                            setOpenModal(false);
                            setTimeout(() => {
                                handleClickMenu({
                                    url_key: 'brands',
                                }, 'CMS_PAGE');
                            }, 200);
                        }}
                        fullWidth
                    >
                        <Typography>
                            {t('common:title:brand')}
                        </Typography>
                    </Button>

                ) : null }

            </div>
        </div>
    );

    return <>{content()}</>;
};

export default Category;
