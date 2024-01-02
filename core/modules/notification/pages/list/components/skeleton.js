import React from 'react';
import cx from 'classnames';
import Skeleton from '@common_skeleton';

function SkeletonContent() {
    return (
        <div className={cx('pt-5')}>
            {Array(10).fill(0).map((item, i) => (
                <div
                    key={i}
                    className={cx(
                        'border-t-[1px] border-b-[1px] border-neutral-100',
                        'px-8 py-6',
                    )}
                >
                    <div className="w-full flex flex-col [&>*+*]:mt-[12px]">
                        <Skeleton
                            width={260}
                            height={20}
                        />
                        <Skeleton
                            width={140}
                            height={20}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SkeletonContent;
