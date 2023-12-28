import React from 'react';
import cx from 'classnames';
import Skeleton from '@common_skeleton';

function SkeletonContent() {
    return (
        <div className={cx('pt-5 mobile:max-desktop:px-4')}>
            <Skeleton
                width="100%"
                height={200}
            />
        </div>
    );
}

export default SkeletonContent;
