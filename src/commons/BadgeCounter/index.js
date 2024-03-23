import cx from 'classnames';

const BadgeCounter = (props) => {
    const { className, value = 0, children } = props;

    return (
        <>
            <button type="button">{children}</button>
            <div
                className={cx(
                    'absolute',
                    'flex',
                    'items-center',
                    'justify-center',
                    'w-[20px]',
                    'h-[20px]',
                    'text-xs',
                    'text-neutral-white',
                    'bg-primary-500',
                    'rounded-full',
                    'top-[-10px]',
                    'right-[-10px]',
                    className,
                )}
            >
                {value}
            </div>
        </>
    );
};

export default BadgeCounter;
