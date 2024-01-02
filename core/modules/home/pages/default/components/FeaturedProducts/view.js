/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import { breakPointsUp } from '@helper_theme';
import Typography from '@common_typography';
import Button from '@common_button';
import classNames from 'classnames';
import { setResolver, getResolver } from '@helper_localstorage';
import Link from 'next/link';
import Image from '@core_modules/home/pages/default/components/FeaturedProducts/Image';

const MobileView = ({
    products, url_path, category_image, name, right = false, t, id, ...other
}) => {
    const desktop = breakPointsUp('sm');
    const { storeConfig = {} } = other;
    const {
        category_list_image_size_desktop_height,
        category_list_image_size_desktop_width,
        category_list_image_size_mobile_height,
        category_list_image_size_mobile_width,
    } = storeConfig;
    let width = desktop ? category_list_image_size_desktop_width : category_list_image_size_mobile_width;
    let height = desktop ? category_list_image_size_desktop_height : category_list_image_size_mobile_height;

    if (typeof width === 'string') width = parseInt(width, 10);
    if (typeof height === 'string') height = parseInt(height, 10);

    const handleClick = async (link) => {
        const urlResolver = getResolver();
        urlResolver[link] = {
            type: 'CATEGORY',
            id,
        };
        await setResolver(urlResolver);
    };
    return null;
    // return (
    //     <div className={classNames('xs:basis-full row', styles.features)}>
    //         <div className={classNames('xs:basis-full')}>
    //             <div className={styles.labelCategory}>
    //                 <Link
    //                     href="/[...slug]"
    //                     as={`/${url_path}`}
    //                     onClick={() => handleClick(`/${url_path}`)}
    //                 >

    //                     <Typography letter="capitalize" type="bold" variant="h1" align="center">
    //                         {name || ''}
    //                     </Typography>

    //                 </Link>
    //             </div>
    //         </div>
    //         <div className={classNames('xs:basis-full row between-lg', styles.featuresBox, right ? 'reverse' : '')}>
    //             <div
    //                 className={classNames(
    //                     category_image ? 'xs:basis-full sm:basis-full lg:basis-4/12' : 'hidden-mobile hidden-desktop',
    //                     styles.imgFeaturedContainer,
    //                 )}
    //             >
    //                 {category_image ? (
    //                     <div className={styles.imgFeaturedItem}>
    //                         <Link
    //                             href="/[...slug]"
    //                             as={`/${url_path}`}
    //                             onClick={() => handleClick(`/${url_path}`)}
    //                             style={{ width: '100%' }}
    //                         >

    //                             <Image name={name} src={category_image} width={width} height={height} />

    //                         </Link>
    //                     </div>
    //                 ) : null}
    //             </div>
    //             <div className={classNames('xs:basis-full sm:basis-full', category_image ? 'lg:basis-8/12' : '')}>
    //                 <div className={classNames('flex flex-row center-xs', styles.contentFeatured)}>
    //                     <div className={classNames('xs:basis-full', styles.contentMobileFeatured)}>
    //                         <Carousel
    //                             data={products}
    //                             showArrow={desktop}
    //                             slideLg={category_image ? 4 : 6}
    //                             Item={ProductItem}
    //                             enableAddToCart={false}
    //                             enableQuickView={false}
    //                             {...other}
    //                         />
    //                     </div>
    //                     <div className={classNames('xs:basis-full')}>
    //                         <div className={styles.footerFeatured}>
    //                             <Button variant="outlined" onClick={() => handleClick(`/${url_path}`)} className={styles.buttonViewAllHome}>
    //                                 <Link href="/[...slug]" as={`/${url_path}`}>

    //                                     <Typography type="bold" variant="span" letter="uppercase">
    //                                         {t('common:button:viewAll')}
    //                                     </Typography>

    //                                 </Link>
    //                             </Button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};

const FeaturedView = ({ data = [], t, ...other }) =>
    null
    // return (
    //     <div className={classNames('flex flex-row center-xs', styles.contentContainer, 'hide')} id="home-featured">
    //         {data.map((category, i) => {
    //             const products = category.products.items.map((product) => ({
    //                 ...product,
    //                 name: product.name,
    //                 url: product.url_key,
    //                 imageSrc: product.small_image.url,
    //                 price: product.price_range.minimum_price.regular_price.value,
    //             }));
    //             return (
    //                 <MobileView
    //                     key={i}
    //                     url_path={category.url_path}
    //                     products={products}
    //                     category_image={category.image_path}
    //                     name={category.name}
    //                     id={category.id}
    //                     right={(i + 1) % 2 === 0}
    //                     t={t}
    //                     {...other}
    //                 />
    //             );
    //         })}
    //     </div>
    // );
;

export default FeaturedView;
