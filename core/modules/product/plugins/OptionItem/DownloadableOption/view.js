/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
import OptionItemAction from '@core_modules/product/plugins/OptionItemAction';
import CheckBox from '@common/Forms/CheckBox';
import Typography from '@common_typography';
import Divider from '@common_divider';
import { formatPrice } from '@helper_currency';
import Show from '@common/Show';

const DownloadView = (props) => {
    const {
        t,
        items,
        handleOptionDownloadable,
        handleOptionAll,
        disabled,
        loading,
        showQty = true,
        qty,
        setQty,
        handleAddToCart,
        showAddToCart = true,
        CustomFooter,
        currencyCode,
        currencyCache,
        isPlp,
        ...other
    } = props;
    const setLoading = !(loading === 0 || loading === false);
    return (
        <>
            <div className="options-container">
                <Show when={!isPlp && items && items.length > 0}>
                    {
                        items.map(
                            (val, key) => (
                                <div
                                    key={`checkbox-${key}`}
                                    className="checkbox-container mb-[14px]"
                                >
                                    <CheckBox
                                        variant="single"
                                        key={`checkbox-${key}`}
                                        disabled={disabled}
                                        id={val.id}
                                        name={val.id}
                                        value={val.id}
                                        defaultChecked={val.is_default}
                                        onClick={() => !disabled && handleOptionDownloadable(val.id, val.price)}
                                        classNames={{
                                            checkboxClasses: 'w-[16px] h-[16px]',
                                        }}
                                    >
                                        <Typography variant="bd-2b">
                                            {`${val.title} + `}
                                            <b>{`${formatPrice(val.price, currencyCode, currencyCache)}`}</b>
                                        </Typography>
                                    </CheckBox>
                                </div>
                            ),
                        )
                    }
                    <Divider className="mt-[24px] mb-[8px]" />
                </Show>
            </div>
            {
                React.isValidElement(CustomFooter)
                    ? React.cloneElement(CustomFooter, {
                        ...other,
                        loading: setLoading,
                        disabled,
                        showQty,
                        handleAddToCart,
                        qty,
                        setQty,
                        t,
                        showAddToCart,
                    })
                    : (
                        <OptionItemAction
                            loading={setLoading}
                            disabled={disabled}
                            showQty={showQty}
                            handleAddToCart={handleAddToCart}
                            qty={qty}
                            setQty={setQty}
                            t={t}
                            showAddToCart={showAddToCart}
                            {...other}
                        />
                    )
            }
        </>
    );
};

export default DownloadView;
