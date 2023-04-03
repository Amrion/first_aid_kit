import React from 'react';
import AppRouter from "./router/AppRouter";
import {useAppSelector} from "./hooks/useAppSelector";
import './styles/index.scss'
import HeaderPlusNavbar from "./components/HeaderPlusNavbar/HeaderPlusNavbar";

const App = () => {
    const { isAuth } = useAppSelector(state => state.auth)

    return (
        <>
            {
                isAuth && <HeaderPlusNavbar/>
            }
            <AppRouter/>
        </>
    );
};

export default App;