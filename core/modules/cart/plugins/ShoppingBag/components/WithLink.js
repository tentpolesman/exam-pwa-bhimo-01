import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import cx from 'classnames';

import BadgeCounter from '@common_badgecounter';

const WithLink = (props) => {
    const { cartData, handleLink } = props;

    return (
        <BadgeCounter value={cartData}>
            <ShoppingCartIcon
                className={cx(
                    'mobile:max-tablet:w-[20px]',
                    'tablet:w-[24px]',
                    'text-neutral-600',
                    'mobile:max-tablet:mt-4',
                    'tablet:mt-3',
                    'hover:cursor-pointer',
                )}
                onClick={handleLink}
            />
        </BadgeCounter>
    );
};

export default WithLink;
