import Typography from '@common_typography';
import cx from 'classnames';
import { useState } from 'react';

const TextArea = (props) => {
    const {
        placeholder = '', label = '', disabled, value, onChange = () => {}, hintProps = {}, inputProps = {}, className = '',
    } = props;
    const [isFocus, setIsFocus] = useState(false);

    const { displayHintText = false, hintType = '', hintText = '' } = hintProps;

    if (value) inputProps.value = value;
    if (onChange) inputProps.onChange = onChange;
    const { className: inputClassName, ...restInputProps } = inputProps;

    return (
        <div className={cx('flex', 'flex-col', className)}>
            {label ? (
                <label className="mb-2">
                    <Typography variant="h4">{label}</Typography>
                </label>
            ) : null}
            <textarea
                placeholder={placeholder}
                className={cx(
                    'items-center',
                    'w-[320px]',
                    'bg-neutral-white',
                    'border-[1px]',
                    'border-neutral-100',
                    'rounded-lg',
                    'text-md',
                    'hover:border-primary-100',
                    'py-[10px]',
                    'px-4',
                    {
                        '!border-primary-200': isFocus && !hintType,
                        '!bg-neutral-50 border-none placeholder:!text-neutral-100': disabled,
                        '!border-accent-red_orange hover:!border-accent-red_orange': hintType === 'error',
                        '!border-accent-saffron_mango': hintType === 'warning',
                        '!border-accent-eucalyptus-200': hintType === 'success',
                    },
                    inputClassName,
                )}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                {...restInputProps}
            />
            {displayHintText && hintType && hintText ? (
                <Typography
                    variant="bd-2b"
                    className={cx('my-2', {
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

export default TextArea;
