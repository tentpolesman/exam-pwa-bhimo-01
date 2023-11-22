import cx from 'classnames';

const CircularProgress = (props) => {
    const { className = {}, size = 'regular', color = 'primary' } = props;

    let sizeClasses;
    let colorClasses;

    switch (size) {
    case 'small':
        sizeClasses = 'w-3 h-3 m-1';
        break;
    case 'regular':
        sizeClasses = 'w-[24px] h-[24px] m-1.5';
        break;
    case 'large':
        sizeClasses = 'w-7 h-7 m-2';
        break;
    default:
        sizeClasses = 'w-5 h-5 m-1';
        break;
    }

    switch (color) {
    case 'primary':
        colorClasses = 'text-primary-100 fill-primary';
        break;
    case 'secondary':
        colorClasses = 'text-secondary-100 fill-secondary';
        break;
    case 'neutral':
        colorClasses = 'text-neutral-100 fill-neutral';
        break;
    default:
        colorClasses = 'text-primary-100 fill-primary';
        break;
    }

    const classes = cx(sizeClasses, colorClasses, 'animate-spin-with-opacity');

    return (
        <div className={cx(className)}>
            <svg xmlns="http://www.w3.org/2000/svg" className={cx(classes)} viewBox="0 0 44 44" fill="none">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M17.418 2.47424C17.667 3.26435 17.2284 4.10675 16.4383 4.3558C13.3703 5.32287 10.6075 7.07319 8.42256 9.43405C6.23758 11.7949 4.70595 14.6847 3.97882 17.8182C3.25169 20.9518 3.3542 24.2207 4.27621 27.3026C5.19823 30.3844 6.90789 33.1726 9.23649 35.3919C11.5651 37.6112 14.4321 39.185 17.5547 39.958C20.6772 40.7309 23.9473 40.6763 27.0423 39.7996C30.1374 38.9228 32.9503 37.2542 35.2035 34.9583C37.4567 32.6625 39.0723 29.8188 39.8909 26.708C40.1017 25.9068 40.9221 25.4282 41.7233 25.6391C42.5244 25.8499 43.003 26.6703 42.7922 27.4714C41.8408 31.0868 39.9632 34.3916 37.3446 37.0597C34.726 39.7278 31.4569 41.667 27.86 42.686C24.2631 43.7049 20.4627 43.7684 16.8338 42.8701C13.2049 41.9718 9.87293 40.1428 7.16673 37.5635C4.46052 34.9843 2.47362 31.744 1.40208 28.1625C0.330552 24.5809 0.211429 20.7818 1.05647 17.1401C1.90151 13.4984 3.68151 10.14 6.22081 7.39633C8.76011 4.65263 11.9709 2.61847 15.5364 1.49458C16.3265 1.24553 17.1689 1.68414 17.418 2.47424Z"
                    fill="currentFill"
                />
            </svg>
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
