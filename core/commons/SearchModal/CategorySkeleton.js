import Skeleton from '@common_skeleton';

const CategorySkeleton = () => {
    const SkeletonRect = ({ width }) => (
        <Skeleton
            className="self-center mb-[32px]"
            variant="rect"
            width={width}
            height={16}
            animation="wave"
        />
    );
    return (
        <div className="w-full mt-[36px]">
            <div className="grid justify-center">
                {[100, 60, 180, 65, 150, 70, 80, 175, 70, 55, 115, 60, 155, 65, 80, 120, 60].map((width, i) => (
                    <SkeletonRect key={i} width={width} />
                ))}
            </div>
        </div>
    );
};

export default CategorySkeleton;
