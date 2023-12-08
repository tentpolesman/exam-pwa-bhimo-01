/* eslint-disable @next/next/no-img-element */
import cx from 'classnames';
import { loaderImage } from '@config';

const ImageLoader = () => {
    const extention = loaderImage.split('.').pop();
    const isExtensionImageGif = extention === 'gif';

    if (isExtensionImageGif) {
        return (
            <img className="section-image-loader-gif" src={loaderImage} alt={loaderImage} />
        );
    }

    return (
        <img
            className="section-image-loader w-[60px] h-[60px]"
            src={loaderImage}
            alt={loaderImage}
        />
    );
};

const Backdrop = ({ open }) => (
    <div
        style={{
            zIndex: 999,
            backgroundColor: 'rgba(0,0,0, 0.5)',
        }}
        className={cx(
            'section-backdrop',
            'fixed',
            'z-50',
            'w-[100%]',
            'h-[100%]',
            'left-0',
            'top-0',
            'flex',
            'justify-center',
            'items-center',
            open && 'visible',
            !open && 'hidden',
        )}
    >
        <ImageLoader />
    </div>
);

export default Backdrop;
