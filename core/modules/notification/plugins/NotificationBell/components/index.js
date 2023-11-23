/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import Badge from '@material-ui/core/Badge';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import Link from 'next/link';

// eslint-disable-next-line no-unused-vars
const Content = ({ withLink, totalUnread }) => {
    if (withLink) {
        return (
            <Link href={withLink && '/inboxnotification/notification'} className="cursor-pointer m-[20px]">
                {/* <Badge color="secondary" badgeContent={totalUnread || 0}>
                    <NotificationsIcon color="secondary" />
                </Badge> */}
                <i className="fa fa-bell text-[20px]" aria-hidden="true" />
                {/* <div className="bg-blue-500">test</div> */}
            </Link>
        );
    }

    return (
        <div className="cursor-pointer m-[20px]">
            <i className="fa fa-bell" aria-hidden="true" />
            {/* <Badge color="secondary" badgeContent={totalUnread || 0}>
                <NotificationsIcon color="secondary" />
            </Badge> */}
        </div>
    );
};

export default Content;
