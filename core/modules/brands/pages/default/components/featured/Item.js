/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link';
import Image from 'next/image';

const ItemFeatured = (props) => {
    const {
        key, logo, name, category_url, is_active,
    } = props;
    return (
        <>
            {is_active === 1 ? (
                <>
                    {category_url ? (
                        (
                            <Link
                                href="/[...slug]"
                                as={category_url}
                                key={key}
                                className="desktop:w-[233px] tablet:w-[233px] mobile:w-full flex justify-center items-center h-full cursor-pointer mb-5"
                            >
                                <Image className="w-full h-auto" src={logo} alt={name} />
                            </Link>
                        )
                    ) : (
                        <div
                            key={key}
                            className="desktop:w-[233px] tablet:w-[233px] mobile:w-full flex justify-center items-center h-full cursor-pointer mb-5"
                        >
                            <Image className="w-full h-auto" src={logo} alt={name} />
                        </div>
                    )}
                </>
            ) : null}
        </>
    );
};

export default ItemFeatured;
