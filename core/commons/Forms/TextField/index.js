import Icon from '@common_icon';
import Typography from '@common_typography';
import cx from 'classnames';
import { useState } from 'react';

const TextField = (props) => {
    const {
        placeholder = '',
        disabled = false,
        onChange = () => {},
        value = '',
        className = '',
        label = '',
        hintProps = {},
        iconProps = {},
        inputProps = {},
        type = 'text',
        readOnly = false,
        ...restProps
    } = props;

    const [isFocus, setIsFocus] = useState(false);

    const { displayHintText = false, hintType = '', hintText = '' } = hintProps;
    const {
        leftIcon = '', leftIconClasses = '', rightIcon = '', rightIconClasses = '',
    } = iconProps;

    const generateRightIcon = () => {
        if (hintType === 'error') {
            return 'warning';
        }
        if (hintType === 'warning') {
            return 'error';
        }
        if (hintType === 'success') {
            return 'task_alt';
        }

        return rightIcon;
    };

    if (value) inputProps.value = value;
    if (onChange) inputProps.onChange = onChange;
    const { className: inputClassName, ...restInputProps } = inputProps;

    return (
        <div className="flex flex-col relative">
            {label ? (
                <label className="mb-2">
                    <Typography variant="h4">{label}</Typography>
                </label>
            ) : null}
            <div
                className={cx(
                    'flex',
                    'items-center',
                    'w-[320px]',
                    'bg-neutral-white',
                    'border-[1px]',
                    'border-neutral-100',
                    'rounded-lg',
                    'text-md',
                    'hover:border-primary-100',
                    {
                        '!border-primary-200': isFocus && !hintType,
                        '!bg-neutral-50 border-none placeholder:!text-neutral-100': disabled,
                        '!border-accent-red_orange hover:!border-accent-red_orange': hintType === 'error',
                        '!border-accent-saffron_mango': hintType === 'warning',
                        '!border-accent-eucalyptus-200': hintType === 'success',
                    },
                    className,
                )}
                {...restProps}
            >
                {leftIcon ? <Icon icon={leftIcon} className={cx('pl-4', 'pr-[6px]', 'text-neutral-300', leftIconClasses)} /> : null}
                <input
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    className={cx(
                        'pr-4',
                        'py-[10px]',
                        'w-full',
                        'rounded-lg',
                        'focus:outline-0',
                        'placeholder:text-neutral-200',
                        {
                            'placeholder:!text-neutral-400': isFocus,
                            '!pl-4': !leftIcon,
                            '!pr-0': rightIcon,
                        },
                        inputClassName,
                    )}
                    {...restInputProps}
                />
                {rightIcon ? (
                    <Icon
                        icon={generateRightIcon()}
                        className={cx(
                            'pr-4',
                            'pl-[6px]',
                            'text-neutral-300',
                            {
                                '!text-accent-red_orange-100': hintType === 'error',
                                '!text-accent-saffron_mango-200': hintType === 'warning',
                                '!text-accent-eucalyptus-200': hintType === 'success',
                            },
                            rightIconClasses,
                        )}
                    />
                ) : null}
            </div>
            {displayHintText && hintType && hintText ? (
                <Typography
                    variant="bd-2b"
                    className={cx('absolute', '-bottom-[50%]', '-z-10', {
                        '!text-accent-red_orange': hintType === 'error',
                        '!text-accent-saffron_mango': hintType === 'warning',
                        '!text-accent-eucalyptus-200': hintType === 'success',
                    })}
                >
                    {hintText}
                </Typography>
            ) : null}
        </div>
    );
};

export default TextField;
