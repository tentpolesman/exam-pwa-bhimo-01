import Select from '@common_forms/Select';

const ItemFieldView = ({
    options = [],
    name = 'select',
    label = 'Select',
    errorMessage = '',
    t,
    select,
    handleSelect,
    error,
    disabled,
    ...other
}) => (
    <Select
        options={options}
        name={name}
        label={label}
        value={select}
        onChange={handleSelect}
        error={error}
        errorMessage={errorMessage || t('rma:form:required')}
        classNameLabel="!text-md font-medium capitalize"
        textFiledProps={{
            disabled,
            className: 'w-full desktop:w-[50%]',
        }}
        {...other}
    />
);

export default ItemFieldView;
