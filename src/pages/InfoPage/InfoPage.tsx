import React, {FC, useEffect, useRef, useState} from 'react';
import './infoPage.scss'
import MyButton from "../../components/MyButton/MyButton";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {loadingProfile} from "../../store/actions/userActions";
import {title} from "../../models/Title/Title";
import Error500Page from "../Error500Page/Error500Page";

const InfoPage: FC = () => {
    const allBtns = useRef<HTMLDivElement>();
    const firstBtn = useRef<HTMLDivElement>();
    const secondBtn = useRef<HTMLDivElement>();
    const thirdBtn = useRef<HTMLDivElement>();
    const fourthBtn = useRef<HTMLDivElement>();
    const finaleBtn = useRef<HTMLDivElement>();

    const image = useRef<HTMLDivElement>();
    const infoTextLeft = useRef<HTMLDivElement>();
    const infoTextRight = useRef<HTMLDivElement>();
    const arrow = useRef<HTMLDivElement>();

    const firstLeft = useRef<HTMLDivElement>();
    const firstRight = useRef<HTMLDivElement>();

    const secondLeft = useRef<HTMLDivElement>();
    const secondRight = useRef<HTMLDivElement>();

    const thirdLeft = useRef<HTMLDivElement>();
    const thirdRight = useRef<HTMLDivElement>();

    const fourthLeft = useRef<HTMLDivElement>();
    const fourthRight = useRef<HTMLUListElement>();

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
        document.body.classList.add('scroll-hide');
        document.body.classList.add('disable');

        const timer = setTimeout(() => {
            document.body.classList.remove('disable');
        }, 2000);

        const onEntry = (entry) => {
            entry.forEach(change => {
                if (change.isIntersecting) {
                    if (change.target === infoTextLeft.current) {
                        firstBtn.current.classList.add('info-btn-active');
                        secondBtn.current.classList.remove('info-btn-active');
                        thirdBtn.current.classList.remove('info-btn-active');
                        fourthBtn.current.classList.remove('info-btn-active');
                        finaleBtn.current.classList.remove('info-btn-active');
                    }

                    if (change.target === firstLeft.current) {
                        firstBtn.current.classList.remove('info-btn-active');
                        secondBtn.current.classList.add('info-btn-active');
                        thirdBtn.current.classList.remove('info-btn-active');
                        fourthBtn.current.classList.remove('info-btn-active');
                        finaleBtn.current.classList.remove('info-btn-active');
                    }

                    if (change.target === secondLeft.current) {
                        firstBtn.current.classList.remove('info-btn-active');
                        secondBtn.current.classList.remove('info-btn-active');
                        thirdBtn.current.classList.add('info-btn-active');
                        fourthBtn.current.classList.remove('info-btn-active');
                        finaleBtn.current.classList.remove('info-btn-active');
                    }

                    if (change.target === thirdLeft.current) {
                        firstBtn.current.classList.remove('info-btn-active');
                        secondBtn.current.classList.remove('info-btn-active');
                        thirdBtn.current.classList.remove('info-btn-active');
                        fourthBtn.current.classList.add('info-btn-active');
                        finaleBtn.current.classList.remove('info-btn-active');
                    }

                    if (change.target === fourthLeft.current) {
                        firstBtn.current.classList.remove('info-btn-active');
                        secondBtn.current.classList.remove('info-btn-active');
                        thirdBtn.current.classList.remove('info-btn-active');
                        fourthBtn.current.classList.remove('info-btn-active');
                        finaleBtn.current.classList.add('info-btn-active');
                    }

                    change.target.classList.add('element-show');
                }
            });
        }

        const options = {
            threshold: [0.5]
        };

        let observer = new IntersectionObserver(onEntry, options);
        observer.observe(allBtns.current);

        observer.observe(image.current);
        observer.observe(infoTextLeft.current);
        observer.observe(infoTextRight.current);
        observer.observe(arrow.current);

        observer.observe(firstLeft.current);
        observer.observe(firstRight.current);

        observer.observe(secondLeft.current);
        observer.observe(secondRight.current);

        observer.observe(thirdLeft.current);
        observer.observe(thirdRight.current);

        observer.observe(fourthLeft.current);
        observer.observe(fourthRight.current);

        return () => {
            clearTimeout(timer);
            document.body.classList.remove('scroll-hide')
        }
    }, []);

    const navigation = (e) => {
        if (e.target === firstBtn.current) {
            window.scrollTo(0, 0);

            firstBtn.current.classList.add('info-btn-active');
            secondBtn.current.classList.remove('info-btn-active');
            thirdBtn.current.classList.remove('info-btn-active');
            fourthBtn.current.classList.remove('info-btn-active');
            finaleBtn.current.classList.remove('info-btn-active');
        }

        if (e.target === secondBtn.current) {
            window.scrollTo(0, window.innerHeight);

            firstBtn.current.classList.remove('info-btn-active');
            secondBtn.current.classList.add('info-btn-active');
            thirdBtn.current.classList.remove('info-btn-active');
            fourthBtn.current.classList.remove('info-btn-active');
            finaleBtn.current.classList.remove('info-btn-active');
        }

        if (e.target === thirdBtn.current) {
            window.scrollTo(0, window.innerHeight * 2);

            firstBtn.current.classList.remove('info-btn-active');
            secondBtn.current.classList.remove('info-btn-active');
            thirdBtn.current.classList.add('info-btn-active');
            fourthBtn.current.classList.remove('info-btn-active');
            finaleBtn.current.classList.remove('info-btn-active');
        }

        if (e.target === fourthBtn.current) {
            window.scrollTo(0, window.innerHeight * 3);

            firstBtn.current.classList.remove('info-btn-active');
            secondBtn.current.classList.remove('info-btn-active');
            thirdBtn.current.classList.remove('info-btn-active');
            fourthBtn.current.classList.add('info-btn-active');
            finaleBtn.current.classList.remove('info-btn-active');
        }

        if (e.target === finaleBtn.current) {
            window.scrollTo(0, window.innerHeight * 4);

            firstBtn.current.classList.remove('info-btn-active');
            secondBtn.current.classList.remove('info-btn-active');
            thirdBtn.current.classList.remove('info-btn-active');
            fourthBtn.current.classList.remove('info-btn-active');
            finaleBtn.current.classList.add('info-btn-active');
        }
    }

    const toNextPage = (e) => {
        e.preventDefault();

        nav('/reg')
    }

    return (
        !error500
        ?
        <>
            <div ref={allBtns} onClick={(e) => navigation(e)} className="scroll-btns">
                <div ref={firstBtn} className="info-btn info-btn-active"></div>
                <div ref={secondBtn} className="info-btn"></div>
                <div ref={thirdBtn} className="info-btn"></div>
                <div ref={fourthBtn} className="info-btn"></div>
                <div ref={finaleBtn} className="info-btn"></div>
            </div>
            <section className="info-back">
                <div ref={image} className='info-images-back'></div>
                <div ref={infoTextLeft} className="info-back-text">Добро пожаловать на </div>
                <span className='info-name' ref={infoTextRight}>My Aid Kit!</span>
                <div ref={arrow} className="arrow-down">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </section>
            <section className='first-container'>
                <div ref={firstLeft} className='first-left'></div>
                <div ref={firstRight} className="first-right">
                    Вноси сюда всю свою <span className='info-import'>домашнюю аптечку!</span> <br/> <br/> Так будет проще запоминать, что и в каком количестве у вас находится дома
                </div>
            </section>
            <section className='second-container'>
                <div ref={secondRight} className="second-left">
                    Устанавливай  <span className='info-import'>напоминание</span> на прием лекарств <br/> <br/> Указывай дозировки
                </div>
                <div ref={secondLeft} className='second-right'></div>
            </section>
            <section className='third-container'>
                <div ref={thirdLeft} className='third-right'></div>
                <div ref={thirdRight} className="third-left">
                    <span className='info-import'>Сфоткай</span> штрих-код лекарства для быстрого поиска <span className='info-import-second '> конкретного </span> лекарства в поиске ВСЕХ препаратов РФ
                </div>
            </section>
            <section className='fourth-container'>
                <div className='fourth-first'>
                    <div ref={fourthLeft} className='fourth-left'></div>
                    <ul ref={fourthRight} className="fourth-right">
                        <li> Добавляй лекарство <span className='info-import-second'>быстро</span></li>
                        <li className='info-ul-last-child'> <span className='info-import'>Семейный аккаунт</span> для внесения лекарст за ребенка </li>
                    </ul>
                </div>
                <section className='finale-container'>
                    <MyButton submit={toNextPage} size='desktop-log' width='70%' height='70px' fontSize='30px' margin='0 0 0 0'> Зарегистрируйся! </MyButton>
                    <MyButton submit={toNextPage}  size='small-desktop-log' width='70%' height='60px' fontSize='26px' margin='0 0 0 0'> Зарегистрируйся! </MyButton>
                    <MyButton submit={toNextPage}  size='ipad-log' width='70%' height='50px' fontSize='24px' margin='0 0 0 0'> Зарегистрируйся! </MyButton>
                    <MyButton submit={toNextPage} size='mobile-log' width='75%' height='45px' fontSize='20px' margin='0 0 0 0'> Зарегистрируйся! </MyButton>
                </section>
            </section>
        </>
            :
            <Error500Page/>
    );
};

export default InfoPage;