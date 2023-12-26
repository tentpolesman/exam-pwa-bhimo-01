import Skeleton from '@common_skeleton';

const SkeletonStoreLocator = () => (
    <>
        <div className="flex flex-row">
            <div className="md:basis-3/12">
                <Skeleton className="rounded-[50%]" width="100%" height={515} />
            </div>
            <div className="md:basis-9/12">
                <Skeleton className="rounded-[50%]" width="100%" height={467} />
                <Skeleton className="rounded-[50%] mt-[12px]" width="100%" height={36} />
            </div>
        </div>
    </>
);

export default SkeletonStoreLocator;
