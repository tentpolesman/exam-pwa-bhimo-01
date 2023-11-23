import cx from 'classnames';

const Icon = (props) => {
    const { icon, className = '' } = props;

    if (icon) return <span class={cx('material-symbols-outlined', className)}>{icon}</span>;

    return null;
};

export default Icon;
