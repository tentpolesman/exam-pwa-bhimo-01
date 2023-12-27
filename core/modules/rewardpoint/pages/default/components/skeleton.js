/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Divider from '@common_divider';
import Skeleton from '@common_skeleton';

const SkeletonDetail = () => (
    <>
        <Skeleton variant="text" animation="wave" width="100%" height={25} style={{ marginBottom: 20 }} />
        <Skeleton variant="text" animation="wave" width="100%" height={25} style={{ marginBottom: 20 }} />
        <Skeleton variant="text" animation="wave" width="100%" height={25} style={{ marginBottom: 20 }} />
    </>
);

export const Loader = () =>
    null
    // return (
    //     <div className={styles.container}>
    //         <SkeletonDetail />
    //         <div className={styles.tableOuterContainer}>
    //             <div className={styles.table}>
    //                 <div className="flex flex-col" style={{ marginTop: 15, marginBottom: 10 }}>
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Divider />
    //                 </div>
    //                 <div className="flex flex-col" style={{ marginTop: 15, marginBottom: 10 }}>
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Divider />
    //                 </div>
    //                 <div className="flex flex-col" style={{ marginTop: 15, marginBottom: 10 }}>
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Skeleton variant="text" width="100%" height={30} />
    //                     <Divider />
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
;

export default Loader;
