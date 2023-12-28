import React from 'react';
import cx from 'classnames';
import Skeleton from '@common_skeleton';

function SkeletonContent() {
    return (
        <div className={cx('pt-5 mobile:max-desktop:px-4 w-full flex flex-col [&>*+*]:mt-[24px]')}>
            <Skeleton
                width={140}
                height={20}
            />
            <Skeleton
                width={260}
                height={60}
            />
        </div>
    );
}

export default SkeletonContent;
