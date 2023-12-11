/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import cx from 'classnames';
import Button from '@common_button/index';
import propTypes from 'prop-types';
import { useEffect } from 'react';

const Dialog = ({
    open = false,
    onClose,
    title,
    content,
    positiveLabel,
    positiveAction,
    positiveProps,
    negativeLabel,
    negativeAction,
    negativeProps,
    classContent,
    classWrapper,
    classContainer,
    backdrop,
    closeOnBackdrop,
}) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style = '';
        }
    }, [open]);
    return (
        <>
            {
                (open && backdrop) && (
                    <div
                        role="presentation"
                        className={cx(
                            'fixed top-0 left-0 w-full h-full z-[1200]',
                            'bg-neutral-black bg-opacity-50',
                        )}
                        onClick={() => closeOnBackdrop && onClose()}
                    />
                )
            }
            <div className={cx(
                'section-dialog',
                'fixed',
                'z-[1201]',
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
                classWrapper,
            )}
            >
                <div className={cx(
                    'section-dialog-container',
                    'shadow-xl',
                    'sm:max-w-[328px]',
                    'md:max-w-[600px]',
                    'lg:max-w-[792px]',
                    'md:m-4 xs:m-4',
                    'w-[100%]',
                    classContainer,
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
                                classContent,
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
        </>
        );
};

Dialog.propTypes = {
    open: propTypes.bool,
    title: propTypes.string,
    content: propTypes.oneOfType([propTypes.string, propTypes.node, propTypes.func]),
    positiveLabel: propTypes.string,
    positiveAction: propTypes.func,
    positiveProps: propTypes.object,
    negativeLabel: propTypes.string,
    negativeAction: propTypes.func,
    negativeProps: propTypes.object,
    classContent: propTypes.string,
    classWrapper: propTypes.string,
    classContainer: propTypes.string,
    backdrop: propTypes.bool,
    closeOnBackdrop: propTypes.bool,
    onClose: propTypes.func,
};

Dialog.defaultProps = {
    open: false,
    title: undefined,
    content: undefined,
    positiveLabel: undefined,
    positiveAction: undefined,
    positiveProps: {},
    negativeLabel: undefined,
    negativeAction: undefined,
    negativeProps: {},
    classContent: '',
    classWrapper: '',
    classContainer: '',
    backdrop: true,
    closeOnBackdrop: false,
    onClose: () => {},
};

export default Dialog;
