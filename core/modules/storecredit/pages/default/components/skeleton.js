import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonStoreCredit = () => (
    <>
        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <td colSpan={5}>
                <Skeleton width="100%" height={30} />
            </td>
        </tr>
        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <td colSpan={5}>
                <Skeleton width="100%" height={30} />
            </td>
        </tr>
        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <td colSpan={5}>
                <Skeleton width="100%" height={30} />
            </td>
        </tr>
    </>
);
export default SkeletonStoreCredit;
