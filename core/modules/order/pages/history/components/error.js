import cx from 'classnames';
import Alert from '@common/Alert';
import Typography from '@common_typography';

const ErrorView = ({ type, message }) => (
    <div className={cx('pt-5 mobile:max-desktop:px-4')}>
        <Alert severity={type}>
            <Typography
                variant="p-2a"
                className={cx()}
            >
                {message}
            </Typography>
        </Alert>
    </div>
);

export default ErrorView;
