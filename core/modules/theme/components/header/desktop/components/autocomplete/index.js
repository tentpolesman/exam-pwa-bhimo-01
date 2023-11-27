/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import { getCategoryByName, getProduct, getSellerByName } from '@core_modules/theme/services/graphql';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import Router from 'next/router';
import React from 'react';

import CommonTextField from '@common_forms/TextField';
import Icon from '@common_icon';
import Popover from '@common_popover';

import Image from 'next/image';

let globalTimeout = null;

const generateItemData = (product, category, seller, enableMultiseller) => {
    const result = [];
    for (let index = 0; index < product.items.length; index++) {
        const element = product.items[index];
        const prod = {
            id: element.id,
            name: element.name,
            seller_name: enableMultiseller ? element?.seller?.seller_name : '',
            url_key: element.url_key,
            position: index,
            small_image: element.small_image,
            price_tiers: element.price_tiers,
            price_range: element.price_range,
            type: 'product',
        };
        result.push(prod);
    }
    for (let index = 0; index < category.length; index++) {
        const element = category[index];
        const cat = {
            id: element.id,
            name: element.name,
            url_key: element.url_path,
            breadcrumbs: element.breadcrumbs,
            position: index,
            type: 'category',
        };
        result.push(cat);
    }
    if (enableMultiseller) {
        for (let index = 0; index < seller.length; index++) {
            const element = seller[index];
            const sell = {
                additional_info: element.additional_info,
                city: element.city,
                address: element.address,
                description: element.description,
                id: element.id,
                latitude: element.latitude,
                logo: element.logo,
                longitude: element.longitude,
                name: element.name,
                status: element.status,
                position: index,
                type: 'seller',
            };
            result.push(sell);
        }
    }
    return result;
};

