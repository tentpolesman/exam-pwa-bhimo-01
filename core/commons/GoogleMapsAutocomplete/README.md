# Description

AutoComplete

## How To Use

**Sample Code**
```node
import { getCountries as getAllCountries } from '@core_modules/customer/services/graphql';
import CommonAutocomplete from '@common_autocomplete';

const Component = () => {
    const [getCountries, responCountries] = getAllCountries();

    React.useEffect(() => {
        console.log(responCountries);
    }, [responCountries]);

    React.useEffect(() => {
        getCountries();
    }, []);

    return (
        <>
            {responCountries && responCountries.data && responCountries.data.countries && (
                <CommonAutocomplete
                    value={sampleValue}
                    onChange={setSampleValue}
                    className="addressForm-country-autoComplete"
                    enableCustom={false}
                    loading={responCountries.loading}
                    itemOptions={responCountries && responCountries.data && responCountries.data.countries}
                    name="country"
                    primaryKey="id"
                    labelKey="full_name_locale"
                    useKey
                />
            )}
        </>
    );
}

export default Component;
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| gmapKey       | true    | API key for Google Maps API | string |
| geocodingKey       | optional    | label | string |
| formik | true | formik object | object |
| dragMarkerDone | true | function to update marker drag | function |
| defaultZoom | optional | default zoom maps size | number |
| mapPosition | true | object current position maps and must be have key `lat` and `lng` | object |
| markerDraggable | optional | boolean to enable marker draggable | boolean |
| useCustomMarkerIcon | optional | boolean to enable custom marker icon | boolean |
| customMarkerIcon | optional | this field is `required` if `useCustomMarkerIcon` is `true` custom marker icon | string |
| useLabel | optional | boolean to enable label | boolean |
| containerStyle | optional | style for container | css (jsx) object |