import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FilterState, SortType } from '../types';



const initialState: FilterState = {
    categoryId: 0,
    currentPage: 1,
    desc: 'desc',
    searchValue: '',
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        onChangeSort(state, action: PayloadAction<SortType>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setDesc(state, action: PayloadAction<string>) {
            const newDesc = action.payload === 'desc' ? 'asc' : 'desc';
            state.desc = newDesc;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setFilters(
            state,
            action: PayloadAction<{
                currentPage: number;
                categoryId: number;
                desc: 'asc' | 'desc';
                sort: SortType;
                sortBy?: string;
                searchValue?: string;
            }>
        ) {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.desc = action.payload.desc;
        },
    },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectDesc = (state: RootState) => state.filter.desc;
export const selectFilter = (state: RootState) => state.filter;

export const {
    setCategoryId,
    onChangeSort,
    setCurrentPage,
    setDesc,
    setFilters,
    setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
