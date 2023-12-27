import Skeleton from '@common_skeleton';

const SkeletonForm = () => (
    <>
        <div className="hidden-mobile">
            <Skeleton className="w-[50%]" width="50%" height={30} />
            <Skeleton className="w-[50%]" width="50%" height={30} />
            <Skeleton className="w-[50%]" width="50%" height={30} />
        </div>
        <div className="hidden-desktop">
            <Skeleton className="w-[50%]" width="100%" height={30} />
            <Skeleton className="w-[50%]" width="100%" height={30} />
            <Skeleton className="w-[50%]" width="100%" height={30} />
        </div>
    </>
);

export default SkeletonForm;
