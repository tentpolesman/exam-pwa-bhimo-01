import TextField from '@common_textfield';
import DropFile from '@common_dropfile';

const FormComment = ({
    commentValue, t, handleGetBase64, fileAccept,
    handleChangeComment, dropValue, handleDrop,
}) => (
    <>
        <div className="">
            <TextField
                name="message"
                onChange={handleChangeComment}
                value={commentValue}
                placeholder={t('rma:form:placeholder:message')}
                label={t('rma:form:label:message')}
                multiline
                rows={4}
            />
        </div>
        <div className="">
            <DropFile
                value={dropValue}
                setValue={handleDrop}
                label={t('rma:form:placeholder:uploadFile')}
                getBase64={handleGetBase64}
                acceptedFile={fileAccept}
            />
        </div>
    </>
);

export default FormComment;
