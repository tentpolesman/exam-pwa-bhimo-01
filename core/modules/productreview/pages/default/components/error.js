import cx from 'classnames';
import Typography from '@common_typography';
import Button from '@common_button';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

const ErrorView = ({ message, t }) => (
    <Button
        icon={<ExclamationTriangleIcon />}
        iconProps={{
            className: cx('!text-red-500'),
        }}
        iconPosition="left"
        className={cx(
            'mt-4',
            'w-full',
            'bg-red-50',
            'hover:bg-red-50',
            'focus:bg-red-50',
            'active:bg-red-50',
            'hover:shadow-none',
            'focus:shadow-none',
            'active:shadow-none',
            'cursor-auto',
            'hover:cursor-auto',
            'focus:cursor-auto',
            'active:cursor-auto',
        )}
    >
        <Typography className={cx('!text-red-600')}>
            {' '}
            {message || t('common:error:fetchError')}
        </Typography>
    </Button>
);

export default ErrorView;
