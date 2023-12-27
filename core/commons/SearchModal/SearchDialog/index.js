/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import Dialog from '@common_dialog';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import classNames from 'classnames';
import Router from 'next/router';
import Button from '@common_button';
import { useTranslation } from 'next-i18next';

const data = [
    {
        text: 'Shisendo',
        value: 1,
    },
];
const category = [
    {
        text: 'Shirt',
        value: 23,
        cat: 'Top',
    },
    {
        text: 'Shine',
        value: 13,
        cat: 'Accesories',
    },
];

const TextSearch = ({
    text = '', searchValue = '', value = 3, subText = '',
}) => {
    const textArray = text.split('');
    const valueArray = searchValue.split('');
    return (
        <div className="flex flex-row justify-between pr-[15%]">
            <div className="flex flex-col my-[10px]">
                <Typography className="m-0">
                    {valueArray.map((txt, key) => textArray[key])}
                    <Typography className="m-0">
                        {textArray.map((txt, idx) => idx >= valueArray.length && txt)}
                    </Typography>
                </Typography>
                <Typography className="m-0">
                    {subText}
                </Typography>
            </div>
            <Typography>{value}</Typography>
        </div>
    );
};

const SearchDialog = ({ open, setOpen }) => {
    const { t } = useTranslation(['common']);
    const [value, setValue] = React.useState('');
    const classBody = value === '' ? classNames('mr-[10px] mb-[10px] ml-[15%]', 'hidden') : classNames('mr-[10px] mb-[10px] ml-[15%]', 'block');
    const handleSearch = (ev) => {
        if (ev.key === 'Enter') {
            Router.push(`/catalogsearch/result?q=${encodeURIComponent(value)}`);
        }
    };

    const handleAutoComplete = (event) => {
        setValue(event.target.value);
    };

    return (
        <Dialog open={open} onClose={setOpen}>
            <div className="app-bar relative bg-neutral-white shadow-none">
                <div className="toolbar">
                    <Button edge="start" onClick={setOpen} aria-label="close">
                        <XMarkIcon className="text-[30px] text-primary" />
                    </Button>
                    <TextField placeholder="Search ..." value={value} onChange={handleAutoComplete} onKeyPress={handleSearch} />
                </div>
            </div>
            <div className={classBody}>
                <Typography variant="span" type="bold" letter="uppercase" className="my-[16px]">
                    {t('common:title:brand')}
                </Typography>
                <div className="flex flex-col mt-[16px] mb-[30px]">
                    {data.map((dt, idx) => (
                        <a
                            key={idx}
                            onClick={() => {
                                Router.push('/product/[id]', `/product/${dt.text.toLowerCase()}`);
                            }}
                        >
                            <TextSearch text={dt.text} searchValue={value} value={dt.value} />
                        </a>
                    ))}
                </div>
                <Typography variant="span" type="bold" letter="uppercase" className="my-[16px]">
                    {t('common:title:category')}
                </Typography>
                <div className="flex flex-col mt-[16px] mb-[30px]">
                    {category.map((dt, idx) => (
                        <a key={idx} onClick={() => Router.push('/category/[id]', `/category/${dt.cat.toLowerCase()}`)}>
                            <TextSearch text={dt.text} searchValue={value} value={dt.value} subText={`in ${dt.cat}`} />
                        </a>
                    ))}
                </div>
            </div>
        </Dialog>
    );
};

export default SearchDialog;
