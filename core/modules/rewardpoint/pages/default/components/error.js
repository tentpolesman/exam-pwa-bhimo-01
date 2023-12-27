const ErrorView = ({ message, t }) => (
    <div className="">
        <div className="alert m-15" severity="error">
            { message || t('common:error:fetchError')}
        </div>
    </div>
);

export default ErrorView;
