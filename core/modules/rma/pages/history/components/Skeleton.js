import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from '@core_modules/rma/pages/history/components/styles';

export const Loader = () => {
    const styles = useStyles();
    return (
        <div className={classNames(styles.container, 'row')}>
            <div className="lg:basis-10/12 xs:basis-full sm:basis-full">
                <div className={styles.tableOuterContainer}>
                    <div className={styles.table}>
                        <div className="flex flex-col" style={{ marginTop: 15, marginBottom: 10 }}>
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Divider />
                        </div>
                        <div className="flex flex-col" style={{ marginTop: 15, marginBottom: 10 }}>
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Divider />
                        </div>
                        <div className="flex flex-col" style={{ marginTop: 15, marginBottom: 10 }}>
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Skeleton variant="text" width="100%" height={30} />
                            <Divider />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
