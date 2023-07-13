import React, { memo, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
    onChangeSort,
    selectDesc,
    selectSort,
} from '../redux/slices/filterSlice';
import { setDesc } from '../redux/slices/filterSlice';
import { SortType } from '../redux/types';

export const list: SortType[] = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
];
const Sort: React.FC = memo(() => {
    const dispatch = useDispatch();
    const sortType = useSelector(selectSort);
    const [open, setOpen] = useState(false);
    const desc = useSelector(selectDesc);
    const onClickItems = (obj: SortType) => {
        dispatch(onChangeSort(obj));
        setOpen(false);
    };
    const sortName = sortType.name;
    return (
        <div className='sort'>
            <div className='sort__label'>
                <div
                    style={{
                        cursor: 'pointer',
                        padding: '5px',
                    }}
                    onClick={() => {
                        dispatch(setDesc(desc));
                    }}
                >
                    <svg
                        style={{
                            transform: desc === 'desc' ? 'rotate(180deg)' : '',
                            fill: '#F24701',
                        }}
                        width='10'
                        height='6'
                        viewBox='0 0 10 6'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z' />
                    </svg>
                </div>
                <b>Сортировка по:</b>
                <span
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    {sortName}
                </span>
            </div>
            {open && (
                <div className='sort__popup'>
                    <ul>
                        {list.map((obj: SortType, id: number) => {
                            return (
                                <li
                                    onClick={() => {
                                        onClickItems(obj);
                                    }}
                                    className={
                                        sortType.sortProperty ===
                                        obj.sortProperty
                                            ? 'active'
                                            : ''
                                    }
                                    key={id}
                                >
                                    {obj.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
});
export default Sort;
