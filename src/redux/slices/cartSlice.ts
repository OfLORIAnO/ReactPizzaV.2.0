import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCatrFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartItemType, CartSliceState } from '../types';



const { items, totalPrice } = getCatrFromLS();

export const initialState: CartSliceState = {
    items,
    totalPrice,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(
            state,
            action: PayloadAction<{
                id: string;
                imageUrl: string;
                price: number;
                size: string;
                title: string;
                type: string;
            }>
        ) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem: CartItemType | undefined = state.items.find(
                (obj) => obj.id === action.payload
            );
            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(
                (obj) => obj.id !== action.payload
            );
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
        plusItem(state, action: PayloadAction<CartItemType>) {
            const findItem: CartItemType | undefined = state.items.find(
                (obj) => obj.id === action.payload.id
            );
            if (findItem) {
                findItem.count++;
            }
            state.totalPrice = state.items.reduce(
                (sum: number, obj: CartItemType): number =>
                    obj.price * obj.count + sum,
                0
            );
        },
    },
});

export const selectCartItemById = (id: string) => {
    return (state: RootState) => {
        return state.cart.items.find((obj: CartItemType) => obj.id === id);
    };
};

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectTotalCount = (state: RootState) => {
    return (
        state.cart.items.length &&
        state.cart.items.reduce((count: number, obj) => {
            return obj.count + count;
        }, 0)
    );
};
export const { addItem, removeItem, clearItems, minusItem, plusItem } =
    cartSlice.actions;
export default cartSlice.reducer;
