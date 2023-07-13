import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {  fetchPizzaById } from '../redux/slices/pizzasSlice';
import { RootState } from '../redux/store';
import { Status } from '../redux/types';
export type pizzaType = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
};
const FullPizza = (): JSX.Element => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { pizza, itemStatus } = useSelector(
        (state: RootState) => state.pizza
    );
    useEffect(() => {
        id && dispatch(fetchPizzaById(id));
    }, []);
    const navigateToMainPage = () => {
        alert('Такой пиццы не существует');
        navigate('/');
        return <h1>Ошибка</h1>;
    };
    const containerStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };
    if (itemStatus === Status.LOADING) {
        return (
            <div className='container' style={containerStyles}>
                <h2>Загрузка</h2>
            </div>
        );
    } else if (itemStatus === Status.SUCCESS && pizza) {
        return (
            <div className='container' style={containerStyles}>
                <img
                    style={{ maxWidth: '350px' }}
                    src={pizza.imageUrl}
                    alt='Pizza Img'
                />
                <h2>{pizza.title}</h2>
                <h4>от {pizza.price} ₽</h4>
            </div>
        );
    } else {
        navigateToMainPage();
        return <h2>Ошибка</h2>;
    }
};
export default FullPizza;
