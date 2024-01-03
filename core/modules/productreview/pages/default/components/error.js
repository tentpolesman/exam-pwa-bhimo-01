import Alert from '@common_alert';

const ErrorView = ({ message, t }) => (
    <Alert className="mt-[10px]" severity="error" withIcon>
        {message || t('common:error:fetchError')}
    </Alert>
);

export default ErrorView;
