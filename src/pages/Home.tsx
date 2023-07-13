import React, { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

import Pagination from '../Pagination';

import { list } from '../components/Sort';
import { useSelector } from 'react-redux';
import {
    selectFilter,
    setCategoryId,
    setFilters,
} from '../redux/slices/filterSlice';
import {
    fetchPizzas,
    selectPizzaData,
} from '../redux/slices/pizzasSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';
import { AllPizzaType, Status } from '../redux/types';

const Home: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    //! Достаём данные из redux toolkit store
    const { currentPage, desc, categoryId, sort } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);

    //!Ф-ия изменение категории
    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);

    const searchValue = useSelector(
        (state: RootState) => state.filter.searchValue
    );

    //! Ф-ий запроса на MockAPI
    const getPizzas = () => {
        //! Настройка параметров
        const sortBy: string = `&sortBy=${sort.sortProperty}`;
        const order: string = `&order=${desc}`;
        const category: string =
            categoryId > 0 ? `&category=${+categoryId}` : '';
        const search: string = searchValue ? `&search=${searchValue}` : '';
        const page: string = `&page=${+currentPage}`;
        const limit: string = `&limit=4`;
        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                page,
                limit,
            })
        );
    };
    //! Достаём данные из ссылки для обновления страички без потери формы
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const descParam: 'desc' | 'asc' =
                params.desc === 'desc' ? 'desc' : 'asc';
            const paramsWIthType = {
                categoryId: Number(params.categoryId),
                currentPage: Number(params.currentPage),
                desc: descParam,
                sortBy: String(params.sortBy),
            };
            const sort = list.find((obj) => obj.sortProperty === params.sortBy);

            sort &&
                dispatch(
                    setFilters({
                        ...paramsWIthType,
                        sort,
                    })
                );
            isSearch.current = true;
        }
    }, []);
    //! Вызываем функцию по парсингу пицц
    useEffect(() => {
        if (isMounted.current || location.pathname === '/') {
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort, desc, searchValue, currentPage]);
    //! Перекидывает на ссылку, полученную из параметров
    useEffect(() => {
        if (isMounted.current) {
            const quertyString = qs.stringify({
                categoryId,
                currentPage,
                desc,
                sortBy: sort.sortProperty,
            });
            navigate(`?${quertyString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort, desc, currentPage]);

    //! Список пицц
    const pizzas = items.map((obj: AllPizzaType) => (
        <PizzaBlock key={obj.id} {...obj} />
    ));
    //! Создание скелетонов
    const skeletons = [...new Array(6)].map((_, i) => {
        return <Skeleton key={i} />;
    });

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {status === Status.ERROR ? (
                    <div className={'content__error-info'}>
                        <h2>Произошла ошибка🥲</h2>
                        <p>
                            К сожалению, не удалось получить пиццы. Попробуйте
                            повторить попытку позже
                        </p>
                    </div>
                ) : status === Status.LOADING ? (
                    skeletons
                ) : (
                    pizzas
                )}
            </div>
            <Pagination />
        </div>
    );
};
export default Home;
