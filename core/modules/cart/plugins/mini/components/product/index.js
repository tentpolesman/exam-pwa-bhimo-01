import Item from '@plugin_minicart/components/product/item';
// TODO: remove MUI
import useStyles from '@plugin_minicart/components/style';

import cx from 'classnames';

const ItemCart = (props) => {
    // TODO: remove MUI
    const styles = useStyles();
    const {
        data, deleteCart, updateCart, t, storeConfig, currencyCache,
    } = props;
    if (data.length === 0) {
        // TODO: remove MUI
        return <div className={styles.emptyCart}>{t('common:cart:emptyCart')}</div>;
    }
    const heightFinal = window.innerHeight - 240;
    return (
        <ol className={cx('overflow-y-auto')} style={{ height: heightFinal }}>
            {data.map((val, idx) => (
                <Item {...val} key={idx} deleteCart={deleteCart} updateCart={updateCart} storeConfig={storeConfig} currencyCache={currencyCache} />
            ))}
        </ol>
    );
};

export default ItemCart;
