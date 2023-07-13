import React, { useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import s from './Search.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(
        (state: RootState) => state.filter.searchValue
    );
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    };
    const updateSerachValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 500),
        []
    );
    const onChangeInput = (eventValue: React.ChangeEvent<HTMLInputElement>) => {
        setValue(eventValue.target.value);
        updateSerachValue(eventValue.target.value);
    };

    return (
        <div className={s.root}>
            <button className={s.button}>
                <svg
                    className={s.icon}
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fill='#000000'
                        fillRule='evenodd'
                        d='M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z'
                    />
                </svg>
            </button>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => {
                    onChangeInput(e);
                }}
                className={s.input}
                placeholder='Поиск пиццы...'
            />
            {searchValue && (
                <button className={s.button} onClick={onClickClear}>
                    <svg
                        className={s.icon}
                        fill='#000000'
                        viewBox='0 0 16 16'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z'
                            fillRule='evenodd'
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};
export default Search;
