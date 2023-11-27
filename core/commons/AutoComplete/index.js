/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-lonely-if */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
// import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import CommonTextField from '@common_forms/TextField';
// import Icon from '@common_icon';
import Popover from '@common_popover';
import cx from 'classnames';

const CustomAutocomplete = (props) => {
    const {
        disabled,
        label,
        labelKey,
        loading,
        name,
        onChange,
        value,
        primaryKey,
        className,
        enableCustom,
        placeholder,
        CustomPopover,
        itemOptions,
        useKey,
    } = props;

    const { t } = useTranslation(['common']);

    const [open, setOpen] = React.useState(false);

    const [filteredItem, setFilteredItem] = React.useState(itemOptions);
    const inputRef = React.useRef(null);

    const handleAutocomplete = (e) => {
        if (e.target.value !== '') {
            const isFound = filteredItem.find((item) => {
                if (useKey) {
                    return item[labelKey].toLowerCase().includes(e.target.value.toLowerCase());
                }
                return item.toLowerCase().includes(e.target.value.toLowerCase());
            });
            if (isFound) {
                const filteredArray = filteredItem.filter((item) => {
                    if (useKey) {
                        return item[labelKey].toLowerCase().includes(e.target.value.toLowerCase());
                    }
                    return item.toLowerCase().includes(e.target.value.toLowerCase());
                });
                setFilteredItem(filteredArray);
                setOpen(true);
            }
        } else {
            setFilteredItem(itemOptions);
        }
    };

    const PopoverContent = () => {
        const PopoverItem = (propsPopoverItem) => {
            let optionLabel;
            // eslint-disable-next-line no-unused-vars
            let optionValue;

            if (useKey) {
                optionLabel = propsPopoverItem.item[labelKey].toUpperCase();
                optionValue = propsPopoverItem.item[primaryKey];
            } else {
                optionLabel = propsPopoverItem.optionLabel.toUpperCase();
                optionValue = propsPopoverItem.optionValue;
            }

            const handleSelectItem = () => {
                onChange(optionLabel.toUpperCase());
                setOpen(false);
            };

            return (
                <div
                    className={cx('grid', 'py-4', 'text-neutral-300', 'hover:text-primary-300', 'hover:bg-neutral-50', 'hover:cursor-pointer')}
                    onClick={() => handleSelectItem(propsPopoverItem)}
                    role="presentation"
                >
                    <div className={cx('title-category', 'block', 'text-sm', 'uppercase')}>{optionLabel}</div>
                </div>
            );
        };

        return (
            <>
                {open && value.length !== 0 && (filteredItem === null || (typeof filteredItem === 'object' && filteredItem.length === 0)) ? (
                    <div className={cx('breadcrumbs', 'block', 'text-sm', 'text-neutral-200', 'uppercase', 'italic')}>
                        {t('common:error:notFound')}
                    </div>
                ) : (
                    filteredItem !== null && filteredItem.map((items, index) => <PopoverItem item={items} key={index} />)
                )}
            </>
        );
    };

    return (
        <div cx={className}>
            <Popover content={enableCustom ? <CustomPopover /> : <PopoverContent />} open={open && !loading} setOpen={setOpen}>
                <CommonTextField
                    value={value}
                    placeholder={placeholder || t('common:search:title')}
                    onChange={(e) => {
                        onChange(e.target.value);
                        handleAutocomplete(e);
                    }}
                    ref={inputRef}
                    iconProps={{
                        rightIcon: 'search',
                        rightIconClasses: 'text-neutral-300',
                    }}
                    disabled={disabled}
                    label={label}
                    name={name}
                />
            </Popover>
        </div>
    );
};

export default CustomAutocomplete;
