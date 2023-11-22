import cx from 'classnames';
import React from 'react';

const Span = (props) => {
    const { className = {}, children } = props;

    const classes = cx(
        'w-full',
        'h-[375px]',
        'flex',
        'justify-center',
        'items-center',
        'bg-neutral',
    );

    return <div className={cx(classes, className)}>{children}</div>;
};

export default Span;
