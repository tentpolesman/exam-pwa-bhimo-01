import cx from 'classnames';
import Alert from '@common/Alert';
import Typography from '@common_typography';

const ErrorView = ({ type, message }) => (
    <Alert severity={type} className={cx('mt-5')}>
        <Typography
            variant="p-2a"
            className={cx()}
        >
            {message}
        </Typography>
    </Alert>
);

export default ErrorView;
