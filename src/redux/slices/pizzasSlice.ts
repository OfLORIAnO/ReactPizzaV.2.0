import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { linkMockApi, linkMockApiById } from '../../Http/links';
import { RootState } from '../store';
import { AllPizzaType, PizzasSliceState, Status } from '../types';

const initialState: PizzasSliceState = {
    //! Приём пиццы по ID
    pizza: null,
    itemStatus: Status.LOADING,
    //! Приём всех пицц
    items: [],
    status: Status.LOADING,
};

//! Запрос на сервер
export const fetchPizzas = createAsyncThunk<
    AllPizzaType[],
    Record<string, string>
>('pizza/fetchPizzasStatus', async (params) => {
    const { sortBy, order, category, search, page, limit } = params;
    const requestUrl =
        linkMockApi + page + limit + category + order + sortBy + search;
    const { data } = await axios.get<AllPizzaType[]>(requestUrl);
    return data;
});

export const fetchPizzaById = createAsyncThunk<AllPizzaType, string>(
    'pizza/fetchPizzaById',
    async (id) => {
        const requestUrl = linkMockApiById + `/${id}`;
        const { data } = await axios.get(requestUrl);
        return data;
    }
);

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<AllPizzaType[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            })
            .addCase(fetchPizzaById.pending, (state) => {
                state.itemStatus = Status.LOADING;
                state.pizza = null;
            })
            .addCase(fetchPizzaById.fulfilled, (state, action) => {
                state.itemStatus = Status.SUCCESS;
                state.pizza = action.payload;
            })
            .addCase(fetchPizzaById.rejected, (state) => {
                state.itemStatus = Status.ERROR;
                state.pizza = null;
            });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
