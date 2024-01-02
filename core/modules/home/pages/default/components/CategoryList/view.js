/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import SpanCategory from '@common_spancategory';
import classNames from 'classnames';

const CategoryListView = ({ data = [], ...other }) =>
    null
    // return (
    //     <div className={classNames(styles.containerCategory)} id="home-category">
    //         { data.map((category, i) => (
    //             <div
    //                 key={i}
    //                 className={classNames(styles.contentContainer, styles.category)}
    //             >
    //                 <SpanCategory
    //                     {...other}
    //                     id={category.id}
    //                     imageSrc={category.image_path}
    //                     name={category.name}
    //                     description={category.description}
    //                     url={category.url_path}
    //                     right={(i + 1) % 2 === 0}
    //                 />
    //             </div>
    //         )) }
    //         <style jsx>
    //             {`
    //                 #home-category :global(img.has-error) {
    //                     height: 100% !important;
    //                 }
    //             `}
    //         </style>
    //     </div>
    // );
;

export default CategoryListView;
