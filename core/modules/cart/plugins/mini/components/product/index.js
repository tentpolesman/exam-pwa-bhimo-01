import Item from '@plugin_minicart/components/product/item';

import cx from 'classnames';

const ItemCart = (props) => {
    const {
        data, deleteCart, updateCart, t, storeConfig, currencyCache,
    } = props;

    if (data.length === 0) {
        return <div className={cx('mt-[40px]', 'text-center', 'text-[10px]', 'uppercase')}>{t('common:cart:emptyCart')}</div>;
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
