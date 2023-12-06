/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ArrowsRightLeftIcon from '@heroicons/react/24/solid/ArrowsRightLeftIcon';
import Badge from '@material-ui/core/Badge';
import cx from 'classnames';
import Link from 'next/link';

const WithLink = ({ compareList, handleLink }) => {
    if (compareList && compareList.compareList && compareList.compareList.item_count) {
        return (
            <Link href={handleLink} prefetch={false}>
                {compareList ? (
                    <Badge color="secondary" badgeContent={compareList.compareList.item_count > 0 ? compareList.compareList.item_count : 0}>
                        <ArrowsRightLeftIcon className={cx('w-[24px]', 'text-neutral-600', 'mt-3')} />
                    </Badge>
                ) : (
                    <Badge color="secondary" badgeContent={0}>
                        <ArrowsRightLeftIcon className={cx('w-[24px]', 'text-neutral-600', 'mt-3')} />
                    </Badge>
                )}
            </Link>
        );
    }
    return (
        <Link href={handleLink} prefetch={false}>
            <Badge color="secondary" badgeContent={0}>
                <ArrowsRightLeftIcon className={cx('w-[24px]', 'text-neutral-600', 'mt-3')} />
            </Badge>
        </Link>
    );
};

export default WithLink;
