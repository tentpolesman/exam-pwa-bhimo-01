import cx from 'classnames';

const BadgeCounter = (props) => {
    const { className, value = 0, children } = props;

    return (
        <>
            {children}
            <div
                className={cx(
                    'relative',
                    'inline-flex',
                    'items-center',
                    'justify-center',
                    'mobile:max-desktop:w-4',
                    'mobile:max-desktop:h-4',
                    'desktop:w-5',
                    'desktop:h-5',
                    'mobile:max-desktop:text-[8px]',
                    'desktop:text-[12px]',
                    'text-neutral-white',
                    'bg-primary-700',
                    'rounded-full',
                    '-top-4',
                    'end-2',
                    className,
                )}
            >
                {value}
            </div>
        </>
    );
};

export default BadgeCounter;
