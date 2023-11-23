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
                'lg:max-w-md',
                'md:m-4 xs:m-4 xs:m-4',
                'w-[100%]',
            )}
            >
                {/* TITLE */}
                {
                    title && (
                        <div className={cx(
                            'dialog-title',
                            'bg-neutral-50',
                            'rounded-t',
                            'p-[16px]',
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
                            'bg-white',
                            'p-[16px]',
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
                            'p-[16px]',
                            'rounded-b',
                            'text-right',
                            'border-t-[1px]',
                        )}
                        >
                            {
                                negativeAction && (
                                    <Button
                                        variant="outlined"
                                        onClick={negativeAction}
                                        className="py-[8px]"
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
                                        className="py-[8px] ml-[10px]"
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
