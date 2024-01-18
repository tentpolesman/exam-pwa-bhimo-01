import Skeleton from '@common_skeleton';

const SkeletonBlog = () => (
    <div className="grid grid-cols-2 gap-6">
        <div className="flex">
            <Skeleton className="!w-[282px] !h-[174px] rounded-lg mb-16" />
            <div className="flex flex-col ml-6 w-[282px]">
                <Skeleton className="!w-full mb-6" />
                <Skeleton className="!w-full !h-[84px]" />
            </div>
        </div>
        <div className="flex">
            <Skeleton className="!w-[282px] !h-[174px] rounded-lg mb-16" />
            <div className="flex flex-col ml-6 w-[282px]">
                <Skeleton className="!w-full mb-6" />
                <Skeleton className="!w-full !h-[84px]" />
            </div>
        </div>
        <div className="flex">
            <Skeleton className="!w-[282px] !h-[174px] rounded-lg mb-16" />
            <div className="flex flex-col ml-6 w-[282px]">
                <Skeleton className="!w-full mb-6" />
                <Skeleton className="!w-full !h-[84px]" />
            </div>
        </div>
        <div className="flex">
            <Skeleton className="!w-[282px] !h-[174px] rounded-lg mb-16" />
            <div className="flex flex-col ml-6 w-[282px]">
                <Skeleton className="!w-full mb-6" />
                <Skeleton className="!w-full !h-[84px]" />
            </div>
        </div>
    </div>
);

export default SkeletonBlog;
