import { modules } from '@config';
import Select from '@common/Forms/Select';

export const generateCatalogSorting = (isSearch) => {
    let updatedSort;
    const baseSort = [
        { value: { key: 'name', value: 'ASC' }, label: 'Alphabetically (A to Z)' },
        { value: { key: 'name', value: 'DESC' }, label: 'Alphabetically (Z to A)' },
        { value: { key: 'price', value: 'ASC' }, label: 'Price (Low to High)' },
        { value: { key: 'price', value: 'DESC' }, label: 'Price (High to Low)' },
        { value: { key: 'random', value: 'ASC' }, label: 'Random' },
        { value: { key: 'new_old', value: 'DESC' }, label: 'Newest First' },
        { value: { key: 'new_old', value: 'ASC' }, label: 'Oldest First' },
        { value: { key: 'new', value: 'DESC' }, label: 'New Arrival' },
        { value: { key: 'bestseller', value: 'DESC' }, label: 'Best Seller' },
        { value: { key: 'onsale', value: 'DESC' }, label: 'On Sale' },
        { value: { key: 'mostviewed', value: 'DESC' }, label: 'Most Viewed' },
        { value: { key: 'wishlisttop', value: 'DESC' }, label: 'Wishlist Top' },
        { value: { key: 'toprated', value: 'DESC' }, label: 'Top Rated' },
        { value: { key: 'featured', value: 'DESC' }, label: 'Featured' },
        { value: { key: 'free', value: 'DESC' }, label: 'Free' },
    ];
    const catalogSort = [
        { value: { key: 'position', value: 'ASC' }, label: 'Most Relevance' },
    ];
    const searchSort = [
        { value: { key: 'relevance', value: 'DESC' }, label: 'Relevance' },
    ];

    if (isSearch) {
        updatedSort = [...searchSort, ...baseSort];
    } else {
        updatedSort = [...catalogSort, ...baseSort];
    }

    const { catalog } = modules;
    const sortList = catalog.productListing.sort;
    updatedSort = updatedSort.filter((sort) => sortList[sort.value.key]).map((updatedSortData) => ({
        ...updatedSortData,
        value: JSON.stringify({ key: updatedSortData.value.key, value: updatedSortData.value.value }),
    }));

    return updatedSort;
};

const Sorting = (props) => {
    const {
        isSearch, defaultSort, filterValue, setFiltervalue, t,
    } = props;
    const sortByData = React.useMemo(() => generateCatalogSorting(isSearch), []);

    const [value, setValue] = React.useState(defaultSort);
    const [selectedFilter] = React.useState(filterValue);

    const handleChange = (event) => {
        const savedData = {
            selectedFilter,
        };
        if (value !== '') {
            savedData.sort = event;
            setValue(event);
        }

        setFiltervalue(savedData);
    };

    const shortingValue = sortByData.filter((item) => item.value === value);

    return (
        <Select
            options={sortByData}
            onChange={handleChange}
            placeholder={t('catalog:title:short')}
            className="h-[36px]"
            value={shortingValue && shortingValue.length > 0 ? shortingValue[0].label : ''}
            textFiledProps={{
                className: 'h-[36px] !w-[auto] ml-2 mt-0',
                rightIconProps: {
                    className: '!text-neutral',
                },
            }}
            inputProps={{
                className: 'h-[34px] placeholder:!text-neutral',
            }}
        />
    );
};

export default Sorting;
