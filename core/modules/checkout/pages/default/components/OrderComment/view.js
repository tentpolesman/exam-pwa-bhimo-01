import classNames from 'classnames';
import TextField from '@common_textfield';

const OrderCommentView = (props) => {
    const {
        formik,
    } = props;
    return (
        <>
            <div className={classNames('border-b border-b-neutral-400 border-none')}>
                <div className="flex flex-row items-center mt-[10px] mb-[15px]">
                    <TextField
                        name="orderComment"
                        onChange={formik.handleChange}
                        value={formik.values.orderComment}
                        placeholder="Order Note"
                        label="Order Note"
                        multiline
                        row="4"
                        error={!!(formik.touched.orderComment && formik.errors.orderComment)}
                        errorMessage={(formik.touched.orderComment && formik.errors.orderComment) || null}
                    />
                </div>
            </div>
        </>
    );
};

export default OrderCommentView;
