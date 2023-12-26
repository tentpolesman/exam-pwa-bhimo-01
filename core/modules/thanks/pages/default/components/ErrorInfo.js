const ErrorInfo = ({ variant, text }) => (
    <div className="error-info">
        <div className="m-15 p-2" severity={variant}>
            {text}
        </div>
    </div>
);
export default ErrorInfo;
