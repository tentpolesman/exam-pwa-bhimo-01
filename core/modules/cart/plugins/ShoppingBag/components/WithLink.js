import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import cx from 'classnames';

import BadgeCounter from '@common_badgecounter';

const WithLink = (props) => {
    const { cartData, handleLink } = props;

    return (
        <div className={cx('group')}>
            <BadgeCounter value={cartData} className={cx('hover:cursor-pointer')}>
                <ShoppingCartIcon
                    className={cx(
                        'mobile:max-tablet:w-[20px]',
                        'tablet:w-[24px]',
                        'text-neutral-600',
                        'hover:text-primary-700',
                        'group-hover:text-primary-700',
                        'mobile:max-tablet:mt-3',
                        'tablet:mt-3',
                        'hover:cursor-pointer',
                    )}
                    onClick={handleLink}
                />
            </BadgeCounter>
        </div>
    );
};

export default WithLink;
