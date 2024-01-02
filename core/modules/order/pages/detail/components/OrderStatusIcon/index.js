/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */

import Typography from '@common_typography';
import cx from 'classnames';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import QueueListIcon from '@heroicons/react/24/outline/QueueListIcon';
import TruckIcon from '@heroicons/react/24/outline/TruckIcon';

const OrderStatusIcon = (props) => {
    const { t } = props;
    let { status } = props;

    if (status === 'ready_to_ship') {
        status = 'processing';
    }
    let steps = ['pending', 'processing', 'shipping', 'complete'];
    if (status === 'canceled') {
        steps = ['pending', 'canceled'];
    }

    const generateLabel = (label) => t(`order:labelStatus:${label}`);

    const generateIconUsed = (statusOrder, className) => {
        switch (statusOrder) {
            case 'pending':
                return <QueueListIcon className={className} />;
            case 'processing':
                return <ArrowPathIcon className={className} />;
            case 'shipping':
                return <TruckIcon className={className} />;
            case 'complete':
                return <CheckCircleIcon className={className} />;
            default:
                return <QueueListIcon className={className} />;
        }
    };

    return (
        <>
            <div className={cx('w-full', 'min-w-[70px]')}>
                <div class="flex flex-row items-start p-6 w-full">
                    {steps.map((step, index) => {
                        if (index === 0) {
                            return (
                                <div class="block flex-1 relative tablet:px-2">
                                    <div class="flex flex-col items-center">
                                        <div className={cx('flex', 'shrink-0')}>
                                            <div
                                                className={cx(
                                                    'flex',
                                                    'flex-col',
                                                    'items-center',
                                                    'h-16',
                                                    'w-16',
                                                    'mobile:max-tablet:h-10',
                                                    'mobile:max-tablet:w-10',
                                                    'z-[2]',
                                                    'justify-center',
                                                    'bg-primary',
                                                    'rounded-full',
                                                    {
                                                        'bg-neutral-white': status === step,
                                                        'bg-primary': status !== step,
                                                    },
                                                )}
                                            >
                                                {generateIconUsed(
                                                    step,
                                                    cx(
                                                        'flex',
                                                        'flex-col',
                                                        'justify-center',
                                                        'w-6',
                                                        'h-6',
                                                        'mobile:max-tablet:w-4',
                                                        'mobile:max-tablet:h-4',
                                                        {
                                                            'text-primary': status === step,
                                                            'text-neutral-white': status !== step,
                                                        },
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx('text-center')}>
                                            <Typography className={cx('!mt-1', 'mobile:max-tablet:text-sm')}>{generateLabel(step)}</Typography>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div class="block flex-1 items-center relative tablet:px-2">
                                <div
                                    className={cx(
                                        'mobile:max-tablet:top-5',
                                        'tablet:top-8',
                                        'left-[calc(-50%+20px)]',
                                        'right-[calc(50%+20px)]',
                                        'absolute',
                                    )}
                                >
                                    <span className={cx('bg-primary', 'border-0', 'h-1', 'rounded-sm', 'block')} />
                                </div>
                                <div class="flex flex-col items-center">
                                    <div className={cx('flex', 'shrink-0')}>
                                        <div
                                            className={cx(
                                                'flex',
                                                'flex-col',
                                                'items-center',
                                                'h-16',
                                                'w-16',
                                                'mobile:max-tablet:h-10',
                                                'mobile:max-tablet:w-10',
                                                'z-[2]',
                                                'justify-center',
                                                'rounded-full',
                                                {
                                                    'bg-neutral-200 border-none': index > 0 && status !== step,
                                                    'bg-neutral-white border-[3px] border-primary': status === step,
                                                },
                                            )}
                                        >
                                            {generateIconUsed(
                                                step,
                                                cx(
                                                    'flex',
                                                    'flex-col',
                                                    'justify-center',
                                                    'w-6',
                                                    'h-6',
                                                    'mobile:max-tablet:w-4',
                                                    'mobile:max-tablet:h-4',
                                                    {
                                                        'text-neutral-400': index > 0 && status !== step,
                                                        'text-primary': status === step,
                                                    },
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    <div className={cx('text-center')}>
                                        <Typography className={cx('!mt-1', 'mobile:max-tablet:text-sm')}>{generateLabel(step)}</Typography>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default OrderStatusIcon;
