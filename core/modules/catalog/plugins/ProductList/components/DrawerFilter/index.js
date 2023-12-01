/* eslint-disable max-len */
import React from 'react';
import propTypes from 'prop-types';
import cx from 'classnames';
import Button from '@common/Button';

const DrawerFilter = ({ open, handleClose, backdrop }) => (
    <>
        { open && backdrop && (
            <div
                role="presentation"
                className="fixed top-0 left-0 w-full h-full bg-neutral-black bg-opacity-50 z-10"
                onClick={handleClose}
            />
        ) }
        <div className={
            cx(
                'fixed top-0 left-0 z-20 w-11/12 h-full',
                'md:w-96',
                'transition-all duration-500 transform -translate-x-full shadow-lg',
                'z-50 bg-neutral-white',
                {
                    'translate-x-0': open,
                },
            )
        }
        >
            <div className="px-6 py-4">
                <h2 className="text-lg font-semibold">Drawer</h2>
                <p className="text-gray-500">This is a drawer.</p>
                <Button onClick={handleClose}>Close</Button>
            </div>
        </div>
    </>
);

DrawerFilter.propTypes = {
    open: propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired,
    backdrop: propTypes.bool,
};

DrawerFilter.defaultProps = {
    backdrop: true,
};

export default DrawerFilter;
