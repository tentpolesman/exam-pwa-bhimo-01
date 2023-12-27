const ErrorInfo = ({ variant = 'error', text = '' }) => (
    <div className="cms-container">
        <div className="m-15" severity={variant}>
            {text}
        </div>
    </div>
);

export default ErrorInfo;
