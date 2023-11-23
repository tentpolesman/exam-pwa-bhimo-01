import Skeleton from '@common_skeleton';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import useStyles from '@core_modules/home/pages/default/components/style';

const CarouselProductSkeleton = () => {
    const SliderSkeleton = () => (
        <>
            <Skeleton
                variant="rect"
                animation="wave"
                width="100%"
                xsStyle={{ height: '60vw', marginBottom: '8px' }}
                smStyle={{ height: '42vw' }}
                mdStyle={{ height: '200px' }}
            />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="40%" animation="wave" />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="75%" animation="wave" />
            <Skeleton xsStyle={{ marginBottom: '8px' }} variant="rect" width="20%" animation="wave" />
        </>
    );
    return (
        <div style={{ padding: '24px 0 12px 0', width: '100%' }}>
            <Grid container wrap="nowrap">
                <Grid item xs={3} md={3} sm={4} style={{ padding: '0 6px 0 12px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={6} sm={4} md={3} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item xs={3} md={3} sm={4} style={{ padding: '0 6px' }}>
                    <SliderSkeleton />
                </Grid>
                <Grid item md={3} display={{ xs: 'none', sm: 'none' }} style={{ padding: '0 12px 0 6px' }}>
                    <SliderSkeleton />
                </Grid>
            </Grid>
        </div>
    );
};

const FeaturedSkeleteon = () => {
    const styles = useStyles();
    return (
        <div className={classNames('flex flex-row center-xs', styles.contentContainer)}>
            {[1, 2].map((key) => (
                <div key={key} className={classNames('xs:basis-full row', styles.features)}>
                    <div className={classNames('xs:basis-full')}>
                        <div className={styles.labelCategory}>
                            <Skeleton variant="text" height={45} width={200} />
                        </div>
                    </div>
                    <div
                        className={
                            classNames('xs:basis-full row between-lg', styles.featuresBox, key === 0 ? 'reverse' : '')
                        }
                        style={{ width: '85%' }}
                    >
                        <div className={classNames('xs:basis-full sm:basis-full lg:basis-4/12 hidden-mobile hidden-sm', styles.imgFeaturedContainer)}>
                            <div className={styles.imgFeaturedItem}>
                                <Skeleton height="100%" width="100%" variant="rect" />
                            </div>
                        </div>

                        <div className={classNames('xs:basis-full sm:basis-full lg:basis-8/12')}>
                            <div className={classNames('flex flex-row center-xs', styles.contentFeatured)}>
                                <div className={classNames('xs:basis-full', styles.contentMobileFeatured)}>
                                    <CarouselProductSkeleton />
                                </div>
                                <div className={classNames('xs:basis-full')}>
                                    <div className={styles.footerFeatured}>
                                        <Skeleton height={45} width={150} variant="rect" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeaturedSkeleteon;
