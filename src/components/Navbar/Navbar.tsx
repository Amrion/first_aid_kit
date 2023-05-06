import React, {FC, useEffect, useRef, useState} from 'react';
import './navbar.scss'
import {Link, useLocation, useNavigate} from "react-router-dom";
import HelloInHeader from "../HelloInHeader/HelloInHeader";
import SearchInHeader from "../SearchInHeader/SearchInHeader";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {loginOrLogout} from "../../store/actions/authActions";
import {useAppSelector} from "../../hooks/useAppSelector";

const Navbar: FC = () => {
    const firstIcon = useRef<HTMLDivElement>();
    const secondIcon = useRef<HTMLDivElement>();
    const thirdIcon = useRef<HTMLDivElement>();
    const fourthIcon = useRef<HTMLDivElement>();

    const refNavbar = useRef<HTMLDivElement>();
    const refSide = useRef<HTMLDivElement>();

    const loc = useLocation();

    const nav = useNavigate();

    const dispatch = useAppDispatch();
    const {name, photo} = useAppSelector(state => state.user);

    useEffect(() => {
        if (loc.pathname === '/') {
            firstIcon.current.classList.add('active-icon');
            secondIcon.current.classList.remove('active-icon');
            thirdIcon.current.classList.remove('active-icon');
            fourthIcon.current.classList.remove('active-icon');

            return
        }

        if (loc.pathname === '/list' && loc.pathname.length === 5) {
            secondIcon.current.classList.add('active-icon')
            firstIcon.current.classList.remove('active-icon');
            thirdIcon.current.classList.remove('active-icon');
            fourthIcon.current.classList.remove('active-icon');

            return;
        }

        if (loc.pathname === '/addmed') {
            thirdIcon.current.classList.add('active-icon');
            secondIcon.current.classList.remove('active-icon');
            firstIcon.current.classList.remove('active-icon');
            fourthIcon.current.classList.remove('active-icon');

            return;
        }

        if (loc.pathname === '/notify') {
            fourthIcon.current.classList.add('active-icon');
            secondIcon.current.classList.remove('active-icon');
            thirdIcon.current.classList.remove('active-icon');
            firstIcon.current.classList.remove('active-icon');

            return;
        }

        fourthIcon.current.classList.remove('active-icon');
        secondIcon.current.classList.remove('active-icon');
        thirdIcon.current.classList.remove('active-icon');
        firstIcon.current.classList.remove('active-icon');
    }, [loc.pathname])

    const openNavbar = () => {
        refSide.current.classList.add('navbar-side-active')
        refNavbar.current.classList.remove('navbar-hidden');
        document.body.style.overflow = 'hidden';
    }

    const closeNavbar = () => {
        if (refNavbar.current.classList.length === 1) {
            refSide.current.classList.remove('navbar-side-active')
            refNavbar.current.classList.add('navbar-hidden');
            document.body.style.overflow = 'visible';
        }
    }

    const logout = async () => {
        const res = await dispatch(loginOrLogout(false));

        if (res === 200) {
            nav('/info');
        }
    }

    return (
        <>
            <div className='navbar-mobile'>
                <div style={{display: "flex"}}>
                    <svg onClick={openNavbar} className='navbar-menu-mobile' viewBox="0 0 30 30" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22"></path></svg>
                    <HelloInHeader/>
                </div>
                <div style={{display: "flex"}}>
                    <SearchInHeader/>
                    <div className='header__profile'>
                        <Link title='Профиль' to='/profile'>
                            <div style={{backgroundImage: `url(${photo})`}} className='photo-profile-header'></div>
                        </Link>
                        <Link title='Профиль' className='name-profile-header' to='/profile'>
                            {name}
                        </Link>
                    </div>
                </div>
            </div>
            <div ref={refSide} onClick={closeNavbar} className='navbar-side-mobile'></div>
            <div ref={refNavbar} className='navbar navbar-hidden'>
                <div className="navbar__logo">
                    <Link title='Главная страница'  to='/'>
                        <div className='logo-main' style={{backgroundImage: 'url(../../styles/favicon.webp)'}}></div>
                    </Link>
                </div>
                <div className="navbar__icons">
                    <div ref={firstIcon}  className="first-icon-bag">
                        <Link  title='Календарь приемов' to='/'>
                            <svg  onClick={closeNavbar} className='first-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11Z" fill="#B36FF7"/>
                                <path d="M7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16Z" fill="#B36FF7"/>
                                <path d="M11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11Z" fill="#B36FF7"/>
                                <path d="M11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16Z" fill="#B36FF7"/>
                                <path d="M15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11Z" fill="#B36FF7"/>
                                <path d="M15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16Z" fill="#B36FF7"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8 2C8.55228 2 9 2.44772 9 3V4H15V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V4C19.7614 4 22 6.23858 22 9V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V9C2 6.23858 4.23858 4 7 4V3C7 2.44772 7.44772 2 8 2ZM7 6C5.34315 6 4 7.34315 4 9V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V9C20 7.34315 18.6569 6 17 6C17 6.55229 16.5523 7 16 7C15.4477 7 15 6.55229 15 6H9C9 6.55229 8.55228 7 8 7C7.44772 7 7 6.55229 7 6Z" fill="#B36FF7"/>
                            </svg>
                        </Link>
                    </div>
                    <div ref={secondIcon}  className="second-icon-bag">
                        <Link title='Список ваших лекарств' to='/list'>
                            <svg onClick={closeNavbar} className='second-icon' xmlns="http://www.w3.org/2000/svg" height="800px"
                                 width="800px" version="1.1" id="_x32_" viewBox="0 0 512 512">
                                <g>
                                    <path className="st0"
                                          d="M490.014,117.161c-20.843-30.82-53.958-55.308-94.309-72.466C355.306,27.571,307.4,17.824,256,17.809   C187.466,17.864,125.144,35.077,78.542,64.26C55.26,78.891,35.847,96.605,21.986,117.161C8.141,137.654-0.024,161.262,0,186.124   v139.744c-0.024,24.862,8.134,48.469,21.986,68.97c20.843,30.819,53.958,55.3,94.301,72.466   C156.694,484.429,204.6,494.176,256,494.191c68.534-0.055,130.856-17.268,177.458-46.451   c23.273-14.631,42.686-32.353,56.555-52.902c13.845-20.501,22.011-44.109,21.986-68.97V186.124   C512.024,161.262,503.859,137.654,490.014,117.161z M40.669,186.124c0.024-16.006,5.052-31.336,15.052-46.245   c8.784-13.122,21.716-25.648,37.904-36.769l311.15,182.049c-7.077,3.908-14.512,7.602-22.415,10.946   c-35.713,15.164-79.313,24.179-126.36,24.171c-62.735,0.04-119.338-16.086-159.292-41.226   c-19.993-12.55-35.776-27.285-46.388-43.051c-3.924-5.847-7.141-11.804-9.651-17.872V186.124z M471.331,325.868   c-0.024,16.006-5.052,31.335-15.052,46.244c-14.933,22.296-41.582,43.004-76.453,57.755c-34.83,14.79-77.612,23.671-123.826,23.654   c-61.631,0.056-117.138-15.854-155.829-40.224c-19.366-12.153-34.466-26.323-44.45-41.186   c-10.001-14.909-15.029-30.239-15.052-46.244v-57.715c19.683,21.828,46.475,39.946,78.16,53.41   c39.51,16.744,86.597,26.355,137.171,26.371c67.429-0.04,128.656-17.046,173.995-45.467c15.918-9.992,29.842-21.462,41.336-34.195   V325.868z M471.331,218.127c-2.51,6.068-5.727,12.026-9.65,17.872c-6.855,10.214-16.03,19.937-26.983,28.968L126.582,84.689   c1.874-0.85,3.669-1.747,5.592-2.557C166.997,67.342,209.779,58.461,256,58.477c61.623-0.056,117.138,15.854,155.829,40.224   c19.366,12.152,34.466,26.323,44.45,41.177c10.001,14.909,15.029,30.239,15.052,46.245V218.127z"/>
                                </g>
                            </svg>
                        </Link>
                    </div>
                    <div ref={thirdIcon} className="third-icon-bag">
                        <Link title='Добавление лекарства в список' to='/addmed'>
                            <svg onClick={closeNavbar} className='third-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="#B36FF7" d="M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"/>
                                <path fill="#B36FF7" d="M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"/>
                                <path fill="#B36FF7" d="M544 384h96a32 32 0 1 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96v-96a32 32 0 0 1 64 0v96z"/>
                            </svg>
                        </Link>
                    </div>
                    <div ref={fourthIcon} className="fourth-icon-bag">
                        <Link title='Добавление уведомлений' to='/notify'>
                            <svg onClick={closeNavbar} className='fourth-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.33497 4.72727V5.25342C6.64516 6.35644 4.76592 9.97935 4.83412 13.1192L4.83409 14.8631C3.45713 16.6333 3.53815 19.2727 6.9735 19.2727H9.33497C9.33497 19.996 9.61684 20.6897 10.1186 21.2012C10.6203 21.7127 11.3008 22 12.0104 22C12.72 22 13.4005 21.7127 13.9022 21.2012C14.404 20.6897 14.6858 19.996 14.6858 19.2727H17.0538C20.4826 19.2727 20.5323 16.6278 19.1555 14.8576L19.1938 13.1216C19.2631 9.97811 17.3803 6.35194 14.6858 5.25049V4.72727C14.6858 4.00396 14.404 3.31026 13.9022 2.7988C13.4005 2.28734 12.72 2 12.0104 2C11.3008 2 10.6203 2.28734 10.1186 2.7988C9.61684 3.31026 9.33497 4.00395 9.33497 4.72727ZM12.9022 4.72727C12.9022 4.74573 12.9017 4.76414 12.9006 4.78246C12.6101 4.74603 12.3142 4.72727 12.014 4.72727C11.7113 4.72727 11.413 4.74634 11.1203 4.78335C11.1192 4.76474 11.1186 4.74603 11.1186 4.72727C11.1186 4.48617 11.2126 4.25494 11.3798 4.08445C11.547 3.91396 11.7739 3.81818 12.0104 3.81818C12.2469 3.81818 12.4738 3.91396 12.641 4.08445C12.8083 4.25494 12.9022 4.48617 12.9022 4.72727ZM11.1186 19.2727C11.1186 19.5138 11.2126 19.7451 11.3798 19.9156C11.547 20.086 11.7739 20.1818 12.0104 20.1818C12.2469 20.1818 12.4738 20.086 12.641 19.9156C12.8083 19.7451 12.9022 19.5138 12.9022 19.2727H11.1186ZM17.0538 17.4545C17.8157 17.4545 18.2267 16.5435 17.7309 15.9538C17.49 15.6673 17.3616 15.3028 17.3699 14.9286L17.4106 13.0808C17.4787 9.99416 15.0427 6.54545 12.014 6.54545C8.98598 6.54545 6.55028 9.99301 6.61731 13.0789L6.65748 14.9289C6.66561 15.303 6.53726 15.6674 6.29639 15.9538C5.80054 16.5435 6.21158 17.4545 6.9735 17.4545H17.0538Z" fill="#B36FF7"/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="navbar__exit">
                    <svg onClick={logout} className='exit-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="home-16px">
                        <path id="Path_77" data-name="Path 77" d="M-13,11.5v2A2.5,2.5,0,0,1-15.5,16h-4A2.5,2.5,0,0,1-22,13.5V2.5A2.5,2.5,0,0,1-19.5,0h4A2.5,2.5,0,0,1-13,2.5v2a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5v-2A1.5,1.5,0,0,0-15.5,1h-4A1.5,1.5,0,0,0-21,2.5v11A1.5,1.5,0,0,0-19.5,15h4A1.5,1.5,0,0,0-14,13.5v-2a.5.5,0,0,1,.5-.5A.5.5,0,0,1-13,11.5Zm6.962-3.809a.505.505,0,0,0,0-.382.518.518,0,0,0-.109-.163l-4-4a.5.5,0,0,0-.708,0,.5.5,0,0,0,0,.708L-7.707,7H-17.5a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h9.793l-3.147,3.146a.5.5,0,0,0,0,.708A.5.5,0,0,0-10.5,12a.5.5,0,0,0,.354-.146l4-4A.518.518,0,0,0-6.038,7.691Z" transform="translate(22)"/>
                    </svg>
                </div>
            </div>
        </>
    );
};

export default Navbar;