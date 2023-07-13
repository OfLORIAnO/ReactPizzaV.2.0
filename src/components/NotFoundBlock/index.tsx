import React from 'react';

import s from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
    return (
        <div className='container'>
            <div className={s.notFound}>
                <span className={s.span}>😓</span>
                <br />
                <h1>Ничего не найдено :(</h1>
                <p className={s.description}>
                    К сожалению данная страница отсутсвует в нашем
                    интернет-магазине
                </p>
            </div>
        </div>
    );
};
export default NotFoundBlock;
