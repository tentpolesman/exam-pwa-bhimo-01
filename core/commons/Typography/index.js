import PropTypes from 'prop-types';
import cx from 'classnames';

const Typography = (props) => {
    const { variant = 'bd-2', className = '', children } = props;
    const classes = cx('text-pwa-font', className);

    if (variant === 'h-xl') {
        return <h5 className={cx('text-2xl', 'font-bold', 'leading-3xl', 'tracking-densest', classes)}>{children}</h5>;
    }
    if (variant === 'h1') {
        return <h1 className={cx('text-xl', 'font-bold', 'leading-2xl', 'tracking-denser', classes)}>{children}</h1>;
    }
    if (variant === 'h2') {
        return <h2 className={cx('text-lg', 'font-bold', 'leading-2xl', 'tracking-denser', classes)}>{children}</h2>;
    }
    if (variant === 'h3') {
        return <h3 className={cx('text-2md', 'font-semibold', 'leading-2lg', 'tracking-normal', classes)}>{children}</h3>;
    }
    if (variant === 'h4') {
        return <h4 className={cx('text-md', 'font-semibold', 'leading-lg', 'tracking-normal', classes)}>{children}</h4>;
    }
    if (variant === 'h5') {
        return <h5 className={cx('text-sm', 'font-semibold', 'leading-md', 'tracking-normal', classes)}>{children}</h5>;
    }
    if (variant === 'bd-1') {
        return <span className={cx('text-2md', 'font-bold', 'leading-2lg', 'tracking-normal', classes)}>{children}</span>;
    }
    if (variant === 'bd-1a') {
        return <span className={cx('text-2md', 'font-bold', 'leading-2lg', 'tracking-normal', classes)}>{children}</span>;
    }
    if (variant === 'bd-2') {
        return <span className={cx('text-md', 'font-bold', 'leading-lg', 'tracking-normal', classes)}>{children}</span>;
    }
    if (variant === 'bd-2a') {
        return <span className={cx('text-md', 'font-medium', 'leading-lg', 'tracking-normal', classes)}>{children}</span>;
    }
    if (variant === 'bd-2b') {
        return <span className={cx('text-md', 'font-normal', 'leading-lg', 'tracking-normal', classes)}>{children}</span>;
    }
    if (variant === 'bd-3') {
        return <span className={cx('text-sm', 'font-bold', 'leading-md', 'tracking-normal', classes)}>{children}</span>;
    }
    if (variant === 'bd-3a') {
        return <span className={cx('text-sm', 'font-medium', 'leading-md', 'tracking-normal', classes)}>{children}</span>;
    }
    if (variant === 'bd-3b') {
        return <span className={cx('text-sm', 'font-normal', 'leading-md', 'tracking-normal', classes)}>{children}</span>;
    }
    if (variant === 'p-1') {
        return <p className={cx('text-2md', 'font-normal', 'leading-xl', 'tracking-normal', classes)}>{children}</p>;
    }
    if (variant === 'p-1a') {
        return <p className={cx('text-2md', 'font-semibold', 'leading-xl', 'tracking-normal', classes)}>{children}</p>;
    }
    if (variant === 'p-2') {
        return <p className={cx('text-md', 'font-normal', 'leading-2lg', 'tracking-normal', classes)}>{children}</p>;
    }
    if (variant === 'p-2a') {
        return <p className={cx('text-md', 'font-semibold', 'leading-2lg', 'tracking-normal', classes)}>{children}</p>;
    }
    if (variant === 'p-3') {
        return <p className={cx('text-sm', 'font-regular', 'leading-md', 'tracking-normal', classes)}>{children}</p>;
    }
    if (variant === 'p-3a') {
        return <p className={cx('text-sm', 'font-semibold', 'leading-md', 'tracking-normal', classes)}>{children}</p>;
    }
    if (variant === 'caption') {
        return <caption className={cx('text-xs', 'font-normal', 'leading-sm', 'tracking-normal', classes)}>{children}</caption>;
    }
    if (variant === 'caption-1a') {
        return <caption className={cx('text-xs', 'font-bold', 'leading-sm', 'tracking-loose', classes)}>{children}</caption>;
    }

    return <span className={cx('text-md', 'font-medium', 'leading-lg', classes)}>{children}</span>;
};

Typography.propTypes = {
    variant: PropTypes.oneOf([
        'h-xl',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'bd-1',
        'bd-1a',
        'bd-2',
        'bd-2a',
        'bd-2b',
        'bd-3',
        'bd-3a',
        'bd-3b',
        'p-1',
        'p-1a',
        'p-2',
        'p-2a',
        'p-3',
        'p-3a',
        'caption',
        'caption-1a',
    ]),
};

Typography.defaultProps = {
    variant: 'bd-2',
};

export default Typography;
