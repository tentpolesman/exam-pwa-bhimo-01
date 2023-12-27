/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { useTranslation } from 'next-i18next';

const SearchBox = React.forwardRef((props, ref) => {
    const { t } = useTranslation(['common']);
    return null;
    // return (
    //     <StandaloneSearchBox
    //         ref={ref}
    //         onPlacesChanged={() => {
    //             props.handleSearch();
    //             props.setValue(ref.current.getPlaces()[0].formatted_address);
    //         }}
    //     >
    //         <TextField
    //             value={props.value}
    //             onChange={(e) => props.setValue(e.target.value)}
    //             fullWidth
    //             placeholder={t('common:search:location')}
    //             InputProps={{
    //                 startAdornment: (
    //                     <InputAdornment position="start">
    //                         <SearchIcon color="secondary" />
    //                     </InputAdornment>
    //                 ),
    //             }}
    //         />
    //     </StandaloneSearchBox>
    // );
});

export default SearchBox;
