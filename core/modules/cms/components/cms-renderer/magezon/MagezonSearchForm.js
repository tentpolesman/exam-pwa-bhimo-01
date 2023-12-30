import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React from 'react';

const Autocomplete = dynamic(() => import('@core_modules/theme/components/header/components/autocomplete'), { ssr: false });

const MagezonSearchForm = (props) => {
    const {
        placeholder, form_width, input_background_color, input_text_color, storeConfig,
    } = props;
    const [setValue] = React.useState('');
    const { t } = useTranslation();
    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            Router.push(`/catalogsearch/result?q=${encodeURIComponent(ev.target.value)}`);
        }
    };

    return (
        <div className="mgz-searchform">
            <Autocomplete
                setValue={setValue}
                handleSearch={handleSearch}
                t={t}
                placeholder={placeholder}
                storeConfig={storeConfig}
                textfieldProps={{
                    className: 'mgz-searchform-textfield',
                }}
                popoverProps={{
                    wrapperClassName: '!flex-col-reverse !gap-[10px]',
                    className: '!relative',
                }}
            />
            <style jsx>
                {`
                    .search-icon {
                        position: absolute;
                        right: -10px;
                        top: 0px;
                        background: #ffffff00;
                    }
                    .mgz-searchform {
                        display: flex;
                        align-items: center;
                        float: left;
                        position: relative;
                    }
                    .mgz-searchform :global(input) {
                        ${input_text_color ? `color: ${input_text_color};` : ''}
                        ${input_background_color ? `background-color: ${input_background_color};` : ''}
                    }
                    .mgz-searchform :global(.mgz-searchform-textfield) {
                        ${form_width ? `width: ${form_width}px;` : ''}
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonSearchForm;
