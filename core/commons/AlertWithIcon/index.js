import Alert from '@common_alert';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';
import cx from 'classnames';

const AlertWithIcon = ({
    children, severity, className = '', classChildren = '', CustomIcon, iconClassName = '',
}) => {
    let Icon = CheckCircleIcon;

    if (severity === 'warning') {
        Icon = ExclamationTriangleIcon;
    } else if (severity === 'error') {
        Icon = ExclamationCircleIcon;
    }

    if (CustomIcon) {
        Icon = CustomIcon;
    }

    return (
        <Alert className={cx('!border-l-[0px]', className)} severity={severity} classChildren={classChildren}>
            <div className="flex flex-row items-center">
                <div className={cx('w-[24px] h-[24px] mr-[6px] ml-[10px]', iconClassName)}>
                    <Icon />
                </div>
                <div className="text-center">{children}</div>
            </div>
        </Alert>
    );
};

export default AlertWithIcon;
