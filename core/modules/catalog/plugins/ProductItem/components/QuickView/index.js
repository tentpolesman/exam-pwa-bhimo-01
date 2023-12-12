/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
import PriceFormat from '@common_priceformat';
import Typography from '@common_typography';
import { getSeller } from '@core_modules/theme/services/graphql';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { getPriceFromList } from '@core_modules/product/helpers/getPrice';
import { formatPrice } from '@helper_currency';
import Skeleton from '@material-ui/lab/Skeleton';
import QuickView from './view';

const QuickViewCore = (props) => {
    const { t } = useTranslation(['validate', 'common', 'product', 'catalog']);
    const {
        onClose, selectedValue, keyProduct, open, data, weltpixel_labels, storeConfig = {}, dataPrice = [], loadPrice, errorPrice,
    } = props;
    let productKey;
    for (let i = 0; i < data.items.length; i += 1) {
        if (keyProduct === data.items[i].url_key) {
            productKey = [i];
        }
    }

    const product = data && data.items[productKey];

    // const reviewValue = parseInt(product?.review?.rating_summary, 10) / 20;

    let enableMultiSeller = false;
    if (storeConfig) {
        enableMultiSeller = storeConfig.enable_oms_multiseller === '1';
    }

    // getSeller gql
    const [actGetSeller, { data: dSeller }] = getSeller();

    React.useEffect(() => {
        if (product) {
            actGetSeller({
                variables: {
                    input: {
                        seller_id: [parseFloat(product.seller_id)],
                    },
                },
            });
        }
    }, [product]);

    let dataSeller;
    // let citySplit;
    if (enableMultiSeller && dSeller && dSeller.getSeller) {
        dataSeller = dSeller && dSeller.getSeller;
    }
    if (enableMultiSeller && dataSeller && dataSeller.length > 0) {
        // citySplit = dataSeller[0].city?.split(',');
    }

    // generate banner image
    const bannerData = [];
    if (product?.media_gallery?.length > 0) {
        // eslint-disable-next-line array-callback-return
        product.media_gallery.map((media) => {
            bannerData.push({
                link: '#',
                imageUrl: media.url,
            });
        });
    } else {
        bannerData.push({
            link: '#',
            imageUrl: product?.image?.url,
        });
    }

    const [banner, setBanner] = React.useState(bannerData);
    const [price, setPrice] = React.useState({
        priceRange: product.price_range,
        priceTiers: product.price_tiers,
        // eslint-disable-next-line no-underscore-dangle
        productType: product.__typename,
        specialFromDate: product.special_from_date,
        specialToDate: product.special_to_date,
    });
    const [additionalPrice, setAdditionalPrice] = React.useState(0);
    const [stockStatus, setStockStatus] = React.useState(product.stock_status);
    // Customizable Options
    const [customizableOptions, setCustomizableOptions] = React.useState([]);
    const [errorCustomizableOptions, setErrorCustomizableOptions] = React.useState([]);
    const [spesificProduct, setSpesificProduct] = React.useState({});

    const checkCustomizableOptionsValue = async () => {
        if (product.options && product.options.length > 0) {
            const requiredOptions = product.options.filter((op) => op.required);
            if (requiredOptions.length > 0) {
                if (customizableOptions.length > 0) {
                    let countError = 0;
                    const optionsError = [];
                    for (let idx = 0; idx < requiredOptions.length; idx += 1) {
                        const op = requiredOptions[idx];
                        const findValue = customizableOptions.find((val) => val.option_id === op.option_id);
                        if (!findValue) {
                            optionsError.push(op);
                            countError += 1;
                        }
                    }
                    if (countError > 0) {
                        await setErrorCustomizableOptions(optionsError);
                        return false;
                    }
                    return true;
                }
                await setErrorCustomizableOptions(requiredOptions);

                return false;
            }
            return true;
        }
        return true;
    };

    React.useEffect(() => {
        if (errorCustomizableOptions && errorCustomizableOptions.length > 0) {
            // eslint-disable-next-line consistent-return
            const errorCustomizable = errorCustomizableOptions.filter((err) => {
                const findValue = customizableOptions.find((op) => op.option_id === err.option_id);
                return !findValue;
            });
            setErrorCustomizableOptions(errorCustomizable);
        }
    }, [customizableOptions]);

    const handleClose = () => {
        onClose(selectedValue);
        document.body.style = '';
    };

    const priceData = getPriceFromList(dataPrice, product.id);
    const generatePrice = (priceDataItem, priceItem) => {
        // handle if loading price
        if (loadPrice) {
            return (
                <div>
                    <Skeleton variant="text" width={100} />
                    {' '}
                </div>
            );
        }
        let priceProduct = priceItem;
        // handle if have an update price state
        if (priceItem && priceItem.update) {
            priceProduct = priceItem;
        }
        if (priceDataItem.length > 0 && !loadPrice && !errorPrice && !priceItem.update) {
            priceProduct = {
                priceRange: spesificProduct.price_range ? spesificProduct.price_range : priceDataItem[0].price_range,
                priceTiers: spesificProduct.price_tiers ? spesificProduct.price_tiers : priceDataItem[0].price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: priceDataItem[0].__typename,
                specialFromDate: priceDataItem[0].special_from_date,
                specialToDate: priceDataItem[0].special_to_date,
            };
        }
        return (
            <>
                {
                    priceProduct && <PriceFormat isQuickViewCore {...priceProduct} additionalPrice={additionalPrice} />
                }
            </>
        );
    };

    const generateTiersPrice = (priceDataItem, priceItem) => {
        // handle if loading price
        if (loadPrice) {
            return (
                <div>
                    <Skeleton variant="text" width={100} />
                    {' '}
                </div>
            );
        }

        let priceProduct = priceItem;
        if (priceDataItem.length > 0 && !loadPrice && !errorPrice) {
            priceProduct = {
                priceRange: spesificProduct.price_range ? spesificProduct.price_range : priceDataItem[0].price_range,
                priceTiers: spesificProduct.price_tiers ? spesificProduct.price_tiers : priceDataItem[0].price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: priceDataItem[0].__typename,
                specialFromDate: priceDataItem[0].special_from_date,
                specialToDate: priceDataItem[0].special_to_date,
            };
        }
        return (
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col tablet:mb-4">
                    {
                        priceProduct.priceTiers.length > 0 && priceProduct.priceTiers.map((tiers, index) => {
                            const priceTiers = {
                                quantity: tiers.quantity,
                                currency: tiers.final_price.currency,
                                price: formatPrice(tiers.final_price.value),
                                discount: tiers.discount.percent_off,
                            };
                            return (
                                <>
                                    {priceTiers.quantity > 1 && (
                                        <Typography variant="p" type="regular" key={index}>
                                            {t('product:priceTiers', { priceTiers })}
                                        </Typography>
                                    )}
                                </>
                            );
                        })
                    }
                </div>
            </div>
        );
    };

    return (
        <QuickView
            open={open}
            handleClose={handleClose}
            generatePrice={generatePrice}
            generateTiersPrice={generateTiersPrice}
            price={price}
            priceData={priceData}
            product={product}
            t={t}
            data={product}
            dataPrice={dataPrice}
            setBanner={setBanner}
            setPrice={setPrice}
            setStockStatus={setStockStatus}
            stockStatus={stockStatus}
            setAdditionalPrice={setAdditionalPrice}
            customizableOptions={customizableOptions}
            setCustomizableOptions={setCustomizableOptions}
            errorCustomizableOptions={errorCustomizableOptions}
            checkCustomizableOptionsValue={checkCustomizableOptionsValue}
            additionalPrice={additionalPrice}
            handleSelecteProduct={setSpesificProduct}
            reviewValue
            banner={banner}
            weltpixel_labels={weltpixel_labels}
            storeConfig={storeConfig}
        />
    );
};

QuickViewCore.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default QuickViewCore;
