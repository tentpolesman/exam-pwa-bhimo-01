import Checkbox from '@common_forms/CheckBox';

const CheckboxView = ({
    t, data, value, onChange,
}) => (
    <Checkbox label={t('customer:setting:newsletter_subscription')} flex="column" data={data} value={value} onChange={onChange} />
);

export default CheckboxView;
