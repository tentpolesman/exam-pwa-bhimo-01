/* eslint-disable jsx-a11y/control-has-associated-label */
import Skeleton from '@common_skeleton';
import cx from 'classnames';

const SkeletonRewardPoint = () => (
    <>
        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <td colSpan={6}>
                <Skeleton width="100%" height={30} />
            </td>
        </tr>
        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <td colSpan={6}>
                <Skeleton width="100%" height={30} />
            </td>
        </tr>
        <tr className={cx('even:bg-white', 'odd:bg-neutral-50')}>
            <td colSpan={6}>
                <Skeleton width="100%" height={30} />
            </td>
        </tr>
    </>
);
export default SkeletonRewardPoint;
