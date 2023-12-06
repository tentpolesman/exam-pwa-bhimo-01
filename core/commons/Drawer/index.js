/* eslint-disable max-len */
import React from 'react';
import propTypes from 'prop-types';
import cx from 'classnames';

const Drawer = ({
    open, handleClose, backdrop, position,
    backdropClass, className = '',
    children,
}) => {
    let classPosition = 'fixed top-0 left-0 z-20 w-11/12 h-full -translate-x-full md:w-96';

    if (position === 'right') {
        classPosition = 'fixed top-0 right-0 z-20 w-11/12 h-full translate-x-full md:w-96';
    }

    if (position === 'bottom') {
        classPosition = 'fixed bottom-0 left-0 z-20 h-96 translate-y-full w-full';
    }

    return (
        <>
            { open && backdrop && (
                <div
                    role="presentation"
                    className={cx(
                        'fixed top-0 left-0 w-full h-full bg-neutral-black bg-opacity-50 z-10',
                        backdropClass,
                    )}
                    onClick={handleClose}
                />
            ) }
            <div className={
                cx(
                    classPosition,
                    'transition-all duration-500 transform shadow-lg',
                    'z-50 bg-neutral-white',
                    {
                        'translate-x-0': (open && position === 'left'),
                        'translate-x-0.5': (open && position === 'right'),
                        '-translate-y-0.5': (open && position === 'bottom'),
                    },
                    className,
                )
            }
            >
                { children }
            </div>
        </>
    );
};

Drawer.propTypes = {
    open: propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired,
    backdrop: propTypes.bool,
    position: propTypes.oneOf(['left', 'right', 'bottom']),
};

Drawer.defaultProps = {
    backdrop: true,
    position: 'left',
};

export default Drawer;
