import React, {FC, useEffect, useRef, useState} from 'react';
import './addMedPage.scss'
import MyButton from "../../components/MyButton/MyButton";
import {regExp} from "../../components/InputForm/utils/regExp";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {addPersonFamily, loadingProfile} from "../../store/actions/userActions";
import Error500Page from "../Error500Page/Error500Page";
import {title} from "../../models/Title/Title";
import Loader from "../../components/Loader/Loader";
import {addOneMed, getListMed} from "../../store/actions/medActions";
import MiniLoader from "../../components/MiniLoader/MiniLoader";

const AddMedPage: FC = () => {
    const [photo, setPhoto] = useState('/styles/medPhoto.webp');
    const [name, setName] = useState('');
    const [checkFirst, setCheckFirst] = useState(false);
    const [checkSecond, setCheckSecond] = useState(false);
    const [kol, setKol] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [avatar, setAvatar] = useState('');

    const refName = useRef<HTMLInputElement>();
    const refCheckFirst = useRef<HTMLInputElement>();
    const refCheckSecond = useRef<HTMLInputElement>();
    const refKol = useRef<HTMLDivElement>();
    const refKolInput = useRef<HTMLInputElement>();
    const refError = useRef<HTMLDivElement>();

    const changePhoto = (e) => {
        setPhoto(URL.createObjectURL(e.target.files[0]));
        setAvatar(e.target.files[0]);
    }

    const changeName = (e) => {
        setName(e.target.value);

        if (refError.current.classList.length === 3) {
            refError.current.classList.remove('error-active-submit');
            refError.current.classList.remove('error-active');
        }


        if (refName.current.classList.length === 2) {
            refName.current.classList.remove('input-med-error');
            refError.current.classList.remove('error-active');
        }
    }

    const changeFirstCheck = (e) => {
        setCheckFirst(e.target.checked);

        if (refError.current.classList.length === 3) {
            refError.current.classList.remove('error-active-submit');
            refError.current.classList.remove('error-active');
        }

        if (refError.current.classList.length === 2) {
            refError.current.classList.remove('error-active');
            refCheckFirst.current.classList.remove('checkbox-error');
            refCheckSecond.current.classList.remove('checkbox-error');
        }

        if (!checkFirst) {
            refKol.current.classList.remove('rem-row-hidden');
        } else {
            refKol.current.classList.add('rem-row-hidden');
        }
    }

    const changeSecondCheck = (e) => {
        setCheckSecond(e.target.checked)

        if (refError.current.classList.length === 3) {
            refError.current.classList.remove('error-active-submit');
            refError.current.classList.remove('error-active');
        }

        if (refError.current.classList.length === 2) {
            refError.current.classList.remove('error-active');
            refCheckSecond.current.classList.remove('checkbox-error');
            refCheckFirst.current.classList.remove('checkbox-error');
        }
    }

    const changeKol = (e) => {
        setKol(e.target.value);

        if (refError.current.classList.length === 3) {
            refError.current.classList.remove('error-active-submit');
            refError.current.classList.remove('error-active');
        }

        if (refKolInput.current.classList.length === 2) {
            refKolInput.current.classList.remove('input-med-error');
            refError.current.classList.remove('error-active');
        }
    }

    const submit = async (e) => {
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

        if (!checkFirst && !checkSecond) {
            refError.current.classList.add('error-active');
            setSubmitError('Выберите тип лекарства');
            refCheckFirst.current.classList.add('checkbox-error');
            refCheckSecond.current.classList.add('checkbox-error');

            return;
        }

        if (checkFirst && checkSecond) {
            refError.current.classList.add('error-active');
            setSubmitError('Выберите только один тип');
            refCheckFirst.current.classList.add('checkbox-error');
            refCheckSecond.current.classList.add('checkbox-error');

            return;
        }

        if (checkFirst && kol.length === 0) {
            refError.current.classList.add('error-active');
            setSubmitError('Введите количество таблеток');
            refKolInput.current.classList.add('input-med-error');

            return;
        }

        if (checkFirst && Number(kol) <= 0) {
            refError.current.classList.add('error-active');
            setSubmitError('Введите количество таблеток');
            refKolInput.current.classList.add('input-med-error');

            return;
        }

        if (checkFirst && (name.match(/<script>/) !== null ||
            name.match(/<a/) !== null ||
            name.match(/<img/) !== null ||
            !(regExp.checkKolMed.test(kol)))) {
            refError.current.classList.add('error-active');
            setSubmitError('Введите только число');
            refKolInput.current.classList.add('input-med-error');

            return;
        }

        let formData = new FormData();

        if (avatar !== '') {
            formData.append('file', avatar);
        }

        formData.append('name', name);

        if (checkFirst) {
            formData.append('is_tablets', true.toString());
            formData.append('count', kol);
        }

        if (checkSecond) {
            formData.append('is_tablets', false.toString());
            formData.append('count', '0');
        }

        const res = await dispatch(addOneMed(formData));

        if (!res) {
            refError.current.classList.add('error-active');
            setSubmitError('Упс... Попробуйте позже');

            return;
        }

        if (res === 400) {
            refError.current.classList.add('error-active');
            setSubmitError('Поддерживается только jpg и png');

            return;
        }

        nav('/list');
    }

    const nav = useNavigate();

    const {isAuth, isLoading} = useAppSelector(state => state.auth);
    const {medList} = useAppSelector(state => state.med);
    const dispatch = useAppDispatch();

    const [error500, setError500] = useState(false);

    useEffect(() => {
        title.innerText = 'Добавление лекарства';

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

        if (medList.length === 0) {
            dispatch(getListMed());
        }

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, [])

    return (
        !error500
            ?
            <>
                <div className="addmed-container">
                    <div className="addmed-h1">Добавляйте ваши лекарства в список</div>
                    <div className='add-photo-med-first'> Загрузите фотографию лекарства для более наглядного восприятия списка</div>
                    <form method='post' action='/addmed' noValidate encType='multipart/form-data' className='addmed-form'>
                        <div className="photo-row">
                            <div className="photo-input-name"> Фото: </div>
                            <div className="photo-input addmed-input">
                                <img alt='Фотография лекарства' className='med-photo addmed-photo' src={photo}/>
                                <input onChange={(e) => changePhoto(e)} className='photo-input-med' type='file' id='photo' accept='mage/png, image/jpg, image/webp'/>
                                <label className='med-photo-button addmed-btn' htmlFor='photo'> Загрузить фото </label>
                            </div>
                        </div>
                        <div className="name-row">
                            <div className="name-input-name">Название:</div>
                            <div className='name-input'>
                                <input ref={refName} onChange={(e) => changeName(e)} value={name} type='text' className='name-input-med' placeholder='Название лекарства'/>
                            </div>
                        </div>
                        <div className="type-row">
                            <div className="type-input-name">Вид:</div>
                            <div className='type-input'>
                                <div className='type-input-label'>
                                    <label className="checkbox style-e">
                                        <input onChange={(e) => changeFirstCheck(e)} checked={checkFirst} type="checkbox"/>
                                        <div ref={refCheckFirst} className="checkbox__checkmark"></div>
                                        <div className="checkbox__body">Таблетки</div>
                                    </label>
                                    <label className="checkbox style-e">
                                        <input onChange={(e) => changeSecondCheck(e)} checked={checkSecond} type="checkbox"/>
                                        <div ref={refCheckSecond} className="checkbox__checkmark"></div>
                                        <div className="checkbox__body">Любой другой тип</div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div ref={refKol} className="rem-row rem-row-hidden">
                            <div className="rem-input-name">Остаток:</div>
                            <div className='name-input'>
                                <input ref={refKolInput} onChange={(e) => changeKol(e)} value={kol} type='text' className='name-input-med' placeholder='Осталось таблеток'/>
                            </div>
                        </div>
                        <div ref={refError} className='error'> {submitError} </div>
                        <MyButton size='desktop-log' submit={submit}  width='70%' height='50px' fontSize='25px' margin='0 0 0 0'> {
                            isLoading
                                ?
                                <MiniLoader/>
                                :
                                'Добавить'
                        } </MyButton>
                        <MyButton size='small-desktop-log' submit={submit}  width='70%' height='45px' fontSize='22px' margin='0 0 0 0'> {
                            isLoading
                                ?
                                <MiniLoader/>
                                :
                                'Добавить'
                        } </MyButton>
                        <MyButton size='ipad-log' submit={submit}  width='70%' height='40px' fontSize='20px' margin='0 0 0 0'> {
                            isLoading
                                ?
                                <MiniLoader/>
                                :
                                'Добавить'
                        } </MyButton>
                        <MyButton size='mobile-log' submit={submit}  width='70%' height='38px' fontSize='18px' margin='0 0 0 0'> {
                            isLoading
                                ?
                                <MiniLoader/>
                                :
                                'Добавить'
                        } </MyButton>
                    </form>
                </div>
            </>
            :
            <Error500Page/>
    );
};

export default AddMedPage;