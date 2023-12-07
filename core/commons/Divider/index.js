import cx from 'classnames';

const Divider = ({
    height,
    width = '100%',
    color = 'bg-neutral-200',
    className,
}) => (
    <div
        style={{
            ...(height ? { height } : null),
            ...(width ? { width } : null),
        }}
        className={cx(
            'h-[1px] w-[100%] ',
            color,
            className,
        )}
    />
);

export default Divider;
