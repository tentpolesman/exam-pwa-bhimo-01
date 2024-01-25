import parse from 'html-react-parser';
import dynamic from 'next/dynamic';

const Menu = dynamic(() => import('@core_modules/theme/components/header/components/v1/mcategory'), { ssr: true });

export const generateChildren = (dataChild = [], latestLevel = 1) => {
    const newChild = [];
    dataChild.forEach((item) => {
        if (item?.type && item?.type === 'li') {
            const liFirst = item;
            if (liFirst.props.children.length) {
                const tagA = liFirst?.props?.children.filter((child) => child.type === 'a');
                const tagUl = liFirst?.props?.children.find((child) => child.type === 'ul');
                let children = [];
                if (tagUl && tagUl?.props?.children && tagUl?.props?.children.length) {
                    children = generateChildren(tagUl?.props?.children, latestLevel + 1);
                }
                const itemMenu = {
                    uid: Math.random(12345),
                    name: tagA[0]?.props?.children || '',
                    level: 2,
                    path: (tagA[0]?.props?.href || ''),
                    url_path: (tagA[0]?.props?.href || ''),
                    url_key: tagA[0]?.props?.url_key || '',
                    include_in_menu: latestLevel + 1,
                    children_count: JSON.stringify(children.length),
                    children,
                };

                newChild.push(itemMenu);
            } else if (liFirst.props.children?.type === 'a') {
                const childA = liFirst.props.children;
                const itemMenu = {
                    uid: Math.random(12345),
                    name: childA?.props?.children || '',
                    level: latestLevel + 1,
                    path: (childA?.props?.href || ''),
                    url_path: (childA?.props?.href || ''),
                    url_key: childA?.props?.url_key || '',
                    include_in_menu: 1,
                    children_count: '0',
                    children: [],
                };

                newChild.push(itemMenu);
            }
        }
    });

    return newChild;
};

const CmsMenuList = (props) => {
    const { rawData = '', storeConfig = {} } = props;
    // const [dataMenu, setDataMenu] = useState([]);
    let dataMenu = [];

    if (rawData) {
        const parseMenu = parse(rawData.replace(/\n /g, '').replace(/\n/g, ''));
        if (parseMenu.length > 0) {
            parseMenu.forEach((ulFirst) => {
                if (ulFirst.type && ulFirst.type === 'ul') {
                    if (ulFirst?.props?.children && ulFirst?.props?.children.length) {
                        const ulChildren = ulFirst.props.children;
                        dataMenu = generateChildren(ulChildren, 1);
                    }
                }
            });
        }
    }

    return <>{dataMenu && dataMenu.length > 0 ? <Menu customMenu={dataMenu} storeConfig={storeConfig} /> : null}</>;
};

export default CmsMenuList;