export default function AutocompleteSearch(props) {
    const { placeholder, handleSearch, storeConfig } = props;
    const { t } = useTranslation(['common']);
    const [item, setItem] = React.useState(null);
    const [isShow, setIsShow] = React.useState(false);
    const [searchKeyword, setSearchKeyword] = React.useState('');

    const enableMultiseller = storeConfig.enable_oms_multiseller === '1';

    const [actGetProduct, { loading, data, called }] = getProduct(searchKeyword);
    const [actGetCategory, { data: dCategory, loading: lCategory, called: cCategory }] = getCategoryByName(searchKeyword);
    const [actGetSeller, { data: dSeller, loading: lSeller, called: cSeller }] = getSellerByName(searchKeyword);

    const inputRef = React.useRef(null);

    React.useEffect(() => {
        if (enableMultiseller && data && dCategory && dSeller && !loading && !lCategory && !lSeller) {
            setItem(generateItemData(data.products, dCategory.categoryList, dSeller.getSeller, enableMultiseller));
        } else if (!enableMultiseller && data && dCategory && !loading && !lCategory) {
            setItem(generateItemData(data.products, dCategory.categoryList, enableMultiseller));
        }
    }, [data, dCategory, dSeller, enableMultiseller, loading, lCategory, lSeller]);

    const handleKeyPress = (e) => {
        handleSearch(e);
    };

    const handleAutocomplete = (e) => {
        if (e.target.value === '') {
            setSearchKeyword('');
            setIsShow(false);
            setItem(null);
        } else {
            if (globalTimeout) {
                clearTimeout(globalTimeout);
            }

            globalTimeout = setTimeout(() => {
                if (!loading && !lCategory && !called && !cCategory) {
                    actGetProduct();
                    actGetCategory();
                    if (enableMultiseller) {
                        if (!cSeller) {
                            actGetSeller();
                        }
                    }
                }
            }, 150);
        }
    };

    React.useEffect(() => {
        if (isShow === false) {
            setSearchKeyword('');
            setItem(null);
        }
    }, [isShow]);

    React.useEffect(() => {
        if (item !== null && item.length > 0) {
            setIsShow(true);
        }
    }, [item]);

    const PopoverContent = () => {
        const PopoverItem = (propsPopoverItem, key) => {
            const {
                name, type, position, small_image, breadcrumbs, logo, city, seller_name,
            } = propsPopoverItem;

            const sharedProp = {
                name: propsPopoverItem?.name || '',
                small_image: propsPopoverItem?.small_image || {},
                price: propsPopoverItem?.price_range
                    ? {
                        priceRange: propsPopoverItem.price_range,
                        priceTiers: propsPopoverItem.price_tiers || [],
                    }
                    : {},
            };

            const handleOnClickItem = (onClickProps) => {
                const { result: resultType, id: seller_id, url_key } = onClickProps;
                if (resultType === 'seller') {
                    Router.push(
                        {
                            pathname: '/[...slug]',
                            query: {
                                productProps: JSON.stringify(sharedProp),
                            },
                        },
                        `/seller/${seller_id}`,
                    );
                } else {
                    Router.push(
                        {
                            pathname: '/[...slug]',
                            query: {
                                productProps: JSON.stringify(sharedProp),
                            },
                        },
                        `/${url_key}`,
                    );
                }
            };

            const citySplit = city?.split(',');
            let breadcrumbsText = '';
            if (breadcrumbs) {
                for (let i = 0; i < breadcrumbs.length; i++) {
                    const element = breadcrumbs[i];
                    breadcrumbsText += `${element.category_name} > `;
                }
            }

            return (
                <>
                    {type === 'product' ? (
                        <>
                            {position === 0 ? <div className={cx('top-title', 'pt-2', 'pb-4', 'uppercase', 'font-bold')}>Product</div> : null}
                            <div
                                className={cx('grid', 'xs:grid-cols-[64px_1fr]', 'gap-x-2', 'py-4', 'hover:bg-neutral-50', 'hover:cursor-pointer')}
                                key={key}
                                onClick={() => handleOnClickItem(propsPopoverItem)}
                                role="presentation"
                            >
                                <div className="image-container">
                                    <Image alt={name} src={small_image.url} width={64} height={64} />
                                </div>
                                <div className={cx('title-search-item', 'text-sm', 'uppercase')}>
                                    {`${name.substr(0, 47)}${name.length > 47 ? '...' : null}`}
                                </div>
                                {seller_name && (
                                    <div className="info-seller">
                                        <Icon icon="storefront" />
                                        <div className="title-seller">{seller_name}</div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : null}
                    {type === 'category' ? (
                        <>
                            {position === 0 ? <div className={cx('top-title', 'pt-2', 'pb-4', 'uppercase', 'font-bold')}>Categories</div> : null}
                            <div
                                className={cx('grid', 'py-4', 'hover:bg-neutral-50', 'hover:cursor-pointer')}
                                key={key}
                                onClick={() => handleOnClickItem(propsPopoverItem)}
                                role="presentation"
                            >
                                <div className={cx('breadcrumbs', 'block', 'text-sm', 'text-neutral-200', 'uppercase', 'italic')}>
                                    {breadcrumbsText}
                                </div>
                                <div className="title-category block text-sm uppercase">{name}</div>
                            </div>
                        </>
                    ) : null}
                    {type === 'seller' ? (
                        <>
                            {position === 0 ? <div className={cx('top-title', 'pt-2', 'pb-4', 'uppercase', 'font-bold')}>Seller</div> : null}
                            <div
                                className={cx('grid', 'xs:grid-cols-[64px_1fr]', 'gap-x-2', 'py-4', 'hover:bg-neutral-50', 'hover:cursor-pointer')}
                                key={key}
                                onClick={() => handleOnClickItem(propsPopoverItem)}
                                role="presentation"
                            >
                                <div className="image-container">
                                    <Image alt={name} src={logo} width={64} height={64} />
                                </div>
                                <div className="title-search-item">{name}</div>
                                <div className="address">{citySplit ? citySplit[0] : ''}</div>
                            </div>
                        </>
                    ) : null}
                </>
            );
        };

        return (
            <>
                {isShow && searchKeyword.length !== 0 && (item === null || (typeof item === 'object' && item.length === 0)) ? (
                    <div className={cx('breadcrumbs', 'block', 'text-sm', 'text-neutral-200', 'uppercase', 'italic')}>
                        {t('common:error:notFound')}
                    </div>
                ) : (
                    item !== null && item.map((items, index) => <PopoverItem key={index} {...items} />)
                )}
            </>
        );
    };

    return (
        <>
            <Popover content={<PopoverContent />} open={isShow} setOpen={setIsShow}>
                <CommonTextField
                    value={searchKeyword}
                    placeholder={placeholder || t('common:search:title')}
                    onChange={(e) => {
                        setSearchKeyword(e.target.value);
                        handleAutocomplete(e);
                    }}
                    ref={inputRef}
                    iconProps={{
                        rightIcon: 'search',
                        rightIconClasses: 'text-neutral-300',
                    }}
                    onKeyPress={(e) => {
                        handleKeyPress({
                            key: e.key,
                            target: {
                                value: searchKeyword,
                            },
                        });
                    }}
                    onBlur={() => {
                        setSearchKeyword('');
                        setItem(null);
                        setIsShow(false);
                    }}
                />
            </Popover>
        </>
    );
}
