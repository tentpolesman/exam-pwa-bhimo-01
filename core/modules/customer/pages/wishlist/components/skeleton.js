import Skeleton from '@common_skeleton';
import classNames from 'classnames';

const SkeletonLoader = () => (
    <>
        <div className="flex flex-row hidden-mobile">
            <div className="lg:basis-10/12">
                <Skeleton animation="wave" variant="rect" height={240} width="100%" style={{ marginBottom: 50 }} />
            </div>
        </div>
        <div className={classNames('hidden-desktop')}>
            <Skeleton animation="wave" variant="rect" height={50} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            <Skeleton animation="wave" variant="text" height={50} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
        </div>
    </>
);

export default SkeletonLoader;
