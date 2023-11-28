import React from 'react';
import cx from 'classnames';

const Badge = ({
    className,
    label,
    bold,
    primary,
    secondary,
    danger,
    softColor,
    warning,
    success,
    fontSize = 12,
}) => {
    let classNamesColor = softColor ? cx('bg-pwa-badge-purple-50', 'text-primary-300') : cx('bg-primary-300', 'text-pwa-badge-purple-50');
    if (danger) {
        classNamesColor = softColor ? cx('bg-pwa-badge-red-50', 'text-pwa-badge-red-600') : cx('bg-pwa-badge-red-600', 'text-white');
    }
    if (primary) {
        classNamesColor = softColor ? cx('bg-pwa-badge-purple-50', 'text-primary-300') : cx('bg-primary-300', 'text-pwa-badge-purple-50');
    }
    if (secondary) {
        classNamesColor = softColor ? cx('bg-neutral-50', 'text-neutral-300') : cx('bg-neutral-300', 'text-neutral-50');
    }
    if (warning) {
        classNamesColor = softColor ? cx('bg-pwa-badge-yellow-50', 'text-pwa-badge-yellow-500') : cx('bg-pwa-badge-yellow-500', 'text-white');
    }
    if (success) {
        classNamesColor = softColor ? cx('bg-pwa-badge-green-50', 'text-pwa-badge-green-600') : cx('bg-pwa-badge-green-600', 'text-white');
    }
    return (
        <div
            style={{
                ...(fontSize ? { fontSize } : null),
            }}
            className={
                cx(
                    'rounded-[4px]',
                    'px-[8px]',
                    'py-[4px]',
                    bold && 'font-bold',
                    className,
                    classNamesColor,
                )
            }
        >
            {label}
        </div>
    );
};

export default Badge;
