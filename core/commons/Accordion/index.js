import React from 'react';
import Arrow from '@heroicons/react/24/outline/ChevronDownIcon';
import Typography from '@common_typography';
import propTypes from 'prop-types';
import cx from 'classnames';

const Accordion = (props) => {
    const {
        label, open, handleOpen, handleClose,
        className = '', classLabel = '',
        children,
    } = props;

    const handleShow = () => {
        if (open) {
            handleClose();
        } else {
            handleOpen();
        }
    };

    return (
        <details className={cx('group flex flex-col common-accordion', className)} open={open || false}>
            <summary onClick={handleShow} className="flex justify-between items-center font-medium cursor-pointer list-none w-full">
                <Typography className={cx('capitalize font-semibold', classLabel)}>{label}</Typography>
                <span className="transition group-open:rotate-180">
                    <Arrow className="w-5 h-5" />
                </span>
            </summary>
            <div className="text-neutral-600 mt-4 group-open:animate-fadeIn group-open:duration-700">
                {children}
            </div>
        </details>
    );
};

Accordion.propTypes = {
    label: propTypes.string,
    open: propTypes.bool,
    handleOpen: propTypes.func,
    handleClose: propTypes.func,
};

Accordion.defaultProps = {
    label: '',
    open: false,
    handleOpen: () => {},
    handleClose: () => {},
};

export default Accordion;
