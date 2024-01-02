import Typography from '@common_typography';
import Alert from '@common_alert';
import Show from '@common_show';
import React from 'react';
import Button from '@common_button';
import TextField from '@common_forms/TextField';
import { formatPrice } from '@helper_currency';
import { debuging } from '@config';
import Layout from '@layout_customer';
import ModalDetail from '@core_modules/customer/pages/giftcard/components/detail';
import DetailView from '@core_modules/customer/pages/giftcard/components/detail/view';
import Loader from '@core_modules/customer/pages/giftcard/components/skeleton';
import cx from 'classnames';

const GiftCard = (props) => {
    const {
        t,
        storeConfig,
        openDetail,
        handleCloseDetail,
        selectedCode,
        handleOpenDetail,
        data,
        search,
        handleTextSearch,
        handleSearch,
        error,
        loading,
        currencyCache,
    } = props;

    if (loading) {
        return (
            <Layout {...props}>
                <div className={cx('giftcard-container', 'mt-[15px]')}>
                    <Loader />
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout {...props}>
                <div className={cx('giftcard-container', 'mt-[15px]')}>
                    <Alert className="m-15" severity="error">
                        {debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
                    </Alert>
                </div>
            </Layout>
        );
    }

    const noGiftCardData = data && data.customer.gift_card.length === 0;

    return (
        <Layout {...props}>
            <div className={cx('giftcard-container', 'mt-[15px]')}>
                <ModalDetail
                    t={t}
                    storeConfig={storeConfig}
                    open={openDetail}
                    close={handleCloseDetail}
                    code={selectedCode}
                    DetailView={DetailView}
                    currencyCache={currencyCache}
                />
                <Show when={noGiftCardData}>
                    <Alert className="mb-[15px]" severity="warning">
                        {t('customer:giftCard:notFound')}
                    </Alert>
                </Show>
                <Show when={!noGiftCardData}>
                    <div className="flex flex-row w-max">
                        <ul className={cx('w-max')}>
                            {data?.customer?.gift_card?.map((item, index) => (
                                <li
                                    key={index}
                                    className={cx('p-[10px] border-neutral-250', 'border-[1px]', 'rounded-[10px]', 'mb-[10px]', 'cursor-pointer')}
                                    onClick={() => handleOpenDetail(item.giftcard_code)}
                                    aria-hidden="true"
                                >
                                    <Typography className="!text-primary">
                                        {item.giftcard_code}
                                        {' '}
                                        <Typography className="!text-neutral-black">
                                            {formatPrice(item.giftcard_balance, storeConfig.base_currency_code, currencyCache)}
                                        </Typography>
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Show>
                <div className="flex flex-row">
                    <div className="">
                        <div className={cx('searchBox')}>
                            <TextField
                                id="textfield-giftcard-code"
                                className={cx('mb-[20px]')}
                                label={t('customer:giftCard:inputSearch')}
                                value={search.value}
                                onChange={handleTextSearch}
                                error={!(search.error === '' || search.error === null)}
                                errorMessage={search.error || ''}
                            />
                            <Button onClick={handleSearch}>
                                <Typography color="white" className={cx('uppercase')}>
                                    {t('customer:giftCard:buttonSearch')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default GiftCard;
