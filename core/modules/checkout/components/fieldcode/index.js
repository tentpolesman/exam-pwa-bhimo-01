import Button from '@common_button';
import CircularProgress from '@common_circularprogress';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import useStyles from '@core_modules/checkout/components/fieldcode/style';
import cx from 'classnames';

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
    const styles = useStyles();

    const circularStyle = cx('absolute', 'top-[50%]', 'left-[50]', 'right-[50%]', 'mt-[-8px]', 'ml-[-8px]');
    return (
        <div className={cx(styles.block, styles.rmBorder)} id={id}>
            <div className={styles.fieldPoinContainer} style={styleFrame}>
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
                    <Button variant="outlined" className={styles.btnAplly} onClick={action} disabled={disabled || loading || value === ''}>
                        <Typography variant="p" color={loading || disabled || value === '' ? 'gray' : 'default'} type="bold" letter="uppercase">
                            {toggleField ? 'Remove' : 'Apply'}
                        </Typography>
                        {loading && <CircularProgress className={circularStyle} size="regular" />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FieldPoint;
