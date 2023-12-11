/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable max-len */
import Button from '@common_button';
import Show from '@common_show';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import cx from 'classnames';

const Dialog = ({
    open = false,
    variant = 'container',
    title,
    content,
    positiveLabel,
    positiveAction,
    positiveProps,
    negativeLabel,
    negativeAction,
    negativeProps,
    className,
    children,
    useCloseButton,
    onClickClose,
}) => {
    const isVariantPlain = variant === 'plain';
    const isVariantContainer = variant === 'container';
    return (
        <div
            className={cx(
                'section-dialog',
                'z-[999]',
                'bg-opacity-30',
                'bg-neutral-800',
                'fixed',
                'w-[100%]',
                'h-[100%]',
                'left-0',
                'top-0',
                'justify-center',
                'flex',
                'items-center',
                open && 'visible',
                !open && 'hidden',
                className,
            )}
        >
            <Show when={isVariantPlain}>
                {children}
            </Show>
            <Show when={isVariantContainer}>
                <div className={cx(
                    'section-dialog-container',
                    'shadow-xl',
                    'sm:max-w-[328px]',
                    'md:max-w-[600px]',
                    'lg:max-w-[792px]',
                    'md:m-4 xs:m-4 xs:m-4',
                    'w-[100%]',
                )}
                >
                    {/* TITLE */}
                    {
                        title && (
                            <div className={cx(
                                'dialog-title',
                                'bg-neutral-white',
                                'text-neutral-700',
                                'rounded-t-[12px]',
                                'font-semibold',
                                'text-[16px]',
                                'px-[32px]',
                                'pt-[32px]',
                                'pb-[4px]',
                            )}
                            >
                                {title}
                            </div>
                        )
                    }
                    {/* CONTENT */}
                    {
                        content && (
                            <div className={cx(
                                'dialog-content',
                                'bg-neutral-white',
                                'text-neutral-600',
                                'bg-white',
                                'pt-[4px]',
                                'px-[32px]',
                                'pb-[32px]',
                                'text-[14px]',
                            )}
                            >
                                {content}
                            </div>
                        )
                    }
                    {/* ACTION */}
                    {
                        (positiveAction || negativeAction) && (
                            <div className={cx(
                                'dialog-action',
                                'px-[24px]',
                                'py-[16px]',
                                'rounded-b-[12px]',
                                'mobile:text-center',
                                'tablet:text-right',
                                'flex',
                                'desktop:justify-end tablet:justify-end mobile:justify-center',
                                'gap-[16px]',
                                'bg-neutral-100',
                            )}
                            >
                                {
                                    negativeAction && (
                                        <Button
                                            variant="outlined"
                                            onClick={negativeAction}
                                            className="py-[12px] px-[22px] !border-0 xs:w-[50%] sm:w-[50%] md:w-auto"
                                            classNameText="justify-center"
                                            {...negativeProps}
                                        >
                                            {negativeLabel}
                                        </Button>
                                    )
                                }
                                {
                                    positiveAction && (
                                        <Button
                                            onClick={positiveAction}
                                            className="py-[12px] px-[22px] border-0 mobile:w-[50%] mobile:w-[50%] desktop:w-auto tablet:w-auto"
                                            classNameText="justify-center"
                                            {...positiveProps}
                                        >
                                            {positiveLabel}
                                        </Button>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </Show>
            <Show when={useCloseButton}>
                <Button
                    onClick={onClickClose}
                    iconOnly
                    className="button-close-dialog absolute desktop:top-[50px] tablet:top-[50px] desktop:right-[50px] tablet:right-[50px] mobile:top-[10px] mobile:right-[0px]"
                    variant="plain"
                    icon={<XMarkIcon className="h-[24] w-[24]" />}
                />
            </Show>
        </div>
    );
};

export default Dialog;
