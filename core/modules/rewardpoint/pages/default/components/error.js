import AlertWithIcon from '@common_alertwithicon';

const ErrorView = ({ message, t }) => (
    <AlertWithIcon className="mt-[10px]" severity="error">
        {message || t('common:error:fetchError')}
    </AlertWithIcon>
);

export default ErrorView;
