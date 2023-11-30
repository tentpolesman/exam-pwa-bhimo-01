/* eslint-disable jsx-a11y/click-events-have-key-events */
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import cx from 'classnames';

const RatingStar = ({
    value = 1, maxvalue = 5, onChange = () => {}, disabled = true, sizeIcon = 'sm', miniSummary = false,
}) => {
    const icon = [];

    const classes = cx('hover:cursor-pointer', {
        'w-[20px] h-[20px]': sizeIcon === 'sm',
        'w-[24px] h-[24px]': sizeIcon === 'md',
        'w-[28px] h-[28px]': sizeIcon === 'lg',
    });

    if (miniSummary) {
        return (
            <div role="button" className={cx('mr-0', 'p-0')} disabled={disabled}>
                <StarIcon className={cx('text-yellow-400', classes)} />
            </div>
        );
    }

    for (let ind = 1; ind <= maxvalue; ind += 1) {
        if (ind <= value) {
            icon.push(
                <div role="button" className={cx('mr-0', 'p-0')} key={ind} disabled={disabled} onClick={() => onChange(ind)}>
                    <StarIcon className={cx('text-yellow-400', classes)} />
                </div>,
            );
        } else {
            icon.push(
                <div role="button" className={cx('mr-0', 'p-0')} key={ind} disabled={disabled} onClick={() => onChange(ind)}>
                    <StarIcon className={cx('text-neutral-200', classes)} />
                </div>,
            );
        }
    }
    return <div className={cx('flex', 'flex-row')}>{icon.map((Item) => Item)}</div>;
};

export default RatingStar;
