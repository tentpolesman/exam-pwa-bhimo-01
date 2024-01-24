import ViewMobile from '@core_modules/customer/pages/account/components/Customer/view/mobile';
import ViewDesktop from '@core_modules/customer/pages/account/components/Customer/view/desktop';
import useMediaQuery from '@hook/useMediaQuery';
import Show from '@common_show';

const CustomerView = (props) => {
    const { isDesktop } = useMediaQuery();

    return (
        <>
            {/** Desktop */}
            <Show when={isDesktop}>
                <ViewDesktop {...props} />
            </Show>
            {/** Mobile Tablet */}
            <Show when={!isDesktop}>
                <ViewMobile {...props} />
            </Show>
        </>
    );
};

export default CustomerView;
