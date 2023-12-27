import Skeleton from '@common_skeleton';
import GridList from '@common_gridlist';
import Typography from '@common_typography';

const Item = () => ((
    <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
    </>
));

const SkeletonBrands = ({ t }) => (
    <>
        <Typography className="text-center uppercase font-bold mb-[15px] flex flex-col justify-center items-center">
            {t('brands:featuredBrands')}
        </Typography>
        <Skeleton className="rounded-[50%] mb-[20px]" width="100%" height={218} />
        <Typography
            className="text-center uppercase font-bold mb-[15px] flex flex-col justify-center items-center"
            align="center"
            letter="uppercase"
            type="bold"
            variant="span"
        >
            {t('brands:allBrands')}
        </Typography>
        <GridList
            data={[1, 2, 3, 4]}
            ItemComponent={Item}
            className="desktop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-2"
        />
    </>
);

export default SkeletonBrands;
