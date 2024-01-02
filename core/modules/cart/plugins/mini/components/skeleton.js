import Skeleton from '@common_skeleton';

const SkeletonCart = () => (
    <ol>
        <li className="item-loading">
            <Skeleton className="rounded-[50%]" width="100%" height={80} />
        </li>
        <li className="item-loading">
            <Skeleton className="rounded-[50%]" width="100%" height={80} />
        </li>
        <li className="item-loading">
            <Skeleton className="rounded-[50%]" width="100%" height={80} />
        </li>
    </ol>
);

export default SkeletonCart;
