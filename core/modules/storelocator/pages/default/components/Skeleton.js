import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonStoreLocator = () => (
    <>
        <div className="flex flex-row">
            <div className="md:basis-3/12">
                <Skeleton variant="rect" width="100%" height={515} />
            </div>
            <div className="md:basis-9/12">
                <Skeleton variant="rect" width="100%" height={467} />
                <Skeleton variant="rect" width="100%" height={36} style={{ marginTop: 12 }} />
            </div>
        </div>
    </>
);

export default SkeletonStoreLocator;
