import React, {FC} from 'react';
import './header.scss'
import {Link} from "react-router-dom";
import HelloInHeader from "../HelloInHeader/HelloInHeader";
import SearchInHeader from "../SearchInHeader/SearchInHeader";
import {useAppSelector} from "../../hooks/useAppSelector";

const Header: FC = () => {
    const {name, photo} = useAppSelector(state => state.user);


    return (
        <header className='head-page'>
            <HelloInHeader/>
            <SearchInHeader/>
            <div className='header__profile'>
                <Link title='Профиль' to='/profile'>
                    <div style={{backgroundImage: `url(${photo})`}} className='photo-profile-header'></div>
                </Link>
                <Link title='Профиль' className='name-profile-header' to='/profile'>
                    {name}
                </Link>
            </div>
        </header>
    );
};

export default Header;