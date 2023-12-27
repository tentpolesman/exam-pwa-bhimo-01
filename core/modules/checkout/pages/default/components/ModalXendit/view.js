/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Dialog from '@common_dialog';
import Button from '@common_button';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import Typography from '@common_typography';

const ModalXenditView = (props) => {
    const {
        open, setOpen, iframeUrl, handleCloseXendit, t,
        payment_code, mode,
        handleSimulateQr, loadSimulate,
    } = props;

    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
            className="modal-xendit"
            PaperProps={{
                classes: {
                    root: 'modal-xendit-paper',
                },
            }}
        >
            <Button
                color="primary"
                size="medium"
                className="xendit-btn-close"
                onClick={() => {
                    setOpen();
                    handleCloseXendit();
                }}
                disabled={loadSimulate}
            >
                <XMarkIcon className="text-lg" />
            </Button>
            <div className="dialog-content p-0 bg-none">
                {
                    payment_code === 'qr_codes' && mode && mode === 'test' && (
                        <div className="form qr-simulate">
                            <Button
                                disabled={loadSimulate}
                                type="button"
                                className="btn-qr-code"
                                onClick={() => handleSimulateQr()}
                                loading={loadSimulate}
                            >
                                <Typography variant="bd-2" letter="uppercase" type="bold" color="white">
                                    {t('common:button:simulateQrCode')}
                                </Typography>

                            </Button>
                        </div>
                    )
                }
                {
                    payment_code === 'qr_codes'
                        ? (
                            <img
                                id="iframe-invoice"
                                className="img-qr-code"
                                alt="Invoice"
                                src={iframeUrl}
                            />
                        ) : (
                            <iframe
                                id="iframe-invoice"
                                className="iframe-invoice"
                                title="Invoice"
                                src={iframeUrl}
                            />
                        )
                }
            </div>
            <style jsx global>
                {`

                
                    .modal-xendit {
                        background: transparent;
                    }
                    .modal-xendit-paper {
                        overflow-y: visible;
                    }
                    .xendit-btn-close {
                        position: absolute;
                        right: -15px;
                        top: -15px;
                        z-index: 99;
                    }

                   .modal-xendit-box {
                       padding: 0px;
                       width: 600px;
                       background: transparent;
                       height: calc(100vh - 150px);
                       overflow: hidden;
                   }
                   .iframe-invoice {
                        height: inherit;
                        width: inherit;
                        border: 0;
                        overflow-y: scroll;
                    }

                    .img-qr-code { 
                        height: 80%;
                        width: inherit;
                        margin-bottom: 10%;
                    }

                    .qr-simulate {
                        padding: 15px;
                        margin-top: 5%;
                    }

                    .btn-qr-code {
                        height: 45px;
                        padding: 5px;
                    }

                    @media screen and (max-width: 768px) {
                        .modal-xendit-box {
                            padding: 0px;
                            height: calc(100vh - 40px);
                            width: calc(100vw - 70px);
                            overflow: hidden;
                        }
                    }
                    
                `}
            </style>
        </Dialog>
    );
};

export default ModalXenditView;
