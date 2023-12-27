/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Dialog from '@common_dialog';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import Router from 'next/router';
import Button from '@common_button';
import AutoComplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import OptionsItem from '@core_modules/theme/components/header/desktop/components/autocomplete/view';
import CategoryWrapper from '@common_searchmodal/CategoryWrapper';
import VesMenuWrapper from '@common_searchmodal/VesMenuWrapper';

const SearchPage = (props) => {
    const [openedCategory, setOpenedCategory] = React.useState([]);
    const [showCat, setShowCat] = React.useState(true);
    const [showSubCat, setShowSubCat] = React.useState(false);
    const [slideCat, setSlideCat] = React.useState(false);
    const [value, setValue] = React.useState('');
    const { open, storeConfig = {} } = props;
    const vesMenu = storeConfig && storeConfig.pwa && storeConfig.pwa?.ves_menu_enable;

    const openSub = (cat) => {
        setOpenedCategory([cat]);
        setShowSubCat(true);
        setShowCat(false);
    };

    const closeSub = () => {
        setOpenedCategory([]);
        setShowSubCat(false);
        setShowCat(true);
        setSlideCat(true);
    };

    const handleCloseModal = () => {
        closeSub();
        setSlideCat(false);
        props.setOpenModal(false);
    };

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            handleCloseModal();
            Router.push(`/catalogsearch/result?q=${encodeURIComponent(value)}`);
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            handleCloseModal();
            Router.push(`/catalogsearch/result?q=${encodeURIComponent(value)}`);
        }
    };

    return (
        <>
            <Dialog
                open={open}
            >
                <div className="w-full h-full">
                    <div className="app-bar relative bg-neutral-white shadow-none">
                        <div className="toolbar">
                            <Button
                                onClick={handleCloseModal}
                                aria-label="close"
                            >
                                <ArrowLeftIcon className="text-[30px]" />
                            </Button>
                            <AutoComplete
                                setValue={setValue}
                                handleSearch={handleSearch}
                                width="100%"
                                maxHeight="100vh"
                                OptionsItem={OptionsItem}
                                storeConfig={storeConfig}
                            />
                            <Button
                                disabled={value === ''}
                                onClick={searchByClick}
                                aria-label="close"
                            >
                                <MagnifyingGlassIcon className="text-[30px]" />
                            </Button>
                        </div>
                    </div>
                    {open ? vesMenu ? (
                        <VesMenuWrapper
                            handleCloseModal={handleCloseModal}
                            storeConfig={storeConfig}
                        />
                    ) : (
                        <CategoryWrapper
                            {...props}
                            openedCategory={openedCategory}
                            showCat={showCat}
                            openSub={openSub}
                            slideCat={slideCat}
                            showSubCat={showSubCat}
                            closeSub={closeSub}
                            handleCloseModal={handleCloseModal}
                        />
                    ) : null}
                </div>
            </Dialog>
        </>
    );
};

export default SearchPage;
