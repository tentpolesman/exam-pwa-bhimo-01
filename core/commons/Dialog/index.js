/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import cx from 'classnames';
import Button from '@common_button/index';

const Dialog = ({
    open = false,
    title,
    content,
    positiveLabel,
    positiveAction,
    positiveProps,
    negativeLabel,
    negativeAction,
    negativeProps,
}) => (
        <div className={cx(
            'section-dialog',
            'fixed',
            'z-50',
            'w-[100%]',
            'h-[100%]',
            'left-0',
            'bg-slate-950/50',
            'top-0',
            'justify-center',
            'flex',
            'items-center',
            open && 'visible',
            !open && 'hidden',
        )}
        >
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
                            'text-neutral-300',
                            'rounded-t',
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
                            'bg-white',
                            'px-[24px]',
                            'py-[16px]',
                            'rounded-b',
                            'xs:text-center',
                            'sm:text-center',
                            'md:text-right',
                            'xs:flex sm:flex md:block',
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
                                        {...positiveProps}
                                    >
                                        {negativeLabel}
                                    </Button>
                                )
                            }
                            {
                                positiveAction && (
                                    <Button
                                        onClick={positiveAction}
                                        className="py-[12px] px-[22px] border-0 xs:w-[50%] sm:w-[50%] md:w-auto md:ml-[16px]"
                                        classNameText="justify-center"
                                        {...negativeProps}
                                    >
                                        {positiveLabel}
                                    </Button>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );

export default Dialog;
