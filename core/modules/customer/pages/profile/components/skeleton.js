/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Skeleton from '@common_skeleton';
import cx from 'classnames';

const ProfilePageSkeleton = () => {
    const TextFieldSkeleton = () => (
        <>
            <Skeleton variant="rect" width="25%" height={18} animation="wave" />
            <Skeleton variant="rect" width="80%" height={18} animation="wave" />
        </>
    );
    const CheckboxSkeleton = () => (
        <>
            <Skeleton variant="rect" width="20px" height={18} animation="wave" />
            <Skeleton variant="rect" width="30%" height={18} animation="wave" />
        </>
    );
    return null;
    // return (
    //     <div className={cx(styles.skeletonContainer)}>
    //         <TextFieldSkeleton />
    //         <TextFieldSkeleton />
    //         <TextFieldSkeleton />
    //         <CheckboxSkeleton />
    //         <CheckboxSkeleton />
    //         <TextFieldSkeleton />
    //         <Grid container className={styles.skeletonField} alignItems="center" direction="column">
    //             <Skeleton variant="rect" width="90%" height={32} animation="wave" />
    //         </Grid>
    //     </div>
    // );
};

export default ProfilePageSkeleton;
