/* eslint-disable radix */
import Link from 'next/link';
import cx from 'classnames';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import Button from '@common_button';
import PriceFormat from '@common_priceformat';
import Typography from '@common_typography';
import Dialog from '@common_dialog';
import Image from '@common_image';
import { setResolver, getResolver } from '@helper_localstorage';

const WishlistComp = ({
    price_range, price_tiers, __typename, imageSrc,
    name, wishlistItemId, t, sku, url_key,
    handleRemove, handleToCart, special_from_date, special_to_date,
    storeConfig,
}) => {
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleDelete = () => {
        handleRemove({ wishlistItemId });
        setOpenDelete(!openDelete);
    };
    const handleAddToCart = () => {
        handleToCart({
            sku, url_key, wishlistItemId, __typename,
        });
    };
    const handleClick = async (link) => {
        const urlResolver = getResolver();
        urlResolver[link] = {
            type: 'PRODUCT',
        };
        await setResolver(urlResolver);
    };

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <>
            <Dialog
                open={openDelete}
                onClose={() => setOpenDelete(!openDelete)}
                title={t('customer:wishlist:warningDelete')}
                positiveAction={handleDelete}
                positiveLabel={t('common:button:yes')}
                negativeLabel={t('common:button:cancel')}
                negativeAction={() => setOpenDelete(!openDelete)}
            />
            <div
                className={cx(
                    'border-[1px] border-neutral-200 flex items-center w-full',
                    'desktop:mb-[15px] mb-[0px]',
                )}
            >
                <div
                    className={cx(
                        'w-[127px] h-[156px] flex flex-col items-center justify-center m-[2px_0px] mobile:m-[0px]',
                    )}
                >
                    <Image
                        src={imageSrc}
                        alt={name}
                        width={defaultWidth}
                        height={defaultHeight}
                        quality={80}
                        storeConfig={storeConfig}
                    />
                </div>
                <div
                    className={cx(
                        'flex flex-col items-center text-center w-[70%]',
                    )}
                >
                    <Link
                        href="/[...slug]"
                        as={`/${url_key}`}
                        onClick={() => handleClick(`/${url_key}`)}
                        style={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        <Typography variant="p">{name}</Typography>
                    </Link>
                    <PriceFormat
                        variant="p"
                        priceRange={price_range}
                        priceTiers={price_tiers}
                        productType={__typename}
                        specialFromDate={special_from_date}
                        specialToDate={special_to_date}
                    />
                    <Button
                        onClick={handleAddToCart}
                        className="mt-2"
                    >
                        <Typography className={cx('!text-neutral-white uppercase')}>
                            {t('customer:wishlist:addToBag')}
                        </Typography>
                    </Button>
                </div>
                <div className="w-[50px] h-[50px] flex items-center justify-center">
                    <Button
                        className={cx(
                            '!m-0',
                            '!px-0',
                            '!py-0',
                            '!ml-0',
                            'hover:shadow-none',
                            'focus:shadow-none',
                            'active:shadow-none',
                            'active:shadow-none',
                        )}
                        onClick={() => setOpenDelete(!openDelete)}
                        icon={<TrashIcon />}
                        iconProps={{
                            className: cx('mobile:max-tablet:w-[20px]', 'tablet:w-[24px]', 'text-neutral-500'),
                        }}
                        iconOnly
                        variant="tertiary"
                        classNameText={cx('!text-neutral-700')}
                    />
                </div>
            </div>
        </>
    );
};

export default WishlistComp;
