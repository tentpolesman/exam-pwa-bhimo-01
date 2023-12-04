/* eslint-disable jsx-a11y/anchor-is-valid */
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import cx from 'classnames';
import React from 'react';

const Tabs = (props) => {
    const {
        data = [], onChange = () => { }, allItems = true, tabPanel = false, expandData = [], ListReviews = null, smartProductTabs = {},
    } = props;

    const [activeTabs, setActiveTabs] = React.useState(0);

    const tabClasses = cx(
        'inline-block',
        'py-[12px]',
        'px-[8px]',
        'tablet:min-w-[150px]',
        'hover:text-primary-700',
        'hover:border-b-2',
        'hover:border-primary-700',
    );

    const tabActive = cx('border-b-2', 'border-primary-700', 'text-primary-700');

    const handleTabSwitch = (index) => {
        setActiveTabs(index);
    };

    return (
        <>
            <div
                className={cx(
                    'tabs-wrapper',
                    'text-md',
                    'font-medium',
                    'text-center',
                    'text-neutral-700',
                    'border-b-[0.8px]',
                    'border-neutral-300',
                    'overflow-x-auto',
                    'pb-[0.5px]',
                )}
            >
                <ul className="flex -mb-px">
                    {!tabPanel && allItems ? (
                        <li className="me-2">
                            <a href="#" className={cx(tabClasses, tabActive, 'default-active', 'min-w-[100px]')}>
                                All Items
                            </a>
                        </li>
                    ) : null}
                    {!tabPanel
                        && data.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <li className="me-2" key={index}>
                                        <a
                                            href="#"
                                            className={
                                                !tabPanel && allItems
                                                    ? cx(tabClasses, 'default-allitems')
                                                    : cx(tabClasses, tabActive, 'default-active')
                                            }
                                            onClick={() => {
                                                onChange(index);
                                            }}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                );
                            }
                            return (
                                <li className="me-2" key={index}>
                                    <a
                                        href="#"
                                        className={cx(tabClasses)}
                                        onClick={() => {
                                            onChange(index);
                                        }}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            );
                        })}
                    {/* PDP Tabs */}
                    {tabPanel
                        && expandData
                        && expandData.length > 0
                        && expandData.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <li className="me-2" key={index}>
                                        <a
                                            href="#"
                                            className={
                                                activeTabs === index
                                                    ? cx(tabClasses, tabActive, 'default-active')
                                                    : cx(tabClasses, 'default-allitems')
                                            }
                                            onClick={() => {
                                                handleTabSwitch(index);
                                            }}
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                );
                            }
                            return (
                                <li className="me-2" key={index}>
                                    <a
                                        href="#"
                                        className={
                                            activeTabs === index ? cx(tabClasses, tabActive, 'default-active') : cx(tabClasses, 'default-allitems')
                                        }
                                        onClick={() => {
                                            handleTabSwitch(index);
                                        }}
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                    {tabPanel && ListReviews && (
                        <li className="me-2" key={expandData.length}>
                            <a
                                href="#"
                                className={
                                    activeTabs === expandData.length
                                        ? cx(tabClasses, tabActive, 'default-active')
                                        : cx(tabClasses, 'default-allitems')
                                }
                                onClick={() => {
                                    handleTabSwitch(expandData.length);
                                }}
                            >
                                Reviews
                            </a>
                        </li>
                    )}
                    {tabPanel
                        && expandData
                        && Object.values(smartProductTabs).map((item, index) => {
                            if (item.label) {
                                return (
                                    <li className="me-2" key={expandData.length + index + 1}>
                                        <a
                                            href="#"
                                            className={
                                                activeTabs === expandData.length
                                                    ? cx(tabClasses, tabActive, 'default-active')
                                                    : cx(tabClasses, 'default-allitems')
                                            }
                                            onClick={() => {
                                                handleTabSwitch(expandData.length + index + 1);
                                            }}
                                        >
                                            Reviews
                                        </a>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    {/* PDP Tabs */}
                </ul>
            </div>
            {/* PDP Tabs Content */}
            {tabPanel && expandData && (
                <div className={cx('tab-content-wrapper', 'relative', 'pt-[10px]')}>
                    {expandData.map((item, index) => {
                        if (item.type === 'html') {
                            return (
                                <div
                                    className={cx('tab-content', {
                                        hidden: activeTabs !== index,
                                    })}
                                    key={index}
                                >
                                    <div className={cx('description-html', 'text-2md')}>
                                        {/* eslint-disable-next-line react/no-danger */}
                                        {item.content ? <span dangerouslySetInnerHTML={{ __html: item.content }} /> : null}
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div
                                className={cx('tab-content', {
                                    hidden: activeTabs !== index,
                                })}
                                key={index}
                            >
                                <ul className="grid grid-cols-2">
                                    {item.content.map((val, idx) => (
                                        <li className={cx('grid', 'grid-cols-1', 'py-2')} key={idx}>
                                            <span className="text-2md font-bold">{val.label}</span>
                                            <span className="text-2md">{val.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                    {ListReviews && (
                        <div
                            className={cx('tab-content', {
                                hidden: activeTabs !== expandData.length,
                            })}
                            key={expandData.length}
                        >
                            {ListReviews}
                        </div>
                    )}
                    {
                        smartProductTabs && Object.values(smartProductTabs).map((val, idx) => {
                            if (val.label) {
                                return (
                                    <div
                                        className={cx('tab-content', {
                                            hidden: activeTabs !== expandData.length + idx + 1,
                                        })}
                                        key={expandData.length + idx + 1}
                                    >
                                        <CmsRenderer content={val.content} />
                                    </div>
                                );
                            }
                            return null;
                        })
                    }
                </div>
            )}
            {/* PDP Tabs Content */}
            <style jsx>
                {`
                    .tabs-wrapper::-webkit-scrollbar {
                        display: none;
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    
                    .description-html img {
                        width: '100%',
                        height: '100%',
                    }

                    .description-html iframe {
                        width: '100%',
                        height: '100%',
                    }

                    @media screen and (max-width: 768px) {
                        .description-html {
                            width: 320px,
                            height: '100%',
                        }

                        .description-html img {
                            max-width: 300px,
                        }

                        .description-html iframe {
                            max-width: 300px,
                        }
                    }
                    @media screen and (min-width: 769px) and (max-width: 1024px) {
                        .description-html {
                            width: 700px,
                            height: '100%',
                        }

                        .description-html img {
                            max-width: 650px,
                        }

                        .description-html iframe {
                            max-width: 650px,
                        }
                    }
                    @media screen and (min-width: 1025px) {
                        .description-html {
                            width: 850px,
                            height: '100%',
                        }

                        .description-html img {
                            max-width: 800px,
                        }

                        .description-html iframe {
                            max-width: 800px,
                        }
                    }
                `}
            </style>
        </>
    );
};

export default Tabs;
