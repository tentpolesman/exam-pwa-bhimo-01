import React from 'react';
import cx from 'classnames';
import Skeleton from '@common_skeleton';

const SkeletonLoader = () => (
    <div className={cx('pt-5 mobile:max-desktop:px-4')}>
        <Skeleton
            width="100%"
            height={500}
        />
    </div>
);

export default SkeletonLoader;
