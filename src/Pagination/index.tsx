import React from 'react';

import s from './Pagination.module.scss';

import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/slices/filterSlice';
const Pagination: React.FC = () => {
    const dispatch = useDispatch();
    const onChangePage = (num: number) => {
        dispatch(setCurrentPage(num));
    };
    return (
        <div>
            <ReactPaginate
                className={s.root}
                breakLabel='...'
                nextLabel='>'
                onPageChange={(e) => onChangePage(e.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel='<'
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Pagination;
