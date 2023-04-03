import React, {FC, useEffect, useState} from 'react';
import './LoginPage.scss';
import InputsLogForm from "../../components/InputForm/InputLogForm/InputsLogForm";
import {title} from "../../models/Title/Title";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
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