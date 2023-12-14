import Image from '@common_image';
import { strToCSSObject } from '@helpers/text';
import { generateThumborUrl } from '@root/core/helpers/image';

const ImageRenderer = (props) => {
    const { domNode, storeConfig } = props;
    const {
        src = '', alt = '', style = '', ...attribs
    } = domNode.attribs;

    if (!domNode.attribs.src.includes('thumbor')) {
        const optImg = generateThumborUrl(src, 0, 0, true, false, storeConfig.pwa.thumbor_url);

        return (
            <>
                <Image
                    className={attribs.class}
                    classContainer="!pt-[unset]"
                    src={optImg}
                    alt={alt ?? 'image'}
                    width={attribs.width ? attribs.width.replace('px', '') : 0}
                    height={attribs.height ? attribs.height.replace('px', '') : 0}
                    storeConfig={storeConfig}
                />
                <style jsx global>
                    {`
                        img.img {
                            ${attribs.width ? `width: ${attribs.width} !important;` : ''}
                            ${attribs.height ? `height: ${attribs.height} !important;` : ''}
                            position: relative !important;
                            object-fit: cover;
                        }
                    `}
                </style>
            </>
        );
    }

    return <img src={src} alt={alt ?? 'image'} style={strToCSSObject(style)} {...attribs} />;
};

export default ImageRenderer;
