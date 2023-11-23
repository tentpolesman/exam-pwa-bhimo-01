import Skeleton from '@common_skeleton';
import ProductListSkeleton from '@plugin_productlist/components/ProductListSkeleton';
import useStyles from '@core_modules/catalog/pages/category/components/style';

const SkeletonCategory = (props) => {
    const styles = useStyles();

    const { drawer_filter_on_desktop_enable } = props;

    const className = drawer_filter_on_desktop_enable ? 'xs:basis-full lg:basis-10/12' : 'xs:basis-full lg:basis-full';

    return (
        <div className={styles.container}>
            <Skeleton
                variant="rect"
                xsStyle={{ width: '100vw', height: '60vw' }}
                mdStyle={{ width: '100%', height: '577px' }}
                lgStyle={{ width: '100%', height: '577px' }}
            />
            <Skeleton variant="text" width={225} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="40%" style={{ marginBottom: 20 }} />
            <div className="flex flex-row">
                {drawer_filter_on_desktop_enable
                    ? (
                        <div className="hidden-mobile lg:basis-2/12">
                            <Skeleton variant="rect" width="100%" height={705} />
                        </div>
                    ) : null }
                <div className={className}>
                    <ProductListSkeleton {...props} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCategory;
