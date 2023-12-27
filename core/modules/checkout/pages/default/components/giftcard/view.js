import Typography from '@common_typography';
import Badge from '@common_badge';
import FieldPoint from '@core_modules/checkout/components/fieldcode';

const GiftCardView = (props) => {
    const {
        handleApplyGift, handleRemoveGift, formik, appliedGiftCards, checkout, giftCards,
    } = props;
    return (
        <>
            <FieldPoint
                id="giftCard"
                name="giftCard"
                placeholder="Gift Card Code"
                action={() => {
                    handleApplyGift();
                }}
                onChange={formik.handleChange}
                value={formik.values.giftCard}
                disabled={checkout.loading.giftCard}
                error={!!formik.errors.giftCard}
                errorMessage={formik.errors.giftCard}
                loading={checkout.loading.giftCard}
            />
            {appliedGiftCards.length || giftCards.length ? (
                <div className="-mt-[30px] mr-[10px] mb-[30px] ml-[5px]">
                    {giftCards.length === 0 ? null : (
                        <div>
                            <Typography variant="p" letter="capitalize">
                                Your Gift Card
                            </Typography>
                            <div className="gift-card-item-container">
                                {giftCards.map((item, index) => (
                                    <Badge
                                        disabled={checkout.loading.giftCard}
                                        className="mx-[5px]"
                                        key={index}
                                        size="small"
                                        label={item.giftcard_code}
                                        onClick={() => {
                                            handleApplyGift(item.giftcard_code);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {appliedGiftCards.length === 0 ? null : (
                        <div>
                            <Typography variant="p" letter="capitalize">
                                Applied Gift Card
                            </Typography>
                            <div className="gift-card-item-container">
                                {appliedGiftCards.map((item, index) => (
                                    <Badge
                                        disabled={checkout.loading.giftCard}
                                        className="mx-[5px]"
                                        color="primary"
                                        key={index}
                                        size="small"
                                        label={item}
                                        onDelete={() => {
                                            handleRemoveGift(item);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default GiftCardView;
