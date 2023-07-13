import React, { memo } from 'react';

type PropsType = {
    value: number;
    onChangeCategory: (index: number) => void;
};

const Categories = memo(({ value, onChangeCategory }: PropsType) => {
    const categorioes: string[] = [
        'Все',
        'Мясные',
        'Вегетарианские',
        'Гриль',
        'Острые',
        'Закрытые',
    ];
    
    return (
        <div className='categories scroll-bar'>
            <ul>
                {categorioes.map((categoryName: string, index: number) => {
                    return (
                        <li
                            key={index}
                            className={value === index ? 'active' : ''}
                            onClick={() => {
                                onChangeCategory(index);
                            }}
                        >
                            {categoryName}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});

export default Categories;
