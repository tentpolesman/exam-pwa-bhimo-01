/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Divider from '@common_divider';
import Skeleton from '@common_skeleton';
import cx from 'classnames';

export const Loader = () => (
    <div className="flex flex-col gap-4 overflow-x-auto mt-4">
        <table className={cx('w-full', 'text-base', 'border-[1px] rounded-md', 'border-neutral-100')}>
            <thead>
                <tr className={cx('text-neutral-500', 'font-semibold', 'leading-2lg', 'text-left', 'hidden desktop:table-row')}>
                    <th align="left" className={cx('px-4', 'py-3')}>
                        <Skeleton />
                    </th>
                    <th align="left" className={cx('px-4', 'py-3')}>
                        <Skeleton />
                    </th>
                    <th align="left" className={cx('px-4', 'py-3')}>
                        <Skeleton />
                    </th>
                    <th align="left" className={cx('px-4', 'py-3')}>
                        <Skeleton />
                    </th>
                    <th align="left" className={cx('px-4', 'py-3')}>
                        <Skeleton />
                    </th>
                </tr>
            </thead>
            <tbody>
                {[1, 2, 3, 4].map((index) => (
                    <tr
                        className={cx(
                            'even:bg-white',
                            'odd:bg-neutral-50',
                            'flex flex-col',
                            'desktop:table-row',
                            'border-b border-b-neutral-100',
                            'desktop:border-none',
                        )}
                        key={index}
                    >
                        <td className="p-4" align="left">
                            <div className="flex flex-row justify-between items-center">
                                <div className="basis 1/3 inline-block desktop:hidden">
                                    <Skeleton />
                                </div>
                                <Skeleton width="55%" />
                            </div>
                        </td>
                        <td className="p-4" align="left">
                            <div className="flex flex-row justify-between items-center">
                                <div className="basis 1/3 inline-block desktop:hidden">
                                    <Skeleton />
                                </div>
                                <Skeleton />
                            </div>
                        </td>
                        <td className="p-4" align="left">
                            <div className="flex flex-row justify-between items-center">
                                <div className="basis 1/3 inline-block desktop:hidden">
                                    <Skeleton />
                                </div>
                                <Skeleton width="55%" />
                            </div>
                        </td>
                        <td className="p-4" align="left">
                            <div className="flex flex-row justify-between items-center">
                                <div className="basis 1/3 inline-block desktop:hidden">
                                    <Skeleton />
                                </div>
                                <Skeleton />
                            </div>
                        </td>
                        <td className="p-4" align="left">
                            <div className="flex flex-row justify-between items-center">
                                <div className="basis 1/3 inline-block desktop:hidden">
                                    <Skeleton />
                                </div>
                                <Skeleton />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default Loader;
