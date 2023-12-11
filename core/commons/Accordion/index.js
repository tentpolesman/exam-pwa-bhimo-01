import React from 'react';
import Arrow from '@heroicons/react/24/outline/ChevronDownIcon';
import Typography from '@common_typography';
import propTypes from 'prop-types';
import cx from 'classnames';

const Accordion = (props) => {
    const {
        label, open, handleOpen, handleClose,
        className = '',
        classLabel = '',
        classSummary,
        CustomAccordionSummary,
        classContent = '',
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
            <summary
                onClick={handleShow}
                className={cx(
                    'flex justify-between items-center font-medium cursor-pointer list-none w-full',
                    classSummary,
                )}
            >
                {
                    React.isValidElement(CustomAccordionSummary)
                        ? React.cloneElement(CustomAccordionSummary, {
                            className: classSummary,
                            label,
                            classLabel,
                        })
                        : (
                            <>
                                <Typography className={cx('capitalize font-semibold', classLabel)}>{label}</Typography>
                                <span className="transition group-open:rotate-180">
                                    <Arrow className="w-5 h-5" />
                                </span>
                            </>
                        )
                }
            </summary>
            <div className={cx(
                'text-neutral-600 mt-4 group-open:animate-fadeIn group-open:duration-700',
                classContent,
            )}
            >
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
    classSummary: propTypes.string,
    CustomAccordionSummary: propTypes.element,
    classContent: propTypes.string,
    classLabel: propTypes.string,
    className: propTypes.string,
};

Accordion.defaultProps = {
    label: '',
    open: false,
    handleOpen: () => {},
    handleClose: () => {},
    classSummary: '',
    CustomAccordionSummary: false,
    classContent: '',
    classLabel: '',
    className: '',
};

export default Accordion;
