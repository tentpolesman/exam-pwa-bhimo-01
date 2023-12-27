import classNames from 'classnames';
import Typography from '@common_typography';

const ListMessage = ({
    data = [],
}) => (
    <div className="">
        <ul className="">
            {
                data.map((item, index) => (
                    <li
                        key={index}
                        className={
                            classNames('', item.owner_type === 2 ? '' : '')
                        }
                    >
                        <div className="">
                            <Typography type="bold">
                                {item.owner_type === 2 ? `${item.owner_name} (Me)` : '(Customer Service)'}
                                {' '}
                                {item.created_at}
                            </Typography>
                            <Typography>
                                {item.text}
                            </Typography>
                            {
                                item.attachments.length > 0 && item.attachments.map((file, ind) => (
                                    <a key={ind} href={file.image_url} target="blank">
                                        <Typography decoration="underline">
                                            {file.name}
                                        </Typography>
                                    </a>
                                ))
                            }
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
);

export default ListMessage;
