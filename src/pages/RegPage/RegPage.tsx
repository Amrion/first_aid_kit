import React, {FC, useEffect, useState} from 'react';
import InputRegForm from "../../components/InputForm/InputRegForm/InputsRegForm";
import {title} from "../../models/Title/Title";
import {loadingProfile} from "../../store/actions/userActions";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import Error500Page from "../Error500Page/Error500Page";

const RegPage: FC = () => {
    const nav = useNavigate();

    const {isAuth} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const [error500, setError500] = useState(false);


    useEffect(() => {
        if (isAuth) {
            dispatch(loadingProfile())
                .then((res) => {
                    if (res === true) {
                        nav('/');
                    }

                    if (res === 500) {
                        setError500(true);
                    }
                });
        }

        title.innerText = 'Регистрация';

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
                    <InputRegForm/>
                </div>
            </div>
            :
            <Error500Page/>
    );
};

export default RegPage;