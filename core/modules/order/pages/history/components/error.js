import cx from 'classnames';
import Alert from '@common/Alert';

const ErrorView = ({ type, message }) => (
    <div className={cx('pt-5')}>
        <Alert severity={type} withIcon>
            {message}
        </Alert>
    </div>
);

export default ErrorView;
