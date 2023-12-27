import TextField from '@common_forms/TextField';

const OrderCommentView = (props) => {
    const {
        formik,
    } = props;
    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row items-center my-3">
                    <TextField
                        name="orderComment"
                        onChange={formik.handleChange}
                        value={formik.values.orderComment}
                        placeholder="Order Note"
                        label="Order Note"
                        classWrapper="max-w-full"
                        inputProps={{
                            className: 'w-full',
                        }}
                        multiline
                        row="4"
                        hintProps={{
                            displayHintText: !!(formik.touched.orderComment && formik.errors.orderComment),
                            hintType: 'error',
                            hintText: formik.errors.orderComment,
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default OrderCommentView;
