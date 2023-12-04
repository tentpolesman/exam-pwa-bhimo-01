import Tabs from '@common_tabs';
import ListReviews from '@core_modules/product/pages/default/components/ListReviews';
import React from 'react';

const TabsView = (props) => {
    const { dataInfo } = props;
    const { smartProductTabs } = props;

    return (
        <Tabs expandData={dataInfo} smartProductTabs={smartProductTabs} ListReviews={<ListReviews {...props} />} tabPanel {...props} />
    );
};

export default TabsView;
