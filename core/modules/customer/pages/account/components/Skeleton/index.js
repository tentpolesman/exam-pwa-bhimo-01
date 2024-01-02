/* eslint-disable max-len */
import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonLoader = () => (
    <>
        <div className={cx('flex', 'flex-row', 'tablet:border-t-[1px]', 'tablet:border-neutral-200', 'tablet:mt-3')}>
            <div className="mobile:max-tablet:basis-full desktop:basis-10/12 pt-5 mobile:max-tablet:px-4">
                <Skeleton
                    animation="wave"
                    variant="rect"
                    height={240}
                    width="887px"
                    className={cx('my-4', 'mobile:max-tablet:!w-[312px]', 'tablet:max-desktop:!w-[768px]')}
                />
                <Skeleton
                    animation="wave"
                    variant="rect"
                    height={240}
                    width="887px"
                    className={cx('my-4', 'mobile:max-tablet:!w-[312px]', 'tablet:max-desktop:!w-[768px]')}
                />
                <Skeleton
                    animation="wave"
                    variant="rect"
                    height={240}
                    width="887px"
                    className={cx('my-4', 'mobile:max-tablet:!w-[312px]', 'tablet:max-desktop:!w-[768px]')}
                />
            </div>
        </div>
    </>
);

export default SkeletonLoader;
