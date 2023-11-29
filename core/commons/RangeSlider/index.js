import { formatPrice } from '@helper_currency';
import cx from 'classnames';

// eslint-disable-next-line object-curly-newline
const RangeSlider = ({ disabled = false, onChange = () => {}, value = [0, 10], storeConfig }) => {
    const min = value[0];
    const max = value[1];
    const [minVal, setMinVal] = React.useState(min);
    const [maxVal, setMaxVal] = React.useState(max);
    const minValRef = React.useRef(min);
    const maxValRef = React.useRef(max);
    const range = React.useRef(null);

    const getPercent = React.useCallback((valueX) => Math.round(((valueX - min) / (max - min)) * 100), [min, max]);

    React.useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    React.useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    return (
        <>
            <div className={cx('container', 'h-[100vh]', 'flex', 'items-center', 'justify-center')}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={(event) => {
                        const valueMin = Math.min(Number(event.target.value), maxVal - 1);
                        setMinVal(valueMin);
                        onChange([valueMin, maxVal]);
                        minValRef.current = valueMin;
                    }}
                    disabled={disabled}
                    className={cx('thumb', 'thumb--left', 'pointer-events-none', 'absolute', 'h-[0]', 'w-[350px]', 'outline-none', 'z-[3]')}
                    style={{
                        zIndex: minVal > max - 100 && '5',
                    }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={(event) => {
                        const valueMax = Math.max(Number(event.target.value), minVal + 1);
                        setMaxVal(valueMax);
                        onChange([minVal, valueMax]);
                        maxValRef.current = valueMax;
                    }}
                    disabled={disabled}
                    className={cx('thumb', 'thumb--right', 'pointer-events-none', 'absolute', 'h-[0]', 'w-[350px]', 'outline-none', 'z-[4]')}
                />

                <div className={cx('slider', 'relative', 'w-[350px]')}>
                    <div className={cx('slider__track', 'absolute', 'rounded', 'h-[5px]', 'bg-neutral-200', 'w-[100%]', 'z-[1]')} />
                    <div ref={range} className={cx('slider__range', 'absolute', 'rounded', 'h-[5px]', 'bg-primary-700', 'z-[2]')} />
                    <div
                        className={cx(
                            'slider__left-value',
                            'absolute',
                            'text-neutral-black',
                            'text-2md',
                            'mt-[-70px]',
                            'left-[0px]',
                            'py-[8px]',
                            'px-[10px]',
                            'rounded',
                            'border-2',
                            'border-neutral-400',
                            'min-w-[120px]',
                        )}
                    >
                        {formatPrice(minVal, storeConfig && storeConfig.base_currency_code)}
                    </div>
                    <div className={cx('separator', 'absolute', 'text-neutral-black', 'text-2md', 'left-[auto]', 'right-[50%]', 'mt-[-60px]')}>-</div>
                    <div
                        className={cx(
                            'slider__right-value',
                            'absolute',
                            'text-neutral-black',
                            'text-2md',
                            'mt-[-70px]',
                            'right-[0px]',
                            'py-[8px]',
                            'px-[10px]',
                            'rounded',
                            'border-2',
                            'border-neutral-400',
                            'min-w-[120px]',
                        )}
                    >
                        {formatPrice(maxVal, storeConfig && storeConfig.base_currency_code)}
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    /* Removing the default appearance - cannot be done by tailwind */
                    .thumb,
                    .thumb::-webkit-slider-thumb {
                        -webkit-appearance: none;
                    }

                    /* For Chrome browsers */
                    .thumb::-webkit-slider-thumb {
                        background-color: white;
                        border: 1.5px solid #be1f93;
                        border-radius: 50%;
                        cursor: pointer;
                        height: 24px;
                        width: 24px;
                        margin-top: 4px;
                        pointer-events: all;
                        position: relative;
                    }

                    /* For Firefox browsers */
                    .thumb::-moz-range-thumb {
                        background-color: white;
                        border: 1.5px solid #be1f93;
                        border-radius: 50%;
                        cursor: pointer;
                        height: 24px;
                        width: 24px;
                        margin-top: 4px;
                        pointer-events: all;
                        position: relative;
                    }
                `}
            </style>
        </>
    );
};

export default RangeSlider;
