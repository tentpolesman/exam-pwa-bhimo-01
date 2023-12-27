/* eslint-disable max-len */
import Button from '@common_button';
import CircularProgress from '@common_circularprogress';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';

const FieldPoint = ({
    onChange = () => {},
    value = '',
    placeholder = '',
    action,
    disabled = false,
    id = null,
    name = null,
    error,
    errorMessage = 'error',
    loading = false,
    toggleField = false,
    styleFrame = {},
    styleFrameText = {},
    styleTextField = {},
}) => {
    const { t } = useTranslation(['common']);
    const circularStyle = cx('absolute', 'top-[50%]', 'left-[50]', 'right-[50%]', 'mt-[-8px]', 'ml-[-8px]');
    return (
        <div className={cx('border border-neutral-400 px-[10px] border-none')} id={id}>
            <div className="flex flex-row items-center mt-[10px] mb-[15px] max-w-[420px]" style={styleFrame}>
                <TextField
                    id={`${id}Textfield`}
                    name={name}
                    styleFrameText={styleFrameText}
                    styleTextField={styleTextField}
                    disabled={!!(disabled || toggleField)}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    error={error}
                    errorMessage={error ? errorMessage : null}
                />
                <div>
                    <Button variant="outlined" className="h-[30px] flex flex-col justify-center items-center ml-[5px]" onClick={action} disabled={disabled || loading || value === ''}>
                        <Typography color={loading || disabled || value === '' ? 'text-neutral-400' : 'text-primary'} className="font-bold uppercase">
                            {toggleField ? t('common:label:remove') : t('common:label:apply')}
                        </Typography>
                        {loading && <CircularProgress className={circularStyle} size="regular" />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FieldPoint;
