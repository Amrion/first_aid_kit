import React, {FC, useEffect, useRef} from 'react';
import './header.scss'
import {Link} from "react-router-dom";
import HelloInHeader from "../HelloInHeader/HelloInHeader";
import SearchInHeader from "../SearchInHeader/SearchInHeader";

const Header: FC = () => {
    return (
        <header className='head-page'>
            <HelloInHeader/>
           <SearchInHeader/>
            <div className='header__profile'>
                <Link title='Профиль' to='/profile'>
                    <div style={{backgroundImage: "url(\"/styles/myPhoto.jpg\")"}} className='photo-profile-header'></div>
                </Link>
                <Link title='Профиль' className='name-profile-header' to='/profile'>
                   Даня
                </Link>
            </div>
        </header>
    );
};

export default Header;