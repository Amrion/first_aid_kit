import React, {FC, useEffect, useState} from 'react';
import './mainPage.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {loadingProfile} from "../../store/actions/userActions";
import {useNavigate} from "react-router-dom";
import {log} from "util";
import Error500Page from "../Error500Page/Error500Page";
import Loader from "../../components/Loader/Loader";
import {title} from "../../models/Title/Title";

const MainPage: FC = () => {
    const [value, setValue] = useState('Сегодня');

    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];
    const months = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ];
    const date = new Date();

    const nav = useNavigate();

    const {isAuth, isLoading} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const [error500, setError500] = useState(false);

    useEffect(() => {
        title.innerText = 'Главная страница';

        if (!isAuth) {
            dispatch(loadingProfile())
                .then((res) => {
                    if (res === 401) {
                        nav('/login');
                    }

                    if (res === 500) {
                        setError500(true);
                    }
                });
        }

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, [])

    return (
        isLoading
        ?
            <Loader/>
        :
        !error500
            ?
            <>
                <div className='calendar'>
                    <div className='calendar-h1'>
                        Ваши записи приема лекарств на
                        <select onChange={(e) => setValue(e.target.value)} value={value} className='select'>
                            {
                                days.map((item, index) => {
                                    if (date.getDay() + index > 6) {
                                        const temp = index - 7;
                                        return <option key={date.getDate() + index} className='opt'> {days[date.getDay() + temp]}, {date.getDate() + index} {months[date.getMonth()]} </option>
                                    }

                                    return <option key={date.getDate() + index} className='opt'> {days[date.getDay() + index]}, {date.getDate() + index} {months[date.getMonth()]} </option>
                                })
                            }
                        </select>
                    </div>
                    <div className='day'>
                        <div className='day__time'>{value}</div>
                    </div>
                </div>
            </>
            :
            <Error500Page/>
    );
};

export default MainPage;