/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import getPath from '@helper_getpath';
import { getResolver, setResolver } from '@helper_localstorage';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useRef } from 'react';

const MenuChildren = dynamic(() => import('@common_header/components/v1/mcategoryChildren'), { ssr: true });

const Menu = (props) => {
    const { data, storeConfig } = props;
    // WIP : Custom Header Menu
    // const cmsPages = storeConfig && storeConfig.cms_page ? storeConfig.cms_page.split(',') : [];
    let menu = data?.categories?.items[0]?.children;
    if (!menu) {
        menu = [];
    }
    const generateLink = (cat) => {
        const link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;
        return ['/[...slug]', link];
    };
    const handleClick = async (cat) => {
        const link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;
        const urlResolver = getResolver();
        // WIP : Custom Header Menu
        // if (storeConfig.pwa.ves_menu_enable) {
        //     if (cat.link_type === 'category_link') {
        //         urlResolver[link] = {
        //             type: 'CATEGORY',
        //             id: cat.category_id,
        //         };
        //         await setResolver(urlResolver);
        //     } else {
        //         const cms = cmsPages.find((cmsPage) => cmsPage === link.replace('/', ''));
        //         if (cms) {
        //             urlResolver[link] = {
        //                 type: 'CMS_PAGE',
        //             };
        //             await setResolver(urlResolver);
        //         }
        //     }
        // } else {
        //     urlResolver[link] = {
        //         type: 'CATEGORY',
        //         id: cat.uid,
        //     };
        //     await setResolver(urlResolver);
        // }
        urlResolver[link] = {
            type: 'CATEGORY',
            id: cat.uid,
        };
        await setResolver(urlResolver);
    };

    const chevronDownSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 inline-block ml-1">
            <path
                fill-rule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clip-rule="evenodd"
            />
        </svg>
    `;

    return (
        <nav className="menu-wrapper" role="navigation">
            <ul className="nav" role="menubar" id="header-nav-menubar">
                {menu.map((val, idx) => {
                    if ((val.include_in_menu || storeConfig.pwa.ves_menu_enable) && val.name) {
                        const linkEl = useRef(null);
                        const megaMenuRef = useRef(null);

                        let prefix = '';

                        prefix += ` ${val.name} `;

                        if (val.children.length > 0) {
                            prefix += chevronDownSvg;
                        }

                        const generatedLink = generateLink(val);

                        return (
                            <li
                                key={idx}
                                role="menuitem"
                                id={`header-menuitem-${idx}`}
                                onMouseEnter={() => {
                                    if (megaMenuRef && val.dropdown_animation_in) {
                                        megaMenuRef.current.classList.add('animate__animated');
                                        megaMenuRef.current.classList.add(`animate__${val.dropdown_animation_in}`);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (megaMenuRef && val.dropdown_animation_in) {
                                        megaMenuRef.current.classList.remove('animate__animated');
                                        megaMenuRef.current.classList.remove(`animate__${val.dropdown_animation_in}`);
                                    }
                                }}
                                className={cx(
                                    'text-md',
                                    'font-medium',
                                    '!leading-lg',
                                    'tracking-normal',
                                    'px-4',
                                    'py-[13px]',
                                    'hover:text-primary-700',
                                )}
                            >
                                {val.link && val.link !== '#' ? (
                                    <>
                                        {val.before_html && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: val.before_html,
                                                }}
                                            />
                                        )}
                                        <Link
                                            href={{
                                                pathname: generatedLink[0],
                                                query: generatedLink[1],
                                            }}
                                            as={generatedLink[1]}
                                            prefetch={false}
                                            legacyBehavior
                                        >
                                            <a
                                                onClick={() => handleClick(val)}
                                                ref={linkEl}
                                                dangerouslySetInnerHTML={{
                                                    __html: prefix !== '' ? `${prefix}` : val.name,
                                                }}
                                                onMouseEnter={() => {
                                                    if (val.caret) {
                                                        linkEl.current.innerHTML = linkEl.current.innerHTML.replace(val.caret, val.hover_caret);
                                                    }
                                                }}
                                                onMouseLeave={() => {
                                                    if (val.hover_caret) {
                                                        linkEl.current.innerHTML = linkEl.current.innerHTML.replace(val.hover_caret, val.caret);
                                                    }
                                                }}
                                            />
                                        </Link>
                                        {val.after_html && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: val.after_html,
                                                }}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <Link key={idx} href={generateLink(val)[0]} as={generateLink(val)[1]} prefetch={false} legacyBehavior>
                                        <a
                                            onClick={() => handleClick(val)}
                                            dangerouslySetInnerHTML={{
                                                __html: prefix !== '' ? `${prefix}` : val.name,
                                            }}
                                        />
                                    </Link>
                                )}

                                {val.children.length > 0 ? (
                                    <div
                                        className={cx('mega-menu', 'grid', 'bg-neutral-white', 'shadow-md', 'grid-cols-1', 'rounded-lg', 'z-10')}
                                        aria-hidden="true"
                                        role="menu"
                                        ref={megaMenuRef}
                                    >
                                        {val.show_header && (
                                            <div className="header-html grid">
                                                <CmsRenderer content={val.header_html} />
                                            </div>
                                        )}
                                        <MenuChildren data={val.children} handleClick={handleClick} generateLink={generateLink} mainData={val} />
                                        {val.show_footer && (
                                            <div className="footer-html grid">
                                                <CmsRenderer content={val.footer_html} />
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                                {/* {styles} */}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <style jsx global>
                {`
                    .grid {
                        display: grid;
                    }
                    /* ves menu config */
                    .header-html,
                    .footer-html {
                        color: black;
                    }
                    .header-html ul,
                    .footer-html ul {
                        display: flex;
                        align-items: center;
                        height: 100%;
                    }
                    .header-html ul li,
                    .footer-html ul li {
                        text-align: center;
                        flex-grow: 1;
                    }
                    .main-content {
                        display: flex;
                    }
                    .nav a {
                        text-decoration: none;
                    }
                    .nav li {
                        list-style: none;
                    }

                    /* menu list */
                    .nav > li {
                        float: left;
                    }

                    /* menu links */
                    .nav > li > a {
                        display: block;
                        transition: all 0.3s ease;
                        z-index: 20;
                        position: relative;
                    }
                    .nav > li:hover > a + .pointer {
                        visibility: visible;
                    }
                    .pointer {
                        visibility: hidden;
                        margin: auto;
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 0 7.5px 13px 7.5px;
                        border-color: transparent transparent #212426 transparent;
                    }
                    .nav > li:first-child > a {
                        border-left: none;
                        border-radius: 3px 0 0 3px;
                    }

                    /* search form */
                    .nav-search > form {
                        border-left: 1px solid #4b4441;
                        height: 3.5em;
                        position: relative;
                        width: inherit;
                        z-index: 20;
                    }
                    .nav-search input[type='text'] {
                        background: #372f2b;
                        color: #999;
                        display: block;
                        float: left;
                        font-weight: bold;
                        line-height: 1.5;
                        padding: 1em 0;
                        text-shadow: 0 0 1px rgba(0, 0, 0, 0.35);
                        transition: all 0.3s ease 1s;
                        width: 0;
                    }
                    .nav-search input[type='text']:focus {
                        color: #fcfcfc;
                    }
                    .nav-search input[type='text']:focus,
                    .nav-search:hover input[type='text'] {
                        padding: 1em 1.25em;
                        transition: all 0.3s ease 0.1s;
                        width: 6.875em;
                    }
                    .nav-search input[type='submit'] {
                        background: #372f2b url(../img/search-icon.png) no-repeat center center; /* IE8 fallback */
                        background: #372f2b url(../img/search-icon.svg) no-repeat center center;
                        border-radius: 0 3px 3px 0;
                        cursor: pointer;
                        display: block;
                        float: left;
                        height: 3.5em;
                        padding: 0 1.25em;
                        transition: all 0.3s ease;
                    }
                    .nav-search input:focus,
                    .nav-search input[type='submit']:hover {
                        background-color: #4b4441;
                    }
                    /* menu dropdown */
                    .mega-menu {
                        opacity: 0;
                        position: absolute;
                        transition: all 0s ease 0s;
                        visibility: hidden;
                        margin-left: 0%;
                        margin-top: 14px;
                    }
                    li:hover > .mega-menu {
                        opacity: 1;
                        overflow: visible;
                        visibility: visible;
                    }

                    /* menu content */
                    .nav-column a {
                        color: #000000 !important;
                        display: block;
                        font-weight: bold;
                        line-height: 1.75;
                        margin: 0;
                        padding: 7px;
                    }
                    .nav-column a:hover {
                        color: #be1f93 !important;
                    }

                    .nav-column .active {
                        color: #be1f93 !important;
                        background: #ffffff;
                    }
                    .nav-column h3 {
                        color: #372f2b;
                        font-size: 0.95em;
                        font-weight: bold;
                        line-height: 1.15;
                        margin: 1.25em 0 0.75em;
                        text-transform: uppercase;
                    }
                    .cat-label-v2 {
                        background: #fef2f2;
                        color: #dc2626;
                        font-size: 10px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: 12px;
                        letter-spacing: 0.1px;
                        text-transform: uppercase;
                    }
                `}
            </style>
        </nav>
    );
};

export default Menu;
