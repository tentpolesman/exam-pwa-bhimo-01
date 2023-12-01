import cx from 'classnames';

const CircularProgress = (props) => {
    const { className = {}, size = 'small', color = 'primary' } = props;

    let sizeClasses;
    let colorClasses;

    switch (size) {
    case 'small':
        sizeClasses = 'text-[20px]';
        break;
    case 'large':
        sizeClasses = 'text-[44px]';
        break;
    default:
        sizeClasses = 'text-[20px]';
        break;
    }

    switch (color) {
    case 'primary':
        colorClasses = 'text-primary-700';
        break;
    case 'secondary':
        colorClasses = 'text-secondary-700';
        break;
    case 'neutral':
        colorClasses = 'text-neutral-700';
        break;
    default:
        colorClasses = 'text-primary-700';
        break;
    }

    const classes = cx(sizeClasses, colorClasses, 'animate-spin-with-opacity');

    return (
        <div className={cx(className)}>
            <span className={cx(classes, 'material-symbols-outlined')}>progress_activity</span>
            <style jsx>
                {`
                    .animate-spin-with-opacity {
                        animation: spin-with-opacity 1s linear infinite;
                    }

                    @keyframes spin-with-opacity {
                        0% {
                            opacity: 1;
                            rotate: 0deg;
                        }
                        25% {
                            opacity: 0.9;
                            rotate: 90deg;
                        }
                        50% {
                            opacity: 0.8;
                            rotate: 180deg;
                        }
                        75% {
                            opacity: 0.9;
                            rotate: 270deg;
                        }
                        100% {
                            opacity: 1;
                            rotate: 360deg;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default CircularProgress;
