import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/cart/pages/default/components/style';

const SkeletonCart = () => {
    const styles = useStyles();
    return (
        <>
            <div className="hidden-desktop">
                <div className={styles.container}>
                    <Skeleton variant="rect" width="100%" height={40} style={{ marginBottom: 20 }} />
                    {
                        [1, 2, 3, 4].map((i) => (
                            <div className="flex flex-row" key={i} style={{ marginBottom: 15 }}>
                                <div className="xs:basis-4/12">
                                    <Skeleton variant="rect" width="100%" height={150} />
                                </div>
                                <div className="xs:basis-8/12">
                                    <Skeleton variant="text" width="100%" height={30} />
                                    <Skeleton variant="text" width="100%" height={30} />
                                    <Skeleton variant="text" width="100%" height={30} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="hidden-mobile">
                <div className="flex flex-row">
                    <div className="xs:basis-full sm:basis-8/12 md:basis-9/12" style={{ height: '100%' }}>
                        <Skeleton variant="rect" width="100%" height={40} style={{ marginBottom: 20 }} />
                        {
                            [1, 2, 3, 4, 5].map((i) => (
                                <div className="flex flex-row" key={i} style={{ marginBottom: 15 }}>
                                    <div className="xs:basis-2/12">
                                        <Skeleton variant="rect" width="80%" height={150} />
                                    </div>
                                    <div className="xs:basis-10/12">
                                        <Skeleton variant="text" width="100%" height={30} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="xs:basis-full sm:basis-4/12 md:basis-3/12 hidden-mobile">
                        <Skeleton variant="rect" width="100%" height={200} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkeletonCart;
