/* eslint-disable no-nested-ternary */
import IcubeMapsAutocomplete from '@common_googlemaps_autocomplete';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MagezonGoogleMaps = (props) => {
    // prettier-ignore
    const {
        infobox_background_color, items, map_draggable, map_zoom, storeConfig,
    } = props;

    const gmapKey = (storeConfig || {}).icube_pinlocation_gmap_key;
    const geocodingKey = (storeConfig || {}).icube_pinlocation_geocoding_key;
    const center = items.find((item) => item.center === '1') || items[0];
    const updatedItems = [...items.filter((item) => item.center !== '1'), center];

    const [mapPosition, setMapPosition] = React.useState({
        lat: parseFloat(center.lat),
        lng: parseFloat(center.lng),
    });

    const handleDragPosition = (value) => {
        setMapPosition(value);
    };

    const ValidationAddress = {
        addressDetail: Yup.string(),
        country: Yup.string().nullable(),
        region: Yup.string().nullable(),
        city: Yup.string().nullable(),
    };

    const InitialValue = {
        addressDetail: '',
        country: {
            id: 'ID',
            full_name_locale: 'Indonesia',
        },
        region: '',
        city: '',
    };

    const formik = useFormik({
        initialValues: InitialValue,
        validationSchema: Yup.object().shape(ValidationAddress),
        onSubmit: async () => {},
    });

    return (
        <>
            <div className="mgz-google-maps">
                {gmapKey && (
                    <IcubeMapsAutocomplete
                        gmapKey={gmapKey}
                        geocodingKey={geocodingKey}
                        markers={updatedItems}
                        defaultZoom={map_zoom}
                        mapPosition={mapPosition}
                        dragMarkerDone={handleDragPosition}
                        markerIcon={storeConfig.secure_base_media_url}
                        useCustomMarkerIcon={storeConfig.secure_base_media_url !== ''}
                        markerDraggable={map_draggable}
                        formik={formik}
                    />
                )}
            </div>
            <style jsx>
                {`
                    .mgz-google-maps :global(div[role='dialog'][class*='gm-style-iw']) {
                        background-color: ${infobox_background_color || '#ffffff'};
                        max-height: none !important;
                        padding: 10px !important;
                    }
                    .mgz-google-maps :global(div[role='dialog'][class*='gm-style-iw'] > div) {
                        overflow: visible !important;
                        max-height: none !important;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonGoogleMaps;
