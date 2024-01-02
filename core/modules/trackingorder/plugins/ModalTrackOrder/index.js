/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */

import Typography from '@common_typography';
import ShipperView from '@core_modules/trackingorder/pages/default/components/shipper';
import formatDate from '@helper_date';
import Dialog from '@common_dialog';
import ArrowTopRightOnSquareIcon from '@heroicons/react/20/solid/ArrowTopRightOnSquareIcon';
import Link from 'next/link';
import { modules } from '@config';
import { checkJson } from '@core_modules/trackingorder/pages/default/helpers/checkJson';
import { startCase } from 'lodash';

const ModalResult = (props) => {
    // prettier-ignore
    const {
        open, setOpen, t, orders, modalType, modalData,
    } = props;
    const { trackingorder } = modules;

    const content = () => {
        const data = orders.data[0];
        if (orders.data.length > 0) {
            let { detail } = data;
            [detail] = detail;
            const shippingMethods = detail.shipping_methods.shipping_detail;

            const items = [];
            const gosend = detail.shipping_methods.shipping_description?.match(/go-send/i) || '';

            let trackOrder;

            shippingMethods.forEach((method) => {
                const { data_detail } = method;
                if (data_detail) {
                    let dt = data_detail;
                    dt = dt.replace(/'/g, '`');
                    dt = dt.replace(/"/g, "'");
                    dt = dt.replace(/`/g, '"');

                    if (checkJson(dt) && !JSON.parse(dt).errors) {
                        dt = JSON.parse(dt);

                        const listField = gosend ? trackingorder.fieldDetail.gosend : trackingorder.fieldDetail.shipperid;

                        if (
                            modalType.toLowerCase().includes('logistix') ||
                            modalType.toLowerCase().includes('jne') ||
                            modalType.toLowerCase().includes('sap') ||
                            modalType.toLowerCase().includes('shipperid') ||
                            modalType.toLowerCase().includes('anteraja') ||
                            modalType.toLowerCase().includes('popaket')
                        ) {
                            trackOrder = <ShipperView type={modalType} data={modalData} orders={orders} t={t} />;
                        } else {
                            const keys = Object.keys(dt);
                            for (let idx = 0; idx < keys.length; idx += 1) {
                                if (listField.includes(keys[idx])) {
                                    let secondary = dt[keys[idx]];
                                    if (secondary !== null && secondary !== '' && secondary.includes('http')) {
                                        secondary = (
                                            <div className="track-link">
                                                <Link href={secondary} legacyBehavior>
                                                    <a target="_blank" className="item-link">
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span>{t('trackingorder:track')}</span>
                                                            <ArrowTopRightOnSquareIcon className="text-sm" />
                                                        </div>
                                                    </a>
                                                </Link>
                                            </div>
                                        );
                                    }

                                    if (secondary !== null && secondary.length <= 30) {
                                        const date = formatDate(secondary);
                                        if (date !== 'Invalid Date') secondary = date;
                                    }
                                    items.push({
                                        primary: startCase(keys[idx]),
                                        secondary,
                                    });
                                }
                            }
                        }
                    } else {
                        items.push({
                            primary: t('trackingorder:status'),
                            secondary: dt,
                        });
                    }
                }
            });

            return (
                <div className="flex flex-row">
                    <div className="xs:basis-full">
                        {
                            modalData || modalData.length > 0
                                ? (
                                    <div className="list-container">
                                        {trackOrder}
                                        {items.map((item, i) => (
                                            <>
                                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                                    <Typography letter="capitalize" className="clear-margin-padding" style={{ width: '40%' }}>
                                                        {item.primary}
                                                    </Typography>
                                                    <Typography
                                                        variant="span"
                                                        type="regular"
                                                        className="clear-margin-padding"
                                                        style={{ width: '60%' }}
                                                    >
                                                        {item.secondary}
                                                    </Typography>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                )

                                :
                                (
                                    <div className="p-2 bg-yellow-500 text-neutral-white mb-[32px]">{t('trackingorder:noDataAvailable')}</div>
                                )
                        }
                    </div>
                    <style jsx>
                        {`
                            .row :global(.track-link) {
                                display: flex;
                            }
                            .row :global(.track-link > *) {
                                background-color: #eee;
                                padding: 5px;
                                text-decoration: none !important;
                                border-radius: 5px;
                            }
                        `}
                    </style>
                    <style jsx global>
                        {`
                            .label-result {
                                font-size: 20px;
                                margin-top: 30px;
                            }
                            .item-link {
                                font-weight: bold;
                                text-decoration: underline;
                            }
                        `}
                    </style>
                </div>
            );
        }
        return <div className="p-2 bg-yellow-500 text-neutral-white mb-[32px]">{t('trackingorder:orderNotFound')}</div>;
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className="dialog-content">{content()}</div>
            </Dialog>
        </>
    );
};

export default ModalResult;
