import Skeleton from '@common_skeleton';
import classNames from 'classnames';

const SkeletonLoader = () => (
    <div className="flex flex-row" style={{ paddingBottom: 100 }}>
        <div className="lg:basis-2/12 hidden-mobile">
            <Skeleton className="rounded-[50%]" height={540} width="100%" />
        </div>
        <div className="lg:basis-10/12 xs:basis-full sm:basis-full">
            <Skeleton className="rounded-[50%]" width="100%" height={40} style={{ marginBottom: 10 }} />
            <div className={classNames('')} style={{ height: '50%' }}>
                <Skeleton animation="wave" variant="text" width={120} height={25} />
                <Skeleton className="rounded-[50%]" width="100%" height={40} />
                <Skeleton animation="wave" variant="text" width={120} height={25} />
                <Skeleton className="rounded-[50%]" width="100%" height={40} />
            </div>
            <div>
                <Skeleton animation="wave" variant="text" width="50%" height={30} />
                <div>
                    <Skeleton className="rounded-[50%]" width={105} height={130} />
                    <div>
                        <Skeleton animation="wave" variant="text" width={90} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <div className="flex-grow" />
                    </div>
                </div>
                <Skeleton animation="wave" variant="text" width="50%" height={30} />
                <div>
                    <Skeleton className="rounded-[50%]" width={105} height={130} />
                    <div>
                        <Skeleton animation="wave" variant="text" width={90} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <div className="flex-grow" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SkeletonLoader;
