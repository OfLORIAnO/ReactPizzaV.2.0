import { calcTotalPrice } from './calcTotalPrice';

export const getCatrFromLS = () => {
    const data: string | null = localStorage.getItem('cartItems');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);
    return {
        items,
        totalPrice,
    };
};
