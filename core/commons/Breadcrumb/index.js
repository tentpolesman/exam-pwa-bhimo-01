/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Typography from '@common_typography/index';
import { useTranslation } from 'next-i18next';
import { COLORS } from '@theme_vars';
import { setResolver, getResolver } from '@helper_localstorage';

const handleClick = async (url, id) => {
    if (id) {
        const urlResolver = getResolver();
        urlResolver[url] = {
            type: 'CATEGORY',
            id,
        };
        await setResolver(urlResolver);
    }
};

const ItemBreadcrumb = ({
    icon,
    id,
    url,
    label,
    labelStyle,
    seperate,
}) => (
    <div className={cx(
        'section-breadcrumb-item',
        'flex',
        'items-center',
    )}
    >
        {
            icon && (
                <span className="material-symbols-outlined text-[18px] mr-[4px]">
                    {icon}
                </span>
            )
        }
        <Link href={url} passHref onClick={() => handleClick(url, id)}>
            <Typography
                variant="bd-2b"
                style={labelStyle}
                className={cx('text-sm', 'whitespace-nowrap')}
            >
                {label}
            </Typography>
            {
                seperate && <Typography variant="bd-2b" className="mx-[10px]">/</Typography>
            }
        </Link>
    </div>
);

const Breadcrumbs = ({
    data = [],
    withHome = true,
}) => {
    const { t } = useTranslation(['common']);
    return (
        <div className={cx(
            'section-breadcrumb',
            'flex',
            'items-center',
            'mb-[10px]',
            'overflow-x-auto',
        )}
        >
            {
                withHome && (
                    <ItemBreadcrumb
                        key="breadcrumb-home"
                        icon="home"
                        url="/"
                        label={t('common:home:title')}
                        seperate={data?.length > 0}
                    />
                )
            }
            {
                data && data.map((item, index) => {
                    const isActive = item?.active || false;
                    return (
                        <ItemBreadcrumb
                            key={`breadcrumb-${index}-${item?.id}`}
                            id={item?.id}
                            url={item?.link}
                            label={item?.label}
                            labelStyle={isActive && { color: COLORS.neutral[200] }}
                            seperate={!isActive}
                        />
                    );
                })
            }
        </div>
    );
};

export default Breadcrumbs;
