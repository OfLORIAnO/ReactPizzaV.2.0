import { CartItemType } from '../redux/types';

export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((sum: number, obj): number => {
        return obj.price * obj.count + sum;
    }, 0);
};
