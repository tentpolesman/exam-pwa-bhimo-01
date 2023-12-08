import Accordion from '@common/Accordion';
import cx from 'classnames';
import GenerateFilter from '@core_modules/catalog/plugins/ProductList/components/Filter/GenerateFilter';
import Button from '@common_button';

const FilterView = (props) => {
    const {
        isSearch, filter = [], handleSave, handleReset,
    } = props;

    return (
        <div className={cx(
            'flex flex-col gap-8 w-full relative desktop:max-w-[280px] overflow-y-scroll overflow-x-hidden max-h-screen scrollbar-none pb-[50%]',
        )}
        >
            {
                filter && filter.length > 0 && filter.map((itemFilter, key) => {
                    if ((itemFilter.field === 'cat' || itemFilter.field === 'attribute_set_id') && !isSearch) {
                        return <span key={key} />;
                    }
                    if (itemFilter.field === 'indexed_attributes' || itemFilter.field === 'category_uid') {
                        return null;
                    }
                    return (
                        <Accordion label={itemFilter.label || ''} open key={key}>
                            <GenerateFilter
                                itemFilter={itemFilter}
                                idx={key}
                                {...props}
                            />
                        </Accordion>
                    );
                })
            }

            <div className="flex flex-col gap-4 w-full desktop:hidden fixed bottom-0 left-0 p-4 bg-neutral-white shadow-inner z-10">
                <Button
                    onClick={handleReset}
                    className="w-full"
                    classNameText="justify-center"
                    variant="tertiary"
                >
                    Reset Filter
                </Button>
                <Button
                    onClick={handleSave}
                    className="w-full"
                    classNameText="justify-center"
                >
                    View Results
                </Button>
            </div>
        </div>
    );
};

export default FilterView;
