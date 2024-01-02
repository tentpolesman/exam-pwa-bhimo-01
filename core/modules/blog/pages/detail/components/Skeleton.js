import Skeleton from '@common_skeleton';

const SkeletonLoader = () => (
    <>
        <div className="flex flex-row">
            <div className="sm:basis-2/12 hidden-mobile pt-[30px]">
                <Skeleton width="95%" height={30} />
                <Skeleton width="80%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton width="80%" height={20} />
            </div>
            <div className="sm:basis-10/12 xs:basis-full">
                <div className="p-[20px] mb-[20px]">
                    <Skeleton width="100%" height={30} />
                    <Skeleton width="70%" height={30} className="mb-[10px]" />
                    <Skeleton className="rounded-[50%] h-[320px]" width="100%" />
                    <Skeleton width="98%" height={20} />
                    <Skeleton width="95%" height={20} />
                    <Skeleton width="90%" height={20} className="mb-[10px]" />

                    <Skeleton width="98%" height={20} />
                    <Skeleton width="95%" height={20} />
                    <Skeleton width="90%" height={20} className="mb-[10px]" />

                    <Skeleton width="98%" height={20} />
                    <Skeleton width="95%" height={20} />
                    <Skeleton width="90%" height={20} className="mb-[10px]" />

                    <Skeleton width="50%" height={30} className="mb-[10px]" />
                </div>
            </div>
        </div>
    </>
);

export default SkeletonLoader;
