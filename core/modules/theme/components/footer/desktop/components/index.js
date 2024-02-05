import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import { COLORS } from '@core/theme/vars';

const FooterView = (props) => {
    const {
        data, t, loading, error, storeConfig,
    } = props;

    if (error) {
        return <div className="m-15 p-2 bg-red-500 text-neutral-white">{t('common:error:fetchError')}</div>;
    }

    return (
        <>
            <div className="cms-container wrapper-footer">
                {!loading ? <CmsRenderer content={data.cmsBlocks.items[0].content} storeConfig={storeConfig} /> : null}
                <style jsx global>
                    {`
                        .footer-links a {
                            display: block;
                            margin-bottom: 8px;
                            &:hover {
                                color: ${COLORS.primary.DEFAULT};
                            }
                        }
                        .footer-links br {
                            content: '';
                            display: block;
                            margin-top: 10px;
                            line-height: 22px;
                        }
                    `}
                </style>
            </div>
        </>
    );
};

export default FooterView;
