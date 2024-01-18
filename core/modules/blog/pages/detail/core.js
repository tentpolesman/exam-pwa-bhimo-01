/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import Layout from '@layout';
import { useRouter } from 'next/router';
import { getBlogPostList } from '@core_modules/blog/services/graphql';
import CommonImage from '@common_image';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import Typography from '@common/Typography';
import formatDate from '@root/core/helpers/date';

const CoreDetail = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const {
        // t,
        pageConfig = {},
        storeConfig,
    } = props;
    const config = {
        title: 'Blog',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Blog',
        bottomNav: false,
        ...pageConfig,
    };

    const [getBlogs, { loading, data, error }] = getBlogPostList();
    const blogPost = (data?.getBlogPostList?.blog_data?.length > 0 && data.getBlogPostList.blog_data[0]) || null;

    console.log('blogPost', blogPost);

    useEffect(() => {
        getBlogs({
            variables: {
                filter: {
                    post_id: {
                        eq: id,
                    },
                },
            },
        });
    }, [id]);

    return (
        <Layout {...props} pageConfig={config}>
            {blogPost ? (
                <>
                    <div>
                        {blogPost?.categories?.map((category, idx) => (
                            <Typography className="!text-neutral-500 text-lg font-normal">{category?.title}</Typography>
                        ))}
                    </div>
                    <Typography variant="h1" className="text-3xl my-4">
                        {blogPost?.title}
                    </Typography>
                    <div className="mb-6">
                        <Typography className="!text-neutral-500 text-lg font-normal">
                            {`Last Updated: ${formatDate(blogPost.update_time, 'D MMMM YYYY')}`}
                        </Typography>
                    </div>
                    <div className="w-[1200px] h-[600px] rounded-2xl overflow-hidden">
                        <CommonImage src={blogPost?.image} height={600} width={1200} storeConfig={storeConfig} />
                    </div>
                    <div className="mt-6">{blogPost?.content ? <CmsRenderer content={blogPost.content} storeConfig={storeConfig} /> : null}</div>
                </>
            ) : null}
        </Layout>
    );
};

CoreDetail.propTypes = {
    Content: propTypes.func.isRequired,
    Skeleton: propTypes.func,
    WarningInfo: propTypes.func,
};

CoreDetail.defaultProps = {
    Skeleton: () => {},
    WarningInfo: () => {},
};

export default CoreDetail;
