/* eslint-disable max-len */
import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonLoader = () => (
    <>
        <div className={cx('flex', 'flex-row', 'mobile:max-tablet:hidden', 'border-t-[1px]', 'border-neutral-200', 'mt-3')}>
            <div className="lg:basis-10/12 pt-5">
                <Skeleton animation="wave" variant="rect" height={240} width="887px" className={cx('my-4')} />
                <Skeleton animation="wave" variant="rect" height={240} width="887px" className={cx('my-4')} />
                <Skeleton animation="wave" variant="rect" height={240} width="887px" className={cx('my-4')} />
            </div>
        </div>
        <div className={cx('flex', 'flex-col', 'items-center', 'w-full', 'h-full', 'mt-[30%]', 'desktop:hidden')}>
            <Skeleton
                animation="wave"
                variant="text"
                width="calc(100% - 100px)"
                height={30}
                style={{ marginLeft: 50, marginRight: 50, marginTop: 20 }}
            />
            <Skeleton animation="wave" variant="rect" height={50} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 120px)" style={{ marginLeft: 60, marginRight: 60 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 120px)" style={{ marginLeft: 60, marginRight: 60 }} />
            <Skeleton animation="wave" variant="rect" width="100%" height={150} style={{ marginTop: 70 }} />
        </div>
    </>
);

export default SkeletonLoader;
