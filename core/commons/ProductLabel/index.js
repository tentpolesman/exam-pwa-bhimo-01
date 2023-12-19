/* eslint-disable camelcase */
import React from 'react';
import Badge from '@common_badge';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';

const generateNew = ({ newFromDate, newToDate }) => {
    let showLabelNew = false;
    const nowTime = new Date(Date.now()).getTime();
    if (newFromDate === null && newToDate === null) {
        showLabelNew = false;
    }

    if (newFromDate !== null && newToDate === null) {
        const startTime = new Date(newFromDate).getTime();
        if (nowTime >= startTime) {
            showLabelNew = true;
        }
    }

    if (newFromDate === null && newToDate !== null) {
        const endTime = new Date(newToDate).getTime();
        if (nowTime <= endTime) {
            showLabelNew = true;
        }
    }

    if (newFromDate !== null && newToDate !== null) {
        const startTime = new Date(newFromDate).getTime();
        const endTime = new Date(newToDate).getTime();
        if (nowTime >= startTime && endTime >= nowTime) {
            showLabelNew = true;
        }
    }

    return showLabelNew;
};

const generateSale = ({
    specialFromDate, specialToDate,
}) => {
    let validSpecial = false;
    const nowTime = new Date(Date.now()).getTime();
    if (specialFromDate && specialFromDate !== null) {
        const startTime = new Date(specialFromDate).getTime();
        validSpecial = true;
        if (nowTime < startTime) validSpecial = false;
    }
    if (specialToDate && specialToDate !== null) {
        const endTime = new Date(specialToDate).getTime();
        validSpecial = true;
        if (nowTime > endTime) validSpecial = false;
    }
    return validSpecial;
};

const ProductLabel = ({
    className,
    classNameBadge,
    config,
    priceRange,
    specialFromDate,
    specialToDate,
    newFromDate,
    newToDate,
    fontSizeBadge,
}) => {
    const { t } = useTranslation(['common']);
    const showLabelNew = generateNew({ newFromDate, newToDate });
    const showSale = generateSale({ priceRange, specialFromDate, specialToDate });

    return (
        <div className={cx('product-label', className)}>
            {
                (config.enable && config.new.enable && showLabelNew) && (
                    <Badge
                        bold
                        success
                        className={cx('product-label-new', classNameBadge)}
                        label={t('common:title:new')}
                        fontSize={fontSizeBadge}
                    />
                )
            }
            {
                (config.enable && config.sale.enable && showSale) && (
                    <Badge
                        bold
                        danger
                        className={cx('product-label-sale', showLabelNew && 'mt-[4px]', classNameBadge)}
                        label={`${t('common:title:sale')}!`}
                        fontSize={fontSizeBadge}
                    />
                )
            }
        </div>
    );
};

export default ProductLabel;
