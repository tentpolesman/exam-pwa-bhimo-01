const ErrorInfo = ({ variant = 'success', text = '' }) => (
    <div>
        <div className="m-15" severity={variant}>{text}</div>
    </div>
);

export default ErrorInfo;
