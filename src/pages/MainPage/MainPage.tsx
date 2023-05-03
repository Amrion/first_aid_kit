import React, {FC, useEffect, useRef, useState} from 'react';
import './mainPage.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {loadingProfile} from "../../store/actions/userActions";
import {useNavigate} from "react-router-dom";
import Error500Page from "../Error500Page/Error500Page";
import Loader from "../../components/Loader/Loader";
import {title} from "../../models/Title/Title";
import {getNotify, getTime} from "../../store/actions/notifyActions";
import NotifyList from "../../components/NotifyList/NotifyList";

const MainPage: FC = () => {
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
    const [value, setValue] = useState('');

    const nav = useNavigate();

    const {isAuth, isLoading} = useAppSelector(state => state.auth);
    const {notList, time} = useAppSelector(state => state.notify);
    const dispatch = useAppDispatch();

    const [error500, setError500] = useState(false);

    const [nowDay, setNowDay] = useState([]);

    const [timeCheck, setTimeCheck] = useState(false);

    useEffect(() => {
        title.innerText = 'Главная страница';

        dispatch(getTime());

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

        if (notList.length === 0) {
            dispatch(getNotify())
        }

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, [])

    useEffect(() => {
        if (time !== '' && !timeCheck) {
            setValue(`${days[time.getDay()]}, ${time.getDate()} ${months[time.getMonth()]}`)
            setTimeCheck(true);
        }

        setNowDay(notList.filter((item) => {
            const now = new Date(item.time);
            if (now.getDate().toString() === value.replace(/[^0-9]/g,"")) {
                return item;
            }
        }).sort((a, b) => {
            return Number(a.time.split(' ')[1].slice(0, 2)) - Number(b.time.split(' ')[1].slice(0, 2));
        }))
    }, [value, notList, time])

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
                                time === ''
                                    ?
                                    <>
                                    </>
                                    :
                                    <>
                                        {
                                            days.map((item, index) => {
                                                if (time.getDay() + index > 6) {
                                                    const temp = index - 7;
                                                    return <option key={time.getDate() + index} className='opt'> {days[time.getDay() + temp]}, {time.getDate() + index} {months[time.getMonth()]} </option>
                                                }

                                                return <option key={time.getDate() + index} className='opt'> {days[time.getDay() + index]}, {time.getDate() + index} {months[time.getMonth()]} </option>
                                            })
                                        }
                                    </>
                            }
                        </select>
                    </div>
                    <div className='day'>
                        <div className='day__time'>{value}</div>
                        {
                            nowDay.length === 0
                                ?
                                <div className='not-list-null'>На этот день у вас нет уведомлений</div>
                                :
                                nowDay.map((item, index) => {
                                    return <NotifyList key={index} nowTime={time.toString().split(' ')[4].slice(0, 2)} name={item.name_to} med={item.name_medicine} time={item.time.split(' ')[1].slice(0, 5)}/>
                                })
                        }
                    </div>
                </div>
            </>
            :
            <Error500Page/>
    );
};

export default MainPage;