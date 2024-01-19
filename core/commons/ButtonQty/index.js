/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable radix */
import React from 'react';
import cx from 'classnames';

const ButtonActionQty = ({
    disabled,
    onClick,
    label,
    className,
}) => (
    <button
        type="button"
        onClick={disabled ? () => {} : onClick}
        className={
            cx(
                'button-qty-minus',
                'p-[6px]',
                'w-[32px]',
                'h-[32px]',
                'rounded-[6px]',
                'flex',
                'items-center',
                'justify-center',
                'gap-[24px]',
                'duration-500',
                'hover:bg-neutral-50 hover:text-primary-300',
                disabled && 'text-neutral-300 hover:text-neutral-300 cursor-default',
                className,
            )
        }
    >
        {label}
    </button>
);

const ButtonQty = ({
    value = 1,
    onChange,
    max = 100,
    disabled = false,
    width = 120,
    classNameBtnMinus,
    classNameBtnPlus,
    classNameInput,
    classNameInputContainer,
}) => {
    const [localValue, setLocalValue] = React.useState(value);
    const disabledMin = disabled || localValue === 1;
    const disableMax = disabled || localValue === max;

    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleMinus = () => {
        if (!disabled && localValue > 1 && localValue <= max) {
            if (onChange) {
                onChange(localValue - 1);
            }
            setLocalValue(parseInt(localValue, 0) - 1);
        }
    };
    const handlePlus = () => {
        if (!disabled && localValue > 0 && localValue < max) {
            if (onChange) {
                onChange(localValue + 1);
            }
            setLocalValue(parseInt(localValue, 0) + 1);
        }
    };

    const handleLocalChange = (event) => {
        const val = parseInt(event.target.value, 0);
        if (val < 1) {
            window.toastMessage({
                open: true,
                text: 'Min input 1',
                variant: 'error',
            });
        } else if (val > max) {
            window.toastMessage({
                open: true,
                text: `Max input ${max}`,
                variant: 'error',
            });
        } else {
            if (onChange) {
                onChange(val);
            }
            setLocalValue(parseInt(val, 0));
        }
    };

    return (
        <div
            style={{
                ...(width ? { width } : null),
            }}
            className={cx(
                'button-qty',
                'grid',
                'grid grid-cols-3',
                'justify-center',
                'border-[1px]',
                'rounded-[8px]',
                'gap-[7px]',
                'p-[4px]',
                'border-neutral-200',
                'xs:!max-w-[118px]',
                'sm:!max-w-[initial]',
                classNameInputContainer,
            )}
        >

            <ButtonActionQty
                className={cx('mx-auto', classNameBtnMinus)}
                label="-"
                disabled={disabledMin}
                onClick={handleMinus}
            />
            <input
                type="number"
                value={localValue}
                disabled={disabled}
                onChange={handleLocalChange}
                className={
                    cx(
                        'btn-qty-input',
                        'text-center',
                        '!font-pwa-default',
                        'bg-neutral-white focus:outline-none',
                        'h-[100%]',
                        'w-[100%]',
                        '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                        'disabled:text-neutral-300',
                        classNameInput,
                    )
                }
            />
            <ButtonActionQty
                className={cx('mx-auto', classNameBtnPlus)}
                label="+"
                onClick={handlePlus}
                disabled={disableMax}
            />
        </div>
    );
};

export default ButtonQty;
