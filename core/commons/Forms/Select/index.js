/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import ArrowUp from '@heroicons/react/24/solid/ChevronUpIcon';
import ArrowDown from '@heroicons/react/24/solid/ChevronDownIcon';
import cx from 'classnames';
import { COLORS } from '@theme_vars';
import { useClickAway } from '@uidotdev/usehooks';
import { useState } from 'react';
import Show from '@common_show';

const Select = (props) => {
    const {
        label = '',
        name = '',
        value = '',
        onChange = () => {},
        options = [],
        placeholder = 'Please Select',
        className = '',
        classNameLabel = '',
        error = false,
        errorMessage = '',
        inputProps = {},
        textFiledProps = {},
        optionProps = {},
        required = false,
        ...restProps
    } = props;

    const { className: inputPropsClass, ...restInputProps } = inputProps;
    const { className: textFiledClass, ...restTextFiledProps } = textFiledProps;
    const { className: optionClass, ...restOptionProps } = optionProps;

    const [open, setOpen] = useState(false);
    const ref = useClickAway(() => {
        setOpen(false);
    });

    const selectValue = options?.find((opt) => opt.value === value)?.label ?? value;

    return (
        <div ref={ref} className={cx('relative', open ? 'z-50' : '', className)} {...restProps}>
            {label && typeof label === 'string' ? (
                <Typography variant="bd-2 mb-2" className={cx('uppercase', classNameLabel ?? '')}>
                    {label.replace(/_/g, ' ')}
                    <Show when={required}>
                        <span className={cx('text-red-600')}> *</span>
                    </Show>
                </Typography>
            ) : null}
            {label && typeof label === 'object' ? label : null}
            <TextField
                className={cx('cursor-pointer', textFiledClass || '')}
                rightIcon={!open ? <ArrowDown /> : <ArrowUp />}
                inputProps={{
                    readOnly: true,
                    className: cx('cursor-pointer', inputPropsClass || ''),
                    name,
                    ...restInputProps,
                }}
                hintProps={{
                    displayHintText: error,
                    hintType: error ? 'error' : '',
                    hintText: errorMessage,
                }}
                onClick={() => {
                    setOpen(!open);
                }}
                value={selectValue}
                placeholder={placeholder}
                {...restTextFiledProps}
            />
            {open && options?.length > 0 ? (
                <div
                    className={cx(
                        'w-full',
                        'flex',
                        'flex-col',
                        'py-3',
                        'px-4',
                        'shadow-md',
                        'cursor-pointer',
                        'bg-neutral-white',
                        'z-50',
                        optionClass,
                    )}
                    {...restOptionProps}
                >
                    {options.map((d, idx) => (
                        <div
                            key={idx}
                            className="dropdown-item py-3 px-4 hover:bg-neutral-50"
                            onClick={() => {
                                onChange(d.value);
                                setOpen(false);
                            }}
                        >
                            <Typography variant="bd-2b" className="">
                                {d.label}
                            </Typography>
                        </div>
                    ))}
                </div>
            ) : null}
            <style jsx>
                {`
                    .dropdown-item:hover > :global(span) {
                        color: ${COLORS.primary.DEFAULT} !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Select;
