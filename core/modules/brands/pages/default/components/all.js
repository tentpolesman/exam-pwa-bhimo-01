/* eslint-disable no-param-reassign */
import Typography from '@common_typography';
import GridList from '@common_gridlist';
import Link from 'next/link';

const Item = (props) => {
    const { group, children } = props;
    return (
        <div className="mobile:px-[20px]">
            <Typography className="text-center uppercase font-bold">
                {group}
                <ul>
                    {children.map((val, idx) => (
                        <>
                            {val.is_active === 1 ? (
                                <li key={idx} className="text-left text-xs">
                                    {val.attribute_id ? (
                                        <Link href={`/catalogsearch/advanced/result?brand[]=${val.attribute_id}`}>
                                            {val.name}
                                        </Link>
                                    ) : val.name}
                                </li>
                            ) : null}
                        </>
                    ))}
                </ul>
            </Typography>
        </div>
    );
};

const AllBrands = (props) => {
    const { all, t } = props;
    return (
        <>
            <Typography
                className="mb-[15px] flex flex-col justify-center items-center text-center uppercase font-bold"
            >
                {t('brands:allBrands')}
            </Typography>
            <GridList
                data={all}
                ItemComponent={Item}
                className="desktop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-2"
            />
        </>
    );
};

export default AllBrands;
