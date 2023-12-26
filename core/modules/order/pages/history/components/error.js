import classNames from 'classnames';

const ErrorView = ({ type, message }) => (
    <div className={classNames('')}>
        <div className="alert m-15" severity={type}>
            {message}
        </div>
    </div>
);

export default ErrorView;
