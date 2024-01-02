import Link from 'next/link';
import { domToReact } from 'html-react-parser';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@helpers/env';

const LinkRenderer = (props) => {
    const { domNode } = props;
    const { attribs, children } = domNode;

    const getUrl = () => {
        if (attribs.href.indexOf('media') !== -1) {
            const url = attribs.href.replace('{{media url=', '').replace('}}', '').replace(/"/g, '');

            return `${getStoreHost(getAppEnv())}media/${url}`;
        }
        return attribs.href;
    };

    return (
        <Link {...attribs} href={getUrl()}>
            {domToReact(children, domNode)}
        </Link>
    );
};

export default LinkRenderer;
