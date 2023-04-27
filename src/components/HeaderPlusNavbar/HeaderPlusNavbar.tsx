import React from 'react';
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import {useLocation} from "react-router-dom";

const HeaderPlusNavbar = () => {
    const loc = useLocation();

    return (
        <>
            {
                (loc.pathname === '/profile' || loc.pathname === '/addfamily') ?
                    <Navbar/>
                    :
                    <>
                        <Navbar/>
                        <Header/>
                    </>
            }
        </>
    );
};

export default HeaderPlusNavbar;