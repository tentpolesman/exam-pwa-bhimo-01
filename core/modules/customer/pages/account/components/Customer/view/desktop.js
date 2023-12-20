/* eslint-disable react/no-unescaped-entities */
import Account from '@core_modules/customer/pages/account/components/Customer/view/desktop/account';
import Address from '@core_modules/customer/pages/account/components/Customer/view/desktop/address';
import Order from '@core_modules/customer/pages/account/components/Customer/view/desktop/order';
import cx from 'classnames';

const ViewDesktop = (props) => {
    const {
        t, userData, reOrder, storeConfig,
    } = props;
    const { customer, customerOrders } = userData;
    return (
        <div className={cx('mobile:max-desktop:hidden')}>
            <div className={cx('mt-4')}>
                <Account customer={customer} t={t} storeConfig={storeConfig} />
                <Address customer={customer} t={t} storeConfig={storeConfig} />
                <Order storeConfig={storeConfig} customerOrders={customerOrders || {}} t={t} reOrder={reOrder} />
            </div>
        </div>
    );
};

export default ViewDesktop;
