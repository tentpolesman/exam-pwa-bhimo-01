import Skeleton from '@common/Skeleton';

const SkeletonSeller = () => (
    <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row mt-3">
            <div className="flex">
                <Skeleton width={50} height={55} />
            </div>
            <div>
                <Skeleton width={150} height={30} />
                <Skeleton width={150} height={30} />
            </div>
        </div>
    </div>
);

export default SkeletonSeller;
