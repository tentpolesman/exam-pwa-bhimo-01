/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Typography from '@common_typography';
import cx from 'classnames';
import { useEffect, useState } from 'react';

const CheckBox = (props) => {
    const {
        // type,
        label = '',
        data = [],
        value = [],
        // CustomItem, // todo: readd this, need to review first
        disabled = false,
        onChange = () => {},
        classNames = {},
        useLoadMore = false,
        size = 'md',
    } = props;
    const { checkboxClasses = '', checkboxGroupClasses = '' } = classNames;
    const [selected, setSelected] = useState(value);
    const [more, setMore] = useState(7);
    const [mappedData, setMappedData] = useState(data);

    useEffect(() => {
        if (useLoadMore) {
            setMappedData(data?.slice(0, more));
        }
    }, [useLoadMore, more, data]);

    // handle load more and load less list data
    const handleMore = () => {
        setMore(more + 7);
    };

    const handleLess = () => {
        setMore(more - 7);
    };

    // TODO: what is this? this causes a lot of rerender as of now, might be missing something
    // change value from parent => change state selected
    // useEffect(() => {
    //     setSelected(value);
    // }, [value]);

    const setCheckedFilter = (v) => {
        if (selected.indexOf(v) !== -1) {
            selected.splice(selected.indexOf(v), 1);
        } else {
            selected.push(v);
        }
        onChange(selected);
        setSelected([...selected]);
    };

    return (
        <div className="flex flex-col">
            {label ? (
                <Typography variant="bd-2" className="uppercase">
                    {label}
                </Typography>
            ) : null}
            <div className={cx('flex', 'flex-col', 'mt-2', checkboxGroupClasses)}>
                {/* <CustomItem
                    variant={type}
                    label={item.label ? item.label : item}
                    value={item.value ? item.value : item}
                    dataValues={selected}
                    key={index}
                    onChange={(val) => !disabled && setCheckedFilter(val)}
                    {...item}
                /> */}
                {mappedData.map((item, idx) => (
                    <div key={idx} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            disabled={disabled}
                            className={cx(
                                'form-checkbox',
                                'w-4',
                                'h-4',
                                'mr-2',
                                'rounded-[4px]',
                                'text-primary',
                                'border-solid',
                                'border-[1px]',
                                'border-neutral-400',
                                'hover:border-primary',
                                'hover:bg-primary-100',
                                'focus:ring-0',
                                'focus:border-primary',
                                'focus:shadow-[0_0_0_4px]',
                                'focus:shadow-primary-100',
                                'focus:ring-offset-0',
                                {
                                    'hover:!border-neutral-400 hover:!bg-neutral-white': disabled,
                                    'w-5 h-5': size === 'md',
                                    'w-6 h-6': size === 'lg',
                                },
                                checkboxClasses,
                            )}
                            value={item.value}
                            onChange={(e) => setCheckedFilter(e.target.value)}
                            checked={selected.indexOf(item.value) !== -1}
                        />
                        <label>
                            <Typography
                                variant="bd-1b"
                                className={cx({
                                    '!text-neutral-300': disabled,
                                })}
                            >
                                {item.label}
                            </Typography>
                        </label>
                    </div>
                ))}
            </div>
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

export default CheckBox;
