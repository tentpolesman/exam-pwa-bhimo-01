/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Typography from '@common_typography';
import cx from 'classnames';
import { useEffect, useState } from 'react';

const Radio = (props) => {
    const {
        data = [],
        onChange = () => {},
        value = '',
        name = 'radio',
        ariaLabel = 'radio',
        label = '',
        CustomItem,
        className = {},
        classNames = {},
        error = false,
        errorMessage = '',
        disabled = false,
        CustomLabel,
        useLoadMore = false,
        ComponentOptional = () => {},
        storeConfig,
        size = 'md',
        customItemProps = {},
    } = props;
    const { radioGroupClasses = '', radioClasses = '' } = classNames;
    const [more, setMore] = useState(7);
    const [mappedData, setMappedData] = useState(data);

    useEffect(() => {
        if (useLoadMore) {
            setMappedData(data?.slice(0, more));
        }
    }, [useLoadMore, more, data]);

    const labelVariant = {
        sm: 'bd-2b',
        md: 'bd-1a',
        lg: 'bd-1',
    };

    // handle load more and load less list data
    const handleMore = () => {
        setMore(more + 7);
    };

    const handleLess = () => {
        setMore(more - 7);
    };

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const handleChangeCustom = (val) => {
        !disabled && onChange(val);
    };
    return (
        <div className={cx('m-0 mb-[10px] flex flex-col', className)}>
            {label ? (
                CustomLabel ? (
                    <CustomLabel />
                ) : (
                    <Typography variant="bd-2" className="uppercase">
                        {label.replace(/_/g, ' ')}
                    </Typography>
                )
            ) : null}
            <div className={cx('flex', 'flex-col', 'mt-2', radioGroupClasses)}>
                {mappedData.map((item, index) => {
                    if (CustomItem) {
                        return (
                            <>
                                <CustomItem
                                    key={index}
                                    {...item}
                                    selected={JSON.stringify(value) === JSON.stringify(item.value)}
                                    onChange={handleChangeCustom}
                                    storeConfig={storeConfig}
                                    {...customItemProps}
                                />
                                {ComponentOptional(item)}
                            </>
                        );
                    }

                    return (
                        <div className="flex items-center mb-1">
                            <input
                                type="radio"
                                disabled={disabled}
                                className={cx(
                                    'form-radio',
                                    'w-4',
                                    'h-4',
                                    'mr-2',
                                    'text-primary',
                                    'border-solid',
                                    'border-[1px]',
                                    'border-neutral-150',
                                    'hover:border-neutral-300',
                                    'hover:text-primary-200',
                                    'focus:ring-0',
                                    'focus:border-primary',
                                    'focus:shadow-[0_0_0_4px]',
                                    'focus:shadow-primary-50',
                                    'focus:ring-offset-0',
                                    'checked:bg-[length:150%]',
                                    {
                                        'hover:!text-neutral-100 !border-neutral-150 checked:!bg-[length:0] checked:!text-neutral-100': disabled,
                                        'w-5 h-5': size === 'md',
                                        'w-6 h-6': size === 'lg',
                                    },
                                    radioClasses,
                                )}
                                name={name}
                                ariaLabel={ariaLabel}
                                value={item.value}
                                checked={item.value === value}
                                onChange={handleChange}
                            />
                            <label>
                                <Typography variant={labelVariant[size]}>{item.label}</Typography>
                            </label>
                        </div>
                    );
                })}
            </div>
            {error && <Typography className="text-accent-red_orange">{errorMessage}</Typography>}

            {useLoadMore && data.length > 7 && more <= 7 && (
                <a onClick={handleMore} className="mt-[10px] text-right cursor-pointer">
                    <Typography className="underline">See more</Typography>
                </a>
            )}
            {useLoadMore && more > 7 && (
                <a onClick={handleLess} className="mt-[10px] text-right cursor-pointer">
                    <Typography className="underline">See less</Typography>
                </a>
            )}
        </div>
    );
};

export default Radio;
