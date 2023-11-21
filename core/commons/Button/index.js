import cx from 'classnames';
import Typography from '@common_typography';

const Button = (props) => {
    const {
        className = {},
        variant = 'primary',
        children,
        disabled = false,
        onClick = () => {},
        loading = false,
        size = 'md',
        iconProps = {},
    } = props;
    const { icon = '', position = 'right', iconOnly = false } = iconProps;

    const buttonSizes = {
        sm: `px-[16px] py-[8px] ${iconOnly ? '!p-[8px]' : ''}`,
        md: `px-[20px] py-[10px] ${iconOnly ? '!p-[10px]' : ''}`,
        lg: `px-[22px] py-[12px] ${iconOnly ? '!p-[10px]' : ''}`,
        xl: `px-[26px] py-[14px] ${iconOnly ? '!p-[12px]' : ''}`,
    };

    const textVariants = {
        sm: 'bd-2a',
        md: 'bd-2a',
        lg: 'bd-2',
        xl: 'bd-1',
    };

    const classes = cx('focus:shadow-[0_0_0_4px]', 'rounded-md', buttonSizes[size], className);

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || loading}
            className={cx(
                {
                    'bg-pwa-button_background hover:bg-pwa-button_background_hover focus:shadow-primary-100 active:bg-primary-400':
                        variant === 'primary',
                    'bg-secondary hover:bg-secondary-300 focus:shadow-secondary-100 active:bg-secondary-500': variant === 'secondary',
                    'bg-neutral-white hover:shadow-[0_10px_15px_-3px] hover:shadow-black/10 focus:shadow-primary-100 active:shadow-[0_1px_3px_0] active:shadow-black/10':
                        variant === 'tertiary',
                    'bg-neutral-white border border-black hover:opacity-50 focus:shadow-neutral-100 focus:border-none': variant === 'outlined',
                    'bg-neutral-100 hover:bg-neutral-100 hover:shadow-none focus:shadow-none active:bg-neutral-100 active:shadow-none':
                        disabled || loading,
                },
                classes,
            )}
        >
            <Typography
                variant={textVariants[size]}
                className={cx('flex', 'items-center', {
                    '!text-pwa-button_text': variant === 'primary' || variant === 'secondary',
                    '!text-primary': variant === 'tertiary',
                    '!text-black': variant === 'outlined',
                    '!text-neutral-white': disabled,
                    'flex-row-reverse': icon && position === 'right',
                })}
            >
                {icon || loading ? (
                    <span
                        class={cx('material-symbols-outlined', {
                            'mr-[6px]': position !== 'right' && !iconOnly,
                            'ml-[6px]': position === 'right' && !iconOnly,
                            'text-lg': !iconOnly || (iconOnly && (size === 'sm' || size === 'md')),
                            'animate-spin': loading,
                        })}
                    >
                        {!loading ? icon : 'progress_activity'}
                    </span>
                ) : null}
                {icon && iconOnly ? null : children}
            </Typography>
        </button>
    );
};

export default Button;
