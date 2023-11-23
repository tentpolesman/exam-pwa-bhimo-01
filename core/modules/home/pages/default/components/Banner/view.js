import Banner from '@common_slick/Banner';

const BannerView = (props) => {
    const { images, storeConfig } = props;
    return (
        <div className="sm:max-md:w-screen" id="home-banner">
            {images && images.length && <Banner data={images} storeConfig={storeConfig} />}
        </div>
    );
};

export default BannerView;
