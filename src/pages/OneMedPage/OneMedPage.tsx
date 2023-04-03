import React, {FC, useEffect, useRef, useState} from 'react';
import './oneMedPage.scss'

import {arr} from "../../models/List/List";
import MyButton from "../../components/MyButton/MyButton";
import {regExp} from "../../components/InputForm/utils/regExp";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {loadingProfile} from "../../store/actions/userActions";
import Error500Page from "../Error500Page/Error500Page";
import {title} from "../../models/Title/Title";
import Loader from "../../components/Loader/Loader";

const OneMedPage: FC = () => {
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState(false);
    const [kol, setKol] = useState('');
    const [submitError, setSubmitError] = useState('');

    const refName = useRef<HTMLInputElement>();
    const refKol = useRef<HTMLDivElement>();
    const refKolInput = useRef<HTMLInputElement>();
    const refError = useRef<HTMLDivElement>();
    const refPopUp = useRef<HTMLDivElement>()
    const refPopUpBody = useRef<HTMLDivElement>();

    const nav = useNavigate();

    const {isAuth, isLoading} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const [error500, setError500] = useState(false);

    useEffect(() => {
        title.innerText = 'Лекарсво';

        if (!isAuth) {
            dispatch(loadingProfile())
                .then((res) => {
                    if (res === 401) {
                        nav('/login');
                    }

                    if (res === 500) {
                        setError500(true);
                    }
                });
        }

        const id = +/\d+/.exec(window.location.pathname);

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                setPhoto(arr[i].photo);
                setName(arr[i].med);
                setType(arr[i].type)
                setKol(arr[i].kol);

                break;
            }
        }

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, []);

    const changePhoto = (e) => {
        setPhoto(URL.createObjectURL(e.target.files[0]))
    }

    const changeName = (e) => {
        setName(e.target.value)

        if (refError.current.classList.length === 3) {
            refError.current.classList.remove('error-active-submit');
            refError.current.classList.remove('error-active');
        }


        if (refName.current.classList.length === 2) {
            refName.current.classList.remove('input-med-error');
            refError.current.classList.remove('error-active');
        }
    }

    const changeKol = (e) => {
        setKol(e.target.value)

        if (refError.current.classList.length === 3) {
            refError.current.classList.remove('error-active-submit');
            refError.current.classList.remove('error-active');
        }

        if (refKolInput.current.classList.length === 2) {
            refKolInput.current.classList.remove('input-med-error');
            refError.current.classList.remove('error-active');
        }
    }

    const submit = (e) => {
        e.preventDefault();

        if (name.length === 0) {
            setSubmitError('Введите название');
            refError.current.classList.add('error-active');
            refName.current.classList.add('input-med-error');

            return
        }

        if (name.match(/<script>/) !== null ||
            name.match(/<a/) !== null ||
            name.match(/<img/) !== null ||
            !(regExp.checkNameMed.test(name))) {
            setSubmitError('Введите настоящие название');
            refError.current.classList.add('error-active');
            refName.current.classList.add('input-med-error');

            return
        }

        if (type && kol.length === 0) {
            refError.current.classList.add('error-active');
            setSubmitError('Введите количество таблеток');
            refKolInput.current.classList.add('input-med-error');

            return;
        }

        if (type && (name.match(/<script>/) !== null ||
            name.match(/<a/) !== null ||
            name.match(/<img/) !== null ||
            !(regExp.checkKolMed.test(kol)))) {
            refError.current.classList.add('error-active');
            setSubmitError('Введите только число');
            refKolInput.current.classList.add('input-med-error');

            return;
        }

        setSubmitError('Информация изменена!');
        refError.current.classList.add('error-active');
        refError.current.classList.add('error-active-submit');
    }

    const openPopUp = (e) => {
        document.body.style.overflow = 'hidden';
        e.preventDefault();

        refPopUp.current.classList.add('popUp-container-active');
        refPopUpBody.current.classList.add('popUp-active');
    }

    const deleteMed = (e) => {
        e.preventDefault();
    }

    const closePopUp = (e) => {
        document.body.style.overflow = 'visible';
        e.preventDefault();

        refPopUp.current.classList.remove('popUp-container-active');
        refPopUpBody.current.classList.remove('popUp-active');
    }

    return (
        isLoading
            ?
            <Loader/>
            :
        !error500
            ?
            <div className='onemed-container'>
                <div className="addmed-h1">Редактируйте информацию о лекарстве</div>
                <form method='post' noValidate encType='multipart/form-data' className='addmed-form'>
                    <div className="photo-column">
                        <div className="photo-row">
                            <div className="photo-input-name"> Фото: </div>
                            <div className="photo-input onemed-photo-input">
                                <img alt='Фотография лекарства' className='med-photo addmed-photo' src={photo}/>
                                <input onChange={(e) => changePhoto(e)} className='photo-input-med' type='file' id='photo' accept='mage/png, image/jpg, image/webp'/>
                                <label className='med-photo-button addmed-btn' htmlFor='photo'> Редактировать фото </label>
                            </div>
                        </div>
                        <div className="name-row">
                            <div className="name-input-name">Название:</div>
                            <div className='name-input'>
                                <input ref={refName} onChange={(e) => changeName(e)} value={name} type='text' className='name-input-med' placeholder='Изменить название лекарства'/>
                            </div>
                        </div>
                        <div className="type-row">
                            <div className="type-input-name">Вид:</div>
                            <div className='type-input'>
                                <div className='type-input-label'>
                                    {
                                        type ?
                                            <label style={{marginBottom: '0'}} className="checkbox style-e">
                                                <input readOnly={true} checked={true} type="checkbox"/>
                                                <div className="checkbox__checkmark"></div>
                                                <div className="checkbox__body">Таблетки</div>
                                            </label>
                                            :
                                            <label style={{marginBottom: '0'}} className="checkbox style-e">
                                                <input readOnly={true} checked={true} type="checkbox"/>
                                                <div className="checkbox__checkmark"></div>
                                                <div className="checkbox__body">Любой другой тип</div>
                                            </label>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            type &&
                            <div ref={refKol} className="rem-row">
                                <div className="rem-input-name">Остаток:</div>
                                <div className='name-input'>
                                    <input ref={refKolInput} onChange={(e) => changeKol(e)} value={kol} type='text' className='name-input-med' placeholder='Изменить количество таблеток'/>
                                </div>
                            </div>
                        }

                        <div ref={refError} className='error'> {submitError} </div>
                        <MyButton size='desktop-log' submit={submit}  width='70%' height='50px' fontSize='25px' margin='0 0 0 0'> Сохранить </MyButton>
                        <MyButton size='small-desktop-log' submit={submit}  width='70%' height='45px' fontSize='22px' margin='0 0 0 0'> Сохранить </MyButton>
                        <MyButton size='ipad-log' submit={submit}  width='70%' height='40px' fontSize='20px' margin='0 0 0 0'> Сохранить </MyButton>
                        <MyButton size='mobile-log' submit={submit}  width='70%' height='38px' fontSize='18px' margin='0 0 0 0'> Сохранить </MyButton>

                        <button className='delete-btn' onClick={openPopUp}> Удалить </button>
                    </div>
                </form>
                <div ref={refPopUp} className='popUp-container'>
                    <div ref={refPopUpBody} className='popUp'>
                        <div className='attention'>Вы уверены, что хотите удалить это лекарство?</div>
                        <div className='attention-under'>В этом случае вы не сможете его вернуть <br/> А также удалятся все уведомления, связанные с этим лекарством</div>
                        <div className='popup-btns'>
                            <button className='delete-btn-popup' onClick={deleteMed}> Удалить </button>
                            <button className='cancel-btn-popup' onClick={closePopUp}> Отмена </button>
                        </div>
                    </div>
                </div>
            </div>
            :
            <Error500Page/>
    );
};

export default OneMedPage;