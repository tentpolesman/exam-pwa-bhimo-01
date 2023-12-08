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
        isSearch, defaultSort, filterValue, setFiltervalue,
    } = props;
    const sortByData = React.useMemo(() => generateCatalogSorting(isSearch), []);

    const [value, setValue] = React.useState(defaultSort);
    const [selectedFilter] = React.useState(filterValue);

    const handleChange = (event) => {
        setValue(value);
        const savedData = {
            selectedFilter,
        };
        if (value !== '') {
            savedData.sort = event;
        }

        setFiltervalue(savedData);
    };
    return (
        <Select
            options={sortByData}
            onChange={handleChange}
            placeholder="Sort By"
            className="h-[36px]"
            textFiledProps={{
                className: 'h-[36px] !w-[auto] max-w-[110px] tablet:!w-[117px] ml-2 mt-0',
            }}
            inputProps={{
                className: 'h-[34px] placeholder:!text-neutral',
            }}
        />
    );
};

export default Sorting;
