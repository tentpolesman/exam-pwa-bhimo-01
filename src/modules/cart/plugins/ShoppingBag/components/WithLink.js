/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import cx from 'classnames';

import BadgeCounter from '@common_badgecounter';

const WithLink = (props) => {
    const { cartData, handleLink } = props;

    return (
        <div
            className={cx('relative group hover:cursor-pointer')}
            onClick={handleLink}
        >
            <BadgeCounter value={cartData}>
                <ShoppingCartIcon
                    className={cx(
                        'w-[19.39px]',
                        'text-neutral-400',
                        'hover:text-neutral-700',
                        'group-hover:text-neutral-700',
                        'hover:cursor-pointer',
                    )}
                />
            </BadgeCounter>
        </div>
    );
};

export default WithLink;
