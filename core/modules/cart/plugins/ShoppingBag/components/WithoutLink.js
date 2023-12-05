// import Badge from '@material-ui/core/Badge';
// import LocalMall from '@material-ui/icons/LocalMall';
import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import cx from 'classnames';

// eslint-disable-next-line no-unused-vars
const WithoutLink = ({ cartData = 0 }) => (
    // <Badge color="secondary" badgeContent={cartData || 0}>
    //     <LocalMall color="secondary" />
    // </Badge>
    <ShoppingCartIcon className={cx('w-[24px]', 'text-neutral-600', 'mt-3')} />
);

export default WithoutLink;
