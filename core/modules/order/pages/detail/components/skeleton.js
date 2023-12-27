import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonLoader = () => (
    <>
        <div className={cx('mobile:max-tablet:hidden', 'tablet:flex', 'tablet:flex-col', 'tablet:gap-y-5')}>
            <Skeleton className={cx('tablet:max-desktop:!hidden', 'tablet:w-[120px]', '!rounded-lg')} />
            <Skeleton className={cx('tablet:max-desktop:mt-5', 'tablet:!w-[430px]', 'tablet:!h-[56px]', '!rounded-lg')} />
            <Skeleton
                className={cx(
                    'tablet:max-desktop:!w-full',
                    'tablet:max-desktop:max-w-[720px]',
                    'desktop:!w-[896px]',
                    'tablet:!h-[160px]',
                    '!rounded-lg',
                )}
            />
            <Skeleton
                className={cx(
                    'tablet:max-desktop:!w-full',
                    'tablet:max-desktop:max-w-[720px]',
                    'desktop:!w-[896px]',
                    'tablet:!h-[524px]',
                    'desktop:!h-[320px]',
                    '!rounded-lg',
                )}
            />
        </div>
        <div className={cx('tablet:hidden', 'tablet:flex', 'tablet:flex-col', 'tablet:gap-y-5', 'px-4', 'mt-4')}>
            <Skeleton className={cx('tablet:max-desktop:mt-5', '!w-full', 'max-w-[320px]', '!h-[120px]', '!rounded-lg')} />
            <Skeleton className={cx('!w-full', 'max-w-[320px]', '!h-[80px]', '!rounded-lg')} />
            <Skeleton className={cx('!w-full', 'max-w-[320px]', '!h-[480px]', '!rounded-lg')} />
        </div>
    </>
);

export default SkeletonLoader;
