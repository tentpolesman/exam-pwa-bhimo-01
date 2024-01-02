import Skeleton from '@common_skeleton';

const SkeletonLoader = () => (
    <div className="flex flex-row">
        <div className="sm:basis-2/12 hidden-mobile">
            <Skeleton width="95%" height={30} />
            <Skeleton width="80%" height={20} />
            <Skeleton width="80%" height={20} />
            <Skeleton width="80%" height={20} />
        </div>
        <div className="sm:basis-10/12 xs:basis-full">
            <div className="p-[20px] mb-[20px]">
                <Skeleton width="100%" height={30} />
                <Skeleton width="70%" height={20} />
                <Skeleton className="rounded-[50%]" width="100%" height={320} />
                <Skeleton width="95%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton className="rounded-[50%]" width="35%" height={50} />
            </div>
            <div className="p-[20px] mb-[20px]">
                <Skeleton width="100%" height={30} />
                <Skeleton width="70%" height={20} />
                <Skeleton className="rounded-[50%]" width="100%" height={320} />
                <Skeleton width="95%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton className="rounded-[50%]" width="35%" height={50} />
            </div>
            <div className="p-[20px] mb-[20px]">
                <Skeleton width="100%" height={30} />
                <Skeleton width="70%" height={20} />
                <Skeleton className="rounded-[50%]" width="100%" height={320} />
                <Skeleton width="95%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton className="rounded-[50%]" width="35%" height={50} />
            </div>
        </div>
    </div>
);

export default SkeletonLoader;
