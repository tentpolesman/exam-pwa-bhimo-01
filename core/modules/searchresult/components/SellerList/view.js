/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-plusplus */
import Typography from '@common_typography';
import Link from 'next/link';
import Image from '@common_image';
import Show from '@common/Show';
import Skeleton from './skeleton';

const SellerItem = (props) => {
    const { name, id, logo, city } = props;
    const citySplit = city?.split(',');

    return (
        <div className="flex flex-row justify-between items-center">
            <Link href={`/seller/${id}`}>
                <div className="flex flex-row mt-3">
                    <div className="float-left mr-5">
                        <div className="rounded-full flex items-center justify-center h-max w-max">
                            <Image src={logo} classContainer="w-[60px] h-[60px]" className="w-[60px] h-[60px]" />
                        </div>
                    </div>
                    <div>
                        <Typography variant="p" type="bold" letter="capitalize" size="14">
                            {name}
                        </Typography>
                        <Typography variant="p" type="regular" letter="capitalize" size="12">
                            {citySplit ? citySplit[0] : ''}
                        </Typography>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const SellerView = (props) => {
    const { data, loading } = props;

    return (
        <div className="flex flex-col gap-4">
            <Typography className="font-semibold text-base">Seller</Typography>
            <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4">
                <Show when={loading}>
                    {[1, 2, 3, 4].map((key) => (
                        <Skeleton key={key} />
                    ))}
                </Show>
                <Show when={!loading}>
                    {data.map((item, idx) => (
                        <SellerItem {...item} key={idx} />
                    ))}
                </Show>
            </div>
        </div>
    );
};

export default SellerView;
