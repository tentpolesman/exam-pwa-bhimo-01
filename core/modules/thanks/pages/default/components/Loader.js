import Skeleton from '@common_skeleton';

const SkeletonLoader = () => (
    <div className="skeleton-container">
        <Skeleton variant="text" animation="wave" width="60%" height={35} />
        <Skeleton variant="text" animation="wave" width="70%" height={35} />
        <Skeleton variant="text" animation="wave" width="90%" height={20} />
        <Skeleton variant="text" animation="wave" width="70%" height={20} />

        <div className="skeleton-btn-continue">
            <span>
                <Skeleton variant="rect" animation="wave" width="100%" height={35} />
            </span>
        </div>
    </div>
);

export default SkeletonLoader;
