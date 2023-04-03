import React, {FC, useEffect} from 'react';
import InputRegForm from "../../components/InputForm/InputRegForm/InputsRegForm";
import {title} from "../../models/Title/Title";

const RegPage: FC = () => {
    useEffect(() => {
        title.innerText = 'Регистрация';

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, [])

    return (
        <div className='login-back'>
            <div className='auth-back'></div>
            <div className='login-form'>
                <InputRegForm/>
            </div>
        </div>
    );
};

export default RegPage;