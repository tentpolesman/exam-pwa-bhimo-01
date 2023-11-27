/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { COLORS } from '@theme_vars';
import { useClickAway } from '@uidotdev/usehooks';
import cx from 'classnames';
import { useState } from 'react';

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
        ...restProps
    } = props;

    const [open, setOpen] = useState(false);
    const ref = useClickAway(() => {
        setOpen(false);
    });

    return (
        <div ref={ref} className={cx('relative', className)} {...restProps}>
            {label ? (
                <Typography variant="bd-2" className="uppercase">
                    {label.replace(/_/g, ' ')}
                </Typography>
            ) : null}
            <TextField
                className="cursor-pointer mt-2"
                iconProps={{
                    rightIcon: !open ? 'expand_more' : 'expand_less',
                }}
                inputProps={{
                    readOnly: true,
                    className: 'cursor-pointer',
                    name,
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
            />
            {open && options?.length > 0 ? (
                <div className={cx('w-full', 'flex', 'flex-col', 'py-3', 'px-4', 'shadow-md-500', 'cursor-pointer', 'bg-neutral-white', 'z-auto')}>
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
