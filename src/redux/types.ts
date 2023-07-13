//! CartSlice
export type CartItemType = {
    count: number;
    id: string;
    imageUrl: string;
    price: number;
    size: string;
    title: string;
    type: string;
};
export interface CartSliceState {
    totalPrice: number;
    items: CartItemType[];
}

//! SortSlice
export type SortType = {
    name: string;
    sortProperty: 'rating' | 'price' | 'title';
};
export type FilterState = {
    categoryId: number;
    currentPage: number;
    desc: 'desc' | 'asc';
    searchValue: string;
    sort: SortType;
};

//! pizzasSlice
export type AllPizzaType = {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    category: number;
    rating: number;
    sizes: number[];
    types: number[];
};
export interface PizzasSliceState {
    pizza: AllPizzaType | null;
    itemStatus: Status;
    items: AllPizzaType[];
    status: Status;
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
