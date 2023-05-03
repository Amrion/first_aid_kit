import React, {FC, useEffect, useState} from 'react';
import './LoginPage.scss';
import InputsLogForm from "../../components/InputForm/InputLogForm/InputsLogForm";
import {title} from "../../models/Title/Title";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {loadingProfile} from "../../store/actions/userActions";
import Error500Page from "../Error500Page/Error500Page";

const LoginPage: FC = () => {
    const nav = useNavigate();

    const dispatch = useAppDispatch();

    const [error500, setError500] = useState(false);

    useEffect(() => {
        dispatch(loadingProfile())
            .then((res) => {
                if (res === true) {
                    nav('/');
                }

                if (res === 500) {
                    setError500(true);
                }
            });

        title.innerText = 'Вход';

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, [])

    return (
        !error500
        ?
            <div className='login-back'>
                <Link to='/info'>
                    <svg className='back-to-profile back-to-info' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#FFF"/>
                    </svg>
                </Link>
                <div className='auth-back'></div>
                <div className='login-form'>
                    <InputsLogForm/>
                </div>
            </div>
        :
            <Error500Page/>
    );
};

export default LoginPage;