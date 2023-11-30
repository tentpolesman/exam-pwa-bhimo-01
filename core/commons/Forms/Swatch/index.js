/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import cx from 'classnames';

const Swatch = ({
    variant = 'text',
    disabled,
    label = '',
    value = '',
    dataValues = [],
    onChange = () => {},
}) => {
    const isColor = variant === 'color';
    const checked = dataValues.indexOf(value) !== -1;

    const handleChange = () => {
        onChange(value);
    };

    if (isColor) {
        return (
            <div
                key="swatches-color-selector"
                role="button"
                style={{
                    ...(label ? { backgroundColor: label } : '#fff'),
                }}
                onClick={handleChange}
                className={cx(
                    'swatcher-color',
                    'border-[1px]',
                    checked ? 'border-primary-700' : 'border-neutral-400',
                    disabled && 'border-yellow-400',
                    'flex',
                    'justify-center',
                    'items-center',
                    'rounded-[999px]',
                    'h-[34px]',
                    'w-[34px]',
                )}
            >
                {
                    disabled && (
                        <span className={cx('material-symbols-outlined', 'text-red-600')}>
                            close
                        </span>
                    )
                }
            </div>
        );
    }

    return (
        <div
            key="swatches-text-selector"
            role="button"
            className={cx(
                !disabled ? (checked ? 'border-primary-700 text-primary-700' : 'border-neutral-200 text-neutral-700') : '',
                disabled && 'bg-neutral-50 border-neutral-200 text-neutral-200',
                'swatches-text',
                'border-[1px]',
                'rounded-[6px]',
                'py-[6px] px-[12px]',
                'relative',
                'uppercase',
                'text-center',
            )}
        >
            {label}
        </div>
    );
};

export default Swatch;
