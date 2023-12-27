import Skeleton from '@common_skeleton';

const SkeletonDelivery = () => (
    <div className="flex flex-col gap-2">
        <Skeleton width="60%" height={30} />
        <Skeleton width="90%" height={70} />
    </div>
);

export default SkeletonDelivery;
