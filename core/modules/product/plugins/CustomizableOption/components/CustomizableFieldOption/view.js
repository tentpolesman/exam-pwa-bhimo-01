import React from 'react';
import Typography from '@common_typography';
import TextField from '@common_forms/TextField';
import classNames from 'classnames';

const ViewCustomizableFieldOption = ({
    title = 'test', data = {}, value = '', disabled,
    onChange = () => {}, error = '', required = false,
}) => {
    const customClass = classNames('flex flex-col', 'w-[100%]');
    console.log(data);
    return (
        <div className={customClass}>
            {
                data && data.uid && (
                    <TextField
                        options={data}
                        name={title}
                        disabled={disabled}
                        className="w-full"
                        classNameLabel="mb-[6px]"
                        onChange={onChange}
                        value={value}
                        error={error}
                        errorMessage={error}
                        label={(
                            <Typography variant="bd-2a">
                                {data.label}
                                {' '}
                                {required && <Typography variant="bd-2a" color="text-red">*</Typography>}
                            </Typography>
                        )}
                    />
                )
            }
        </div>
    );
};

export default ViewCustomizableFieldOption;
