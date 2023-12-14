import React from 'react';
import Typography from '@common_typography';
import Select from '@common_forms/Select';
import classNames from 'classnames';
import useStyles from '@plugin_customizableitem/components/style';

const ViewCustomizableDropDownOption = ({
    title = 'test', data = [], selected = '', disabled,
    onChange = () => {}, error = '', required = false,
}) => {
    const styles = useStyles();
    const customClass = classNames('flex flex-col', styles.container, styles.customizableDropDownOption);
    return (
        <div className={customClass}>
            {
                data && data.length > 0 && (
                    <Select
                        disabled={disabled}
                        options={data}
                        name={title}
                        label={(
                            <>
                                <Typography className="uppercase font-bold">
                                    {title.replace(/_/g, ' ')}
                                    {' '}
                                    {required && <Typography className="font-bold text-red">*</Typography>}
                                </Typography>
                            </>
                        )}
                        value={selected}
                        onChange={onChange}
                        error={error}
                        errorMessage={error}
                        textFiledProps={{
                            className: '!w-full',
                        }}
                    />
                )
            }
            {
                error && error !== '' && (
                    <Typography className="text-red">{error}</Typography>
                )
            }
        </div>
    );
};

export default ViewCustomizableDropDownOption;
