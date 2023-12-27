/* eslint-disable max-len */
import Button from '@common_button';
import CircularProgress from '@common_circularprogress';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';

const RewardPointView = (props) => {
    const {
        checkout, t, handleUsePoint, loading, reward_point, total, currencyCache,
    } = props;
    return (
        <div className="my-[5px] p-[17px] flex flex-row justify-between items-center border border-neutral-400 rounded-[10px] max-w-[480px]" id="checkoutRewardPoint">
            <div className="flex flex-col">
                <Typography variant="span" letter="capitalize">
                    {checkout.data.cart.applied_reward_points.is_use_reward_points
                        ? `${t('checkout:myPoint:used')} 
                        ${checkout.data.cart.applied_reward_points.is_use_reward_points} 
                        ${t('checkout:myPoint:rewardPoints')}`
                        : t('checkout:myPoint:title')}
                </Typography>
                <Typography variant="span" type="bold" className="text-lg mb-[5px]">
                    {checkout.data.cart.applied_reward_points.is_use_reward_points
                        ? formatPrice(
                            checkout.data.cart.applied_reward_points.reward_points_amount,
                            checkout.data.cart.prices.grand_total.currency,
                            currencyCache,
                        )
                        : `${
                            checkout.data.rewardPoints.balance
                                ? checkout.data.rewardPoints.balance.toLocaleString(undefined, { minimumFractionDigits: 0 })
                                : 0
                        }
                         (${formatPrice(checkout.data.rewardPoints.balanceCurrency, checkout.data.cart.prices.grand_total.currency, currencyCache)})`}
                </Typography>
            </div>
            <div>
                <Button
                    variant="outlined"
                    className="max-w-[140px] flex flex-col justify-center items-center p-[5px]"
                    onClick={handleUsePoint}
                    disabled={loading || (!reward_point.is_use_reward_points && total === 0)}
                >
                    <Typography
                        variant="p"
                        type="bold"
                        letter="uppercase"
                        color={loading || (!reward_point.is_use_reward_points && total === 0) ? 'gray' : 'default'}
                    >
                        {reward_point.is_use_reward_points ? t('checkout:myPoint:removeButton') : t('checkout:myPoint:button')}
                    </Typography>
                    {loading && <CircularProgress />}
                </Button>
            </div>
        </div>
    );
};

export default RewardPointView;
