/* eslint-disable operator-linebreak */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Typography from '@common_typography';
import Radio from '@common_forms/Radio';
import cx from 'classnames';
import propTypes from 'prop-types';
import { getCartId } from '@helper_cartid';
import { getLocalStorage } from '@helper_localstorage';
import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';

const RadioItem = (props) => {
    const { value, label, className } = props;
    const customStyle = cx('form-control-label', className);
    return <div value={value || ''} control={<Radio color="default" size="small" />} label={label || ''} className={customStyle} />;
};

// Inspired by blueprintjs
function CustomRadio({
    valueData = [],
    onChange = () => { },
    value = '',
    name = 'radio',
    ariaLabel = 'radio',
    label = '',
    CustomItem,
    className = {},
    classContainer = {},
    classItem = {},
    flex = 'column',
    error = false,
    errorMessage = '',
    propsItem = {},
    disabled = false,
    ComponentOptional = () => { },
    storeConfig,
    isShipping = false,
}) {
    const storeConfigLocalStorage = useReactiveVar(storeConfigVar);

    const rootStyle = cx('m-0 mb-[10px] w-full flex flex-col', className);
    const containerStyle = cx(
        'flex mb-0',
        flex === 'column' && 'flex-column',
        flex === 'row' && 'flex-row',
        classContainer,
    );

    const handleChange = (event) => {
        !disabled && onChange(event.target.value);
    };

    const handleChangeCustom = (val) => {
        !disabled && onChange(val);
    };
    return (
        <div className={rootStyle}>
            <Typography className="font-bold uppercase">
                {label}
            </Typography>
            <Radio
                ariaLabel={ariaLabel}
                name={name}
                value={value}
                onChange={handleChange}
                classes={{
                    root: containerStyle,
                }}
            >
                {valueData.map((item, index) => {
                    if (CustomItem) {
                        if (storeConfigLocalStorage.enable_oms_multiseller === '1') {
                            let isTrue;
                            let itemValue;
                            let matchDataValue;
                            const cartIdCookie = getCartId();
                            const checkoutShippingMethod = getLocalStorage('checkout_shipping_method');

                            if (isShipping) {
                                if (value && value.length > 0) {
                                    if (!value[0].seller_id && checkoutShippingMethod && checkoutShippingMethod.length > 0) {
                                        const matchData = checkoutShippingMethod.find((items) => items.cartId === cartIdCookie);
                                        if (matchData && matchData.data && matchData.data.length === value.length) {
                                            if (matchData.data[0].name.method_code === value[0].name.method_code) {
                                                itemValue = `${item.value.split('_')[1]}_${item.value.split('_')[2]}`;
                                                matchDataValue = matchData.data.find((items) => items.seller_id === item.value.split('_')[2]);
                                                isTrue = itemValue === `${matchDataValue.name.method_code}_${matchDataValue.seller_id}`;
                                                return (
                                                    <>
                                                        <CustomItem
                                                            key={index}
                                                            {...item}
                                                            selected={isTrue}
                                                            onChange={handleChangeCustom}
                                                            className={classItem}
                                                            storeConfig={storeConfig}
                                                            {...propsItem}
                                                        />
                                                        {ComponentOptional(item)}
                                                    </>
                                                );
                                            }
                                        } else {
                                            isTrue = false;
                                        }
                                    } else {
                                        isTrue = false;
                                    }

                                    itemValue = `${item.value.split('_')[1]}_${item.value.split('_')[2]}`;
                                    if (value.find((items) => items.seller_id === item.value.split('_')[2])) {
                                        isTrue =
                                            itemValue ===
                                            `${value.find((items) => items.seller_id === item.value.split('_')[2]).name.method_code}_${value.find((items) => items.seller_id === item.value.split('_')[2]).seller_id
                                            }`;
                                    } else {
                                        isTrue = false;
                                    }
                                } else {
                                    isTrue = false;
                                }
                                return (
                                    <>
                                        <CustomItem
                                            key={index}
                                            {...item}
                                            selected={isTrue}
                                            onChange={handleChangeCustom}
                                            className={classItem}
                                            storeConfig={storeConfig}
                                            {...propsItem}
                                        />
                                        {ComponentOptional(item)}
                                    </>
                                );
                            }

                            return (
                                <>
                                    <CustomItem
                                        key={index}
                                        {...item}
                                        selected={JSON.stringify(value) === JSON.stringify(item.value)}
                                        onChange={handleChangeCustom}
                                        className={classItem}
                                        storeConfig={storeConfig}
                                        {...propsItem}
                                    />
                                    {ComponentOptional(item)}
                                </>
                            );
                        }
                        return (
                            <>
                                <CustomItem
                                    key={index}
                                    {...item}
                                    selected={JSON.stringify(value) === JSON.stringify(item.value)}
                                    onChange={handleChangeCustom}
                                    className={classItem}
                                    storeConfig={storeConfig}
                                    {...propsItem}
                                />
                                {ComponentOptional(item)}
                            </>
                        );
                    }
                    return <RadioItem key={index} {...item} {...propsItem} className={classItem} />;
                })}
            </Radio>
            {error && (
                <Typography variant="p" color="red">
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
}

CustomRadio.propTypes = {
    valueData: propTypes.array.isRequired,
    onChange: propTypes.func,
    value: propTypes.array,
    name: propTypes.string,
    ariaLabel: propTypes.string,
    label: propTypes.string,
    CustomItem: propTypes.element.isRequired,
    className: propTypes.object,
    classContainer: propTypes.object,
    classItem: propTypes.object,
    flex: propTypes.string,
    error: propTypes.bool,
    errorMessage: propTypes.string,
    propsItem: propTypes.object,
    disabled: propTypes.bool,
    ComponentOptional: propTypes.func,
    storeConfig: propTypes.object.isRequired,
    isShipping: propTypes.bool,
};

CustomRadio.defaultProps = {
    onChange: () => { },
    value: '',
    name: 'radio',
    ariaLabel: 'radio',
    label: '',
    className: {},
    classContainer: {},
    classItem: {},
    flex: 'column',
    error: false,
    errorMessage: '',
    propsItem: {},
    disabled: false,
    ComponentOptional: () => { },
    isShipping: false,
};

export default CustomRadio;
