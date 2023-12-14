/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { COLORS } from '@theme_vars';
import { useClickAway } from '@uidotdev/usehooks';
import cx from 'classnames';
import { useState } from 'react';
import ArrowUp from '@heroicons/react/24/solid/ChevronUpIcon';
import ArrowDown from '@heroicons/react/24/solid/ChevronDownIcon';

const Select = (props) => {
    const {
        label = '',
        name = '',
        value = '',
        onChange = () => {},
        options = [],
        placeholder = 'Please Select',
        className = '',
        error = false,
        errorMessage = '',
        inputProps = {},
        textFiledProps = {},
        ...restProps
    } = props;

    const { className: inputPropsClass, ...restInputProps } = inputProps;
    const { className: textFiledClass, ...restTextFiledProps } = textFiledProps;

    const [open, setOpen] = useState(false);
    const ref = useClickAway(() => {
        setOpen(false);
    });

    return (
        <div ref={ref} className={cx('relative', open ? 'z-50' : '', className)} {...restProps}>
            {label && typeof label === 'string' ? (
                <Typography variant="bd-2 mb-2" className="uppercase">
                    {label.replace(/_/g, ' ')}
                </Typography>
            ) : null}
            {label && typeof label === 'object' ? (
                label
            ) : null}
            <TextField
                className={cx('cursor-pointer', textFiledClass || '')}
                rightIcon={!open ? <ArrowDown /> : <ArrowUp />}
                inputProps={{
                    readOnly: true,
                    className: (cx('cursor-pointer', inputPropsClass || '')),
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
                value={value}
                placeholder={placeholder}
                {...restTextFiledProps}
            />
            {open && options?.length > 0 ? (
                <div className={cx('w-full', 'flex', 'flex-col', 'py-3', 'px-4', 'shadow-md', 'cursor-pointer', 'bg-neutral-white', 'z-50')}>
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
