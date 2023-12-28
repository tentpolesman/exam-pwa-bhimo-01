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
        <div className="w-full" id={id}>
            <div className="flex flex-row items-center gap-3" style={styleFrame}>
                <TextField
                    id={`${id}Textfield`}
                    name={name}
                    styleFrameText={styleFrameText}
                    styleTextField={styleTextField}
                    disabled={!!(disabled || toggleField)}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full tablet:min-w-[320px]"
                    hintProps={{
                        displayHintText: error,
                        hintText: errorMessage,
                        hintType: 'error',
                    }}
                />
                <Button
                    variant="outlined"
                    onClick={action}
                    disabled={disabled || loading || value === ''}
                >
                    <Typography
                        color={loading || disabled || value === '' ? 'text-neutral-200' : 'text-neutral'}
                        className="uppercase"
                    >
                        {toggleField ? t('common:button:remove') : t('common:button:apply')}
                    </Typography>
                    {loading && <CircularProgress className={circularStyle} size="regular" />}
                </Button>
            </div>
        </div>
    );
};

export default FieldPoint;
