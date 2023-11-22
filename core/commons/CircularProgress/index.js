import cx from 'classnames';

const CircularProgress = (props) => {
    const { className = {}, size = 'regular', color = 'primary' } = props;

    let sizeClasses;
    let colorClasses;

    switch (size) {
    case 'small':
        sizeClasses = 'text-sm';
        break;
    case 'regular':
        sizeClasses = 'text-2md';
        break;
    case 'large':
        sizeClasses = 'text-xl';
        break;
    default:
        sizeClasses = 'w-5 h-5';
        break;
    }

    switch (color) {
    case 'primary':
        colorClasses = 'text-primary';
        break;
    case 'secondary':
        colorClasses = 'text-secondary';
        break;
    case 'neutral':
        colorClasses = 'text-neutral';
        break;
    default:
        colorClasses = 'text-primary';
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
                            opacity: 0.75;
                            rotate: 90deg;
                        }
                        50% {
                            opacity: 0.5;
                            rotate: 180deg;
                        }
                        75% {
                            opacity: 0.75;
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
