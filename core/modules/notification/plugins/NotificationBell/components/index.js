/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import cx from 'classnames';
import Link from 'next/link';

// eslint-disable-next-line no-unused-vars
const Content = ({ withLink, totalUnread }) => {
    if (withLink) {
        return (
            <Link href={withLink && '/inboxnotification/notification'} className="cursor-pointer">
                <BellIcon className={cx('w-[24px]', 'text-neutral-600', 'mt-3')} />
            </Link>
        );
    }

    return (
        <div className="cursor-pointer">
            <BellIcon className={cx('w-[24px]', 'text-neutral-600', 'mt-3')} />
        </div>
    );
};

export default Content;
