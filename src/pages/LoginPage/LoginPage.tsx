import React, {FC, useEffect} from 'react';
import './LoginPage.scss';
import InputsLogForm from "../../components/InputForm/InputLogForm/InputsLogForm";
import {title} from "../../models/Title/Title";

const LoginPage: FC = () => {
    useEffect(() => {
        title.innerText = 'Вход';

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, [])

    return (
        <div className='login-back'>
            <div className='auth-back'></div>
            <div className='login-form'>
                <InputsLogForm/>
            </div>
        </div>
    );
};

export default LoginPage;