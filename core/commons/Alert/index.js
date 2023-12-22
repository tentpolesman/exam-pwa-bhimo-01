import Typography from '@common/Typography';
import cx from 'classnames';

const Alert = ({
    children, severity, className = '', classChildren = '',
}) => {
    let classNamesText = 'text-green-600';
    let classNamesAlert = cx(
        'bg-green-50',
        'border-l-green-600',
        'border-green-600',
    );

    if (severity === 'warning') {
        classNamesText = 'text-yellow-600';
        classNamesAlert = cx(
            'bg-yellow-50',
            'border-l-yellow-600',
            'border-yellow-600',
        );
    }

    if (severity === 'error') {
        classNamesText = 'text-red-600';
        classNamesAlert = cx(
            'bg-red-50',
            'border-l-red-600',
            'border-red-600',
        );
    }
    return (
        <div
            className={
                cx(
                    'section-alert',
                    'inset-x-0',
                    'p-[16px]',
                    'transition-opacity ease-in duration-200',
                    'border-l-[10px]',
                    'shadow-md',
                    'flex',
                    'justify-between',
                    'align-middle',
                    'rounded-[4px]',
                    'items-center',
                    classNamesAlert,
                    className,
                )
            }
        >
            <div className="section-toast-title font-sans">
                <Typography className={classChildren} variant="bd-2a" color={classNamesText}>
                    {children}
                </Typography>
            </div>
        </div>
    );
};

export default Alert;
