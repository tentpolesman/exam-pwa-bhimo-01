/* eslint-disable react/no-danger */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-danger */
import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import CheckBox from '@common_forms/CheckBox';
import Skeleton from '@common_skeleton';
import Dialog from '@common_dialog';

const ConfirmationView = ({
    t, loading, agreements, checkList, modalList, handleCheckbox, handleOpenModal, handleCloseModal,
}) => {
    const Loader = () => (
        <div className="flex flex-col px-[20px] w-full mt-[13px]">
            <Skeleton width="40%" height={35} />
            <Skeleton width="80%" height={30} />
            <Skeleton width="80%" height={30} />
        </div>
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="flex flex-col px-[20px] w-full mt-[13px]" id="checkoutAgreements">
                {
                    agreements && agreements.checkoutAgreements.map((item, index) => (
                        <div id="agreement-row" className="grid grid-cols-1" key={index}>
                            <div item md={12} xs={12}>
                                {
                                    item.mode === 'MANUAL' ? (
                                        <CheckBox
                                            variant="single"
                                            checked={(checkList.length === 0) ? false : checkList[index].isChecked}
                                            onChange={() => handleCheckbox(index)}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                            color="primary"
                                            size="small"
                                        />
                                    )
                                        : (
                                            <CheckBox
                                                variant="single"
                                                disabled
                                                checked
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                color="primary"
                                                size="small"
                                            />
                                        )
                                }
                                <Button onClick={() => handleOpenModal(index)}>
                                    <Typography
                                        variant="span"
                                        type="regular"
                                        decoration="underline"
                                        size="12"
                                    >
                                        {item.checkbox_text}
                                    </Typography>
                                </Button>
                                <Dialog
                                    onClose={() => handleCloseModal(index)}
                                    aria-labelledby="customized-dialog-title"
                                    open={modalList.length && modalList[index].isOpen}
                                >
                                    <div className="dialog-title">{item.name}</div>
                                    <div className="dialog-content">
                                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                    </div>
                                    <div className="dialog-footer">
                                        <Button
                                            variant="contained"
                                            onClick={() => handleCloseModal(index)}
                                            color="primary"
                                        >
                                            {t('checkout:close')}
                                        </Button>
                                    </div>
                                </Dialog>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default ConfirmationView;
