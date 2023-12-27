import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import Dialog from '@common_dialog';
import gqlService from '@core_modules/checkout/services/graphql';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import { useTranslation } from 'next-i18next';

const ModalHowtoPay = ({
    open,
    setOpen,
    setDisplayHowToPay,
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const { data, error, loading: loadingTutor } = gqlService.getCmsPage({ identifier: 'how-to-pay' });
    const mount = React.useRef(null);

    React.useEffect(() => {
        mount.current = true;
        if (mount.current && data && !error) {
            setDisplayHowToPay(true);
        }
        return () => {
            mount.current = false;
        };
    }, [data, error]);

    if (data && !error) {
        return (
            <Dialog
                open={open}
                onClose={setOpen}
                maxWidth="sm"
            >
                <div className="app-bar relative bg-neutral-white p-[10px] shadow-none h-[70px] flex flex-row">
                    <Typography
                        className="self-start text-[1.7vw] text-neutral-600 mt-[30px] mb-[16px] ml-[30px] font-bold text-left uppercase"
                    >
                        {data.cmsPage.title}
                    </Typography>
                    <Button
                        className="absolute right-[10px]"
                        edge="start"
                        onClick={setOpen}
                        aria-label="close"
                    >
                        <XMarkIcon className="text-[30px] text-primary" />
                    </Button>
                </div>
                <div>
                    <div className="dialog-content">
                        <div className="flex flex-col relative h-full p-[20px]">
                            <CmsRenderer content={data.cmsPage.content} />
                        </div>
                    </div>

                    <div className="dialog-footer">
                        <div className="flex flex-row justify-end bottom-0 bg-neutral-white p-[10px]">
                            <Button loading={loadingTutor} onClick={setOpen} className="m-auto w-[8vw] h-[41px]" type="submit">
                                {t('checkout:buttonOk')}
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
    return null;
};

export default ModalHowtoPay;
