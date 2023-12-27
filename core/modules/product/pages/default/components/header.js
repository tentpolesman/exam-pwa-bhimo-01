import Header from '@common_headermobile';
import ShoppingBagIcon from '@plugin_shoppingbag';

const CustomHeader = (props) => {
    const { storeConfig } = props;
    return (
        <Header
            RightComponent={(
                <ShoppingBagIcon withLink storeConfig={storeConfig} />
            )}
            {...props}
        />
    );
};

export default CustomHeader;
