import Body from '@core_modules/blog/components/Details';
import Category from '@core_modules/blog/components/Category';
import RelatedProduct from '@core_modules/blog/components/RelatedProduct';
import { DiscussionEmbed } from 'disqus-react';
import { getHost } from '@helpers/config';

const DefaultContent = (props) => {
    const {
        storeConfig, title, url_key, relatedProduct, t,
        limitProduct = 8,
    } = props;
    const url = typeof window !== 'undefined'
        ? window.location.href
        : `${getHost()}/blog/${url_key}`;
    const limit = limitProduct || storeConfig.aw_blog_related_products_products_limit;
    let position = 0;
    const layout = storeConfig.aw_blog_related_products_block_layout === 'slider' ? 1 : 2;
    if (storeConfig.aw_blog_related_products_block_position === 'after_comments') {
        position = 1;
    } else if (storeConfig.aw_blog_related_products_block_position === 'after_post') {
        position = 2;
    }
    return (
        <div className="flex flex-row">
            <div className="xs:basis-full sm:basis-2/12 hidden-mobile">
                <Category {...props} />
            </div>
            <div className="xs:basis-full sm:basis-10/12 row">
                <div className="xs:basis-full md:basis-full">
                    <Body storeConfig={storeConfig} {...props} />
                </div>
                {
                    position !== 0
                    && (
                        <div className={position === 2 ? 'xs:basis-full md:basis-full' : 'hidden'}>
                            <RelatedProduct relatedProduct={relatedProduct.slice(0, limit)} t={t} storeConfig={storeConfig} layout={layout} />
                        </div>
                    )
                }
                <div className="xs:basis-full md:basis-full comment-container">
                    {
                        storeConfig.aw_blog_general_comments_enabled && (
                            <DiscussionEmbed
                                shortname={storeConfig.aw_blog_general_disqus_forum_code}
                                config={
                                    {
                                        url,
                                        identifier: url_key,
                                        title,
                                    }
                                }
                            />
                        )
                    }
                </div>
                {
                    position !== 0
                    && (
                        <div className={position === 1 ? 'xs:basis-full md:basis-full' : 'hidden'}>
                            <RelatedProduct relatedProduct={relatedProduct.slice(0, limit)} t={t} storeConfig={storeConfig} layout={layout} />
                        </div>
                    )
                }
            </div>
            <style jsx>
                {`
                    .comment-container {
                        padding: 10px 10px 10px 20px;
                    }
                    .hidden {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
};

export default DefaultContent;
