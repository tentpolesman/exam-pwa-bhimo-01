import dynamic from 'next/dynamic';

const ConfigurableOption = dynamic(() => import('@plugin_optionitem/ConfigurableOption'), { ssr: false });
const SimpleOption = dynamic(() => import('@plugin_optionitem/SimpleProduct'), { ssr: false });
const VirtualOption = dynamic(() => import('@plugin_optionitem/Virtual'), { ssr: false });
const DownloadOption = dynamic(() => import('@plugin_optionitem/Download'), { ssr: false });
const BundleOption = dynamic(() => import('@plugin_optionitem/BundleOption'), { ssr: false });

const OptionItem = (props) => {
    const {
        data, enableConfigurable = true, enableSimple = true,
        enableVirtual = true, enableDownload = true, enableBundle = true,
    } = props;
    const { __typename } = data;
    return (
        <>
            {enableConfigurable && __typename === 'ConfigurableProduct' && (
                <ConfigurableOption
                    {...props}
                />
            )}

            {enableSimple && __typename === 'SimpleProduct' && (
                <SimpleOption
                    {...props}
                />
            )}

            {enableVirtual && __typename === 'VirtualProduct' && (
                <VirtualOption
                    {...props}
                />
            )}

            {enableDownload && __typename === 'BundleProduct' && (
                <BundleOption
                    {...props}
                />
            )}
            {enableBundle && __typename === 'DownloadableProduct' && (
                <DownloadOption
                    {...props}
                />
            )}
        </>
    );
};

export default OptionItem;
