import cx from 'classnames';

const Icon = (props) => {
    const { icon, className = '', ...restProps } = props;

    if (icon) return <span class={cx('material-symbols-outlined', className)} {...restProps}>{icon}</span>;

    return null;
};

export default Icon;
