import Skeleton from '@common_skeleton';

import cx from 'classnames';

export const SkeletonTable = () => {
    const data = [1, 2, 3];

    return (
        <>
            {data.map((item, index) => (
                <tr
                    className={cx({
                        'bg-white': index % 2 === 1,
                        'bg-neutral-50': index % 2 !== 1,
                    })}
                    key={index}
                >
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                    <td className={cx('py-6', 'px-4')}>
                        <Skeleton height={16} />
                    </td>
                </tr>
            ))}
        </>
    );
};

export const SkeletonMobile = () => {
    const SkeletonData = [1, 2, 3];
    return (
        <div style={{ padding: 20 }}>
            {SkeletonData.map((item) => (
                <div style={{ marginBottom: 30 }} key={item}>
                    <Skeleton width="50%" variant="text" animation="wave" height={30} />
                    <Skeleton width="90%" variant="text" animation="wave" height={30} />
                    <Skeleton width="90%" variant="text" animation="wave" height={30} />
                    <Skeleton width="90%" variant="text" animation="wave" height={30} />
                </div>
            ))}
        </div>
    );
};

export default {
    SkeletonTable,
    SkeletonMobile,
};
