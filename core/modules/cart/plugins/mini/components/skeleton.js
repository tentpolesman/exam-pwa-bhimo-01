import Skeleton from '@common_skeleton';

const SkeletonCart = () => (
    <ol>
        <li className="item-loading">
            <Skeleton variant="rect" width="100%" height={80} />
        </li>
        <li className="item-loading">
            <Skeleton variant="rect" width="100%" height={80} />
        </li>
        <li className="item-loading">
            <Skeleton variant="rect" width="100%" height={80} />
        </li>
    </ol>
);

export default SkeletonCart;
