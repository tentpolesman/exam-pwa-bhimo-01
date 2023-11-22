/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';
import cx from 'classnames';
import Typography from '@common_typography/index';
import useMediaQuery from '@hook/useMediaQuery';

const Toast = ({
    open,
    close = true,
    setOpen, // handle close
    message = 'Title',
    variant = 'success',
    position = 'bottom', // top or bottom
    positionNumber = 0,
    className,
    autoHideDuration = 3000,
}) => {
    const timerRef = React.useRef(null);
    const { isXl } = useMediaQuery();

    React.useEffect(() => {
        if (open) {
            timerRef.current = setTimeout(() => {
                setOpen();
            }, autoHideDuration);
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [open]);

    let classNamesText = 'text-accent-eucalyptus-300';
    let classNamesToast = cx(
        'bg-accent-eucalyptus-50',
        'border-l-accent-eucalyptus-300',
        'border-accent-eucalyptus-300',
    );

    if (variant === 'warning') {
        classNamesText = 'text-accent-saffron_mango-300';
        classNamesToast = cx(
            'bg-accent-saffron_mango-50',
            'border-l-accent-saffron_mango-300',
            'border-accent-saffron_mango-300',
        );
    }

    if (variant === 'error') {
        classNamesText = 'text-accent-red_orange-300';
        classNamesToast = cx(
            'bg-accent-red_orange-50',
            'border-l-accent-red_orange-300',
            'border-accent-red_orange-300',
        );
    }

    return (
        <div
            role="alert"
            style={{
                ...(position === 'bottom' ? (isXl ? { bottom: positionNumber, marginLeft: 'auto', marginRight: 'auto' } : { bottom: positionNumber }) : null),
                ...(position === 'bottom-right' ? (isXl ? { bottom: positionNumber, marginLeft: 'auto' } : { bottom: positionNumber }) : null),
                ...(position === 'bottom-left' ? (isXl ? { bottom: positionNumber, marginRight: 'auto' } : { bottom: positionNumber }) : null),
                ...(position === 'top' ? (isXl ? { top: positionNumber, marginLeft: 'auto', marginRight: 'auto' } : { top: positionNumber }) : null),
                ...(position === 'top-right' ? (isXl ? { top: positionNumber, marginLeft: 'auto' } : { top: positionNumber }) : null),
                ...(position === 'top-left' ? (isXl ? { top: positionNumber, marginRight: 'auto' } : { top: positionNumber }) : null),
            }}
            className={
                cx(
                    'section-toast',
                    'fixed',
                    'inset-x-0',
                    'p-[16px]',
                    'transition-opacity ease-in duration-200',
                    'border-l-[3px]',
                    'flex',
                    'justify-between',
                    'align-middle',
                    'rounded-[4px]',
                    'lg:m-4 md:m-4 xs:m-4 xs:m-4',
                    'lg:max-w-md',
                    'items-center',
                    open && 'z-50 opacity-100',
                    !open && 'z-0 opacity-0',
                    classNamesToast,
                    className,
                )
            }
        >
            <div className="section-toast-title font-sans">
                <Typography variant="bd-2a" color={classNamesText}>{message}</Typography>
            </div>
            {
                close && (
                    <button type="button" className="section-toast-action flex items-center" onClick={setOpen}>
                        <span class={cx('material-symbols-outlined', classNamesText)}>
                            close
                        </span>
                    </button>
                )
            }
        </div>
    );
};

export default Toast;
