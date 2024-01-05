import Item from '@plugin_minicart/components/product/item';

import cx from 'classnames';
import Typography from '@common_typography';
import Button from '@common_button';
import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';

const ItemCart = (props) => {
    const {
        data, deleteCart, updateCart, t, storeConfig, currencyCache,
    } = props;

    if (data.length === 0) {
        return (
            <div className="w-full h-[calc(100vh-20rem)] gap-4 flex flex-col align-middle justify-center items-center">
                <ShoppingCartIcon className={cx(
                    'w-10 h-10 tablet:w-14 tablet:h-14 text-neutral-300',
                )}
                />
                <Typography className="font-normal text-[14px] tablet:text-base">
                    {t('cart:empty:text')}
                </Typography>
                <Button
                    variant="primary"
                    className={cx(
                        'justify-center',
                        'h-full w-full max-h-[38px] tablet:max-h-[48px] max-w-[142px] tablet:max-w-[170px]',
                    )}
                    link="/"
                >
                    {t('cart:button:startShopping')}
                </Button>
            </div>
        );
    }
    let heightFinal = window.innerHeight - 240;

    if (window.innerWidth < 768) {
        heightFinal = window.innerHeight - 200;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        heightFinal = window.innerHeight - 220;
    }

    return (
        <ol className={cx('overflow-y-auto')} style={{ height: heightFinal }}>
            {data.map((val, idx) => (
                <Item {...val} key={idx} deleteCart={deleteCart} updateCart={updateCart} storeConfig={storeConfig} currencyCache={currencyCache} />
            ))}
        </ol>
    );
};

export default ItemCart;
