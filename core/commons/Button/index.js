import Show from '@common_show';
import Typography from '@common_typography';
import ArrowPath from '@heroicons/react/24/outline/ArrowPathIcon';
import cx from 'classnames';
import propTypes from 'prop-types';

const Button = (props) => {
    const {
        className = '',
        classNameText = '',
        variant = 'primary',
        children,
        disabled = false,
        onClick = () => {},
        loading = false,
        size = 'md',
        icon,
        iconPosition: position,
        iconOnly,
        textProps = {},
        iconProps = {},
        customChildren,
        ...restProps
    } = props;

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

    const { className: classIcon, ...resIconProps } = iconProps;

    const primaryClass = `
    bg-pwa-button_background hover:bg-pwa-button_background_hover focus:shadow-primary-300 active:bg-primary
    disabled:bg-neutral-200 disabled:text-neutral-400 disabled:hover:shadow-none
    disabled:focus:shadow-none disabled:active:bg-neutral-200 disabled:active:shadow-none`;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || loading}
            className={cx(
                'group',
                'hover:shadow-lg',
                variant === 'primary' && primaryClass,
                {
                    'bg-pwa-button_background hover:bg-pwa-button_background_hover focus:shadow-primary-300 active:bg-primary': variant === 'primary',
                    'bg-primary-100 hover:bg-primary-200 focus:shadow-primary-300 active:bg-primary-200': variant === 'secondary',
                    // eslint-disable-next-line max-len
                    'bg-neutral-white hover:shadow-lg focus:shadow-primary-300 active:shadow-primary-300 active:shadow-[0_0_0_4px]':
                        variant === 'tertiary',
                    'bg-neutral-white border border-black hover:opacity-50 focus:shadow-neutral-100 focus:border-none': variant === 'outlined',
                },
                classes,
            )}
            {...restProps}
        >
            <Typography
                variant={textVariants[size]}
                className={cx(
                    'flex',
                    'items-center',
                    'justify-center',
                    {
                        '!text-pwa-button_text': variant === 'primary',
                        '!text-primary': variant === 'secondary' || variant === 'tertiary',
                        '!text-black': variant === 'outlined',
                        '!text-neutral-white': disabled,
                        'group-active:!text-neutral-white': variant === 'secondary',
                        'flex-row-reverse': icon && position === 'right',
                    },
                    classNameText,
                )}
                {...textProps}
            >
                <Show when={icon && loading}>
                    <ArrowPath
                        className={cx('animate-spin w-6 h-6', {
                            'mr-[6px]': position !== 'right' && !iconOnly,
                            'ml-[6px]': position === 'right' && !iconOnly,
                            'text-lg': !iconOnly || (iconOnly && (size === 'sm' || size === 'md')),
                        })}
                    />
                </Show>
                <Show when={icon && !loading}>
                    {icon ? React.cloneElement(icon, {
                        className: cx(
                            'w-6 h-6',
                            {
                                'mr-[6px]': position !== 'right' && !iconOnly,
                                'ml-[6px]': position === 'right' && !iconOnly,
                            },
                            classIcon,
                        ),
                        ...resIconProps,
                    }) : null}
                </Show>
                <Show when={!iconOnly}>{children}</Show>
            </Typography>
            {customChildren && customChildren}
        </button>
    );
};

Button.propTypes = {
    className: propTypes.string,
    iconOnly: propTypes.bool,
    variant: propTypes.oneOf(['primary', 'secondary', 'tertiary', 'outlined']),
    children: propTypes.any,
    disabled: propTypes.bool,
    onClick: propTypes.func,
    loading: propTypes.bool,
    size: propTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    icon: propTypes.element,
    iconPosition: propTypes.oneOf(['left', 'right']),
};

Button.defaultProps = {
    className: '',
    iconOnly: false,
    variant: 'primary',
    children: '',
    disabled: false,
    onClick: () => {},
    loading: false,
    size: 'md',
    icon: undefined,
    iconPosition: 'left',
};

export default Button;
