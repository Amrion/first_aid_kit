import React, {FC, useEffect} from 'react';
import '../ErrorPage/ErrorPage.scss'
import {Link} from "react-router-dom";
import MyButton from "../../components/MyButton/MyButton";
import {useAppSelector} from "../../hooks/useAppSelector";

const Error500Page: FC = () => {
    const {isAuth} = useAppSelector(state => state.auth);

    useEffect(() => {
        const navbar = document.querySelector('.navbar');

        if (navbar !== null) {
            document.querySelector('.navbar').classList.add('navbar-delete');
            document.querySelector('.navbar-mobile').classList.add('navbar-delete');
            document.querySelector('.head-page').classList.add('navbar-delete');
        }

        return () => {
            const navbar = document.querySelector('.navbar');

            if (navbar !== null) {
                document.querySelector('.navbar').classList.remove('navbar-delete');
                document.querySelector('.navbar-mobile').classList.remove('navbar-delete');
                document.querySelector('.head-page').classList.remove('navbar-delete');
            }
        }
    }, [])

    return (
        <div className="error-container">
            <h1 className='error-text '> Ой... Серверная ошибка! </h1>
            <div className="error-img error-img-500"/>
            <MyButton size='desktop-log' width='600px' height='60px' fontSize='25px' margin='20px 0 0 0'>
                {
                    isAuth
                        ?
                        <Link className='error-link' to='/'> Вернуться на главную страницу </Link>
                        :
                        <Link className='error-link' to='/info'> Вернуться на главную страницу </Link>
                }
            </MyButton>
            <MyButton size='small-desktop-log' width='500px' height='55px' fontSize='22px' margin='20px 0 0 0'>
                {
                    isAuth
                        ?
                        <Link className='error-link' to='/'> Вернуться на главную страницу </Link>
                        :
                        <Link className='error-link' to='/info'> Вернуться на главную страницу </Link>
                }
            </MyButton>
            <MyButton size='ipad-log' width='400px' height='50px' fontSize='20px' margin='20px 0 0 0'>
                {
                    isAuth
                        ?
                        <Link className='error-link' to='/'> Вернуться на главную страницу </Link>
                        :
                        <Link className='error-link' to='/info'> Вернуться на главную страницу </Link>
                }
            </MyButton>
            <MyButton size='mobile-log' width='100%' height='45px' fontSize='18px' margin='20px 0 0 0'>
                {
                    isAuth
                        ?
                        <Link className='error-link' to='/'> Вернуться на главную страницу </Link>
                        :
                        <Link className='error-link' to='/info'> Вернуться на главную страницу </Link>
                }
            </MyButton>
        </div>
    );
};

export default Error500Page;