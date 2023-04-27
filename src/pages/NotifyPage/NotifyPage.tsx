import React, {FC, useEffect, useRef, useState} from 'react';
import './notifyPage.scss'
import ListElement from "../../components/ListElement/ListElement";
import MyButton from "../../components/MyButton/MyButton";
import {regExp} from "../../components/InputForm/utils/regExp";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {loadingProfile} from "../../store/actions/userActions";
import Error500Page from "../Error500Page/Error500Page";
import {title} from "../../models/Title/Title";
import Loader from "../../components/Loader/Loader";
import {getListMed} from "../../store/actions/medActions";
import {OneMed} from "../../store/reducers/medReducer/types";
import {addNotify} from "../../store/actions/notifyActions";
import MiniLoader from "../../components/MiniLoader/MiniLoader";

const NotifyPage: FC = () => {
    const refUl = useRef<HTMLUListElement>();
    const refHeadList = useRef<HTMLDivElement>();
    const refArrow = useRef<SVGSVGElement>();
    const refTimeRep = useRef<HTMLDivElement>();
    const refProfileList = useRef<HTMLDivElement>();
    const refArrowProfile = useRef<SVGSVGElement>();
    const refUlProfile = useRef<HTMLUListElement>();
    const refError = useRef<HTMLDivElement>()
    const refFirstTime = useRef<HTMLInputElement>()
    const refRepInput = useRef<HTMLInputElement>()
    const refDuring = useRef<HTMLInputElement>()
    const refRepTime1 = useRef<HTMLInputElement>()
    const refRepTime2 = useRef<HTMLInputElement>()
    const refRepTime3 = useRef<HTMLInputElement>()
    const refRepTime4 = useRef<HTMLInputElement>()
    const refRepTime5 = useRef<HTMLInputElement>()

    const [prevList, setPrevList] = useState(null);
    const [medNotList, setMedNotList] = useState('Список лекарств');
    const [idMed, setIdMed] = useState(0);
    const [idProf, setIdProf] = useState(0);
    const [checkUser, setCheckUser] = useState(false);
    const [firstTime, setFirstTime] = useState('00:00');
    const [kolRep, setKolRep] = useState('');
    const [repTime1, setRepTime1] = useState('00:00');
    const [repTime2, setRepTime2] = useState('00:00');
    const [repTime3, setRepTime3] = useState('00:00');
    const [repTime4, setRepTime4] = useState('00:00');
    const [repTime5, setRepTime5] = useState('00:00');
    const [during, setDuring] = useState('');
    const [prevProfile, setPrevProfile] = useState(null);
    const [profileList, setProfileList] = useState('Члены семьи');
    const [submitError, setSubmitError] = useState('');
    const [search, setSearch] = useState('');
    const [tempArr, setTempArr] = useState<Array<OneMed>>([]);

    const nav = useNavigate();

    const {isAuth, isLoading} = useAppSelector(state => state.auth);
    const {medList} = useAppSelector(state => state.med);
    const {photo, name,adult, listFamily, id} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const [error500, setError500] = useState(false);

    useEffect(() => {
        title.innerText = 'Уведомление'

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

        if (medList.length === 0){
            dispatch(getListMed())
        }

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, [])

    useEffect(() => {
        setTempArr(medList);
    }, [medList])

    const openUl = () => {
        if (refHeadList.current.classList[1] === 'head-of-list-error') {
            refError.current.classList.remove('error-active');
        }

        if (refUl.current.classList.length === 2) {
            refHeadList.current.classList.add('head-of-list-active');
            refHeadList.current.classList.remove('head-of-list-error')
            refUl.current.classList.remove('header-list-hidden');
            refArrow.current.classList.add('list-arrow-active');

            return
        }

        if (refUl.current.classList.length === 1) {
            refHeadList.current.classList.remove('head-of-list-active')
            refUl.current.classList.add('header-list-hidden');
            refArrow.current.classList.remove('list-arrow-active');

            return
        }
    }

    const selectMedList = (e, id) => {
        setIdMed(id)
        refHeadList.current.classList.remove('head-of-list-active')
        refUl.current.classList.add('header-list-hidden');
        refArrow.current.classList.remove('list-arrow-active');

        if (e.target.classList[0] === 'list-element') {
            e.target.classList.add('list-element-select');
            setMedNotList(e.target.textContent)
            setPrevList(e.target)
        } else {
            e.target.parentElement.classList.add('list-element-select');
            setMedNotList(e.target.textContent)
            setPrevList(e.target.parentElement);
        }

        if (e.target.classList[0] === 'elem-photo') {
            setMedNotList(e.target.nextSibling.textContent);
            prevList.classList.remove('list-element-select');
        } else {
            prevList.classList.remove('list-element-select');
            setMedNotList(e.target.textContent)
        }
    }

    const selectFirstTime = (e) => {
        setFirstTime(e.target.value);

        if (refFirstTime.current.classList.length === 2) {
            refError.current.classList.remove('error-active');
            refFirstTime.current.classList.remove('input-med-error');
        }
    }

    const selectKolRep = (e) => {
        if (Number(e.target.value) > 5) {
            return;
        }

        setKolRep(e.target.value);

        if (refRepInput.current.classList.length === 2) {
            refError.current.classList.remove('error-active');
            refRepInput.current.classList.remove('input-med-error');
        }

        if (Number(e.target.value) > 0) {
            refTimeRep.current.classList.remove('not-med-row-hidden');

            return
        }

        if (Number(e.target.value) === 0) {
            refTimeRep.current.classList.add('not-med-row-hidden');
        }
    }

    const selectRepTime1 = (e) => {
        setRepTime1(e.target.value)

        if (refRepTime1.current.classList.length === 3) {
            refError.current.classList.remove('error-active');
            refRepTime1.current.classList.remove('input-med-error');
        }
    }

    const selectRepTime2 = (e) => {
        setRepTime2(e.target.value)

        if (refRepTime2.current.classList.length === 3) {
            refError.current.classList.remove('error-active');
            refRepTime2.current.classList.remove('input-med-error');
        }
    }

    const selectRepTime3 = (e) => {
        setRepTime3(e.target.value)

        if (refRepTime3.current.classList.length === 3) {
            refError.current.classList.remove('error-active');
            refRepTime3.current.classList.remove('input-med-error');
        }
    }

    const selectRepTime4 = (e) => {
        setRepTime4(e.target.value)

        if (refRepTime4.current.classList.length === 3) {
            refError.current.classList.remove('error-active');
            refRepTime4.current.classList.remove('input-med-error');
        }
    }

    const selectRepTime5 = (e) => {
        setRepTime5(e.target.value)

        if (refRepTime5.current.classList.length === 3) {
            refError.current.classList.remove('error-active');
            refRepTime5.current.classList.remove('input-med-error');
        }
    }
    const selectDuring = (e) => {
        setDuring(e.target.value)

        if (refDuring.current.classList.length === 2) {
            refError.current.classList.remove('error-active');
            refDuring.current.classList.remove('input-med-error');
        }
    }

    const openUlProfile = () => {
        if (refProfileList.current.classList[1] === 'head-of-list-error') {
            refError.current.classList.remove('error-active');
        }

        if (refUlProfile.current.classList.length === 2) {
            refProfileList.current.classList.add('head-of-list-active');
            refProfileList.current.classList.remove('head-of-list-error')
            refUlProfile.current.classList.remove('header-list-hidden');
            refArrowProfile.current.classList.add('list-arrow-active');

            return
        }

        if (refUlProfile.current.classList.length === 1) {
            refProfileList.current.classList.remove('head-of-list-active')
            refUlProfile.current.classList.add('header-list-hidden');
            refArrowProfile.current.classList.remove('list-arrow-active');

            return
        }
    }

    const selectProfileList = (e, id, user) => {
        setIdProf(id)
        setCheckUser(user)

        refProfileList.current.classList.remove('head-of-list-active')
        refUlProfile.current.classList.add('header-list-hidden');
        refArrowProfile.current.classList.remove('list-arrow-active');

        if (e.target.classList[0] === 'list-element') {
            e.target.classList.add('list-element-select');
            setProfileList(e.target.textContent)
            setPrevProfile(e.target)
        } else {
            e.target.parentElement.classList.add('list-element-select');
            setProfileList(e.target.textContent)
            setPrevProfile(e.target.parentElement);
        }

        if (e.target.classList[0] === 'elem-photo') {
            setProfileList(e.target.nextSibling.textContent);
            prevProfile.classList.remove('list-element-select');
        } else {
            prevProfile.classList.remove('list-element-select');
            setProfileList(e.target.textContent)
        }
    }

    const submit = async (e) => {
        e.preventDefault();

        if (medNotList === 'Список лекарств') {
            setSubmitError('Выберите лекарство из списка');
            refHeadList.current.classList.add('head-of-list-error')
            refError.current.classList.add('error-active');

            return;
        }

        if (profileList === 'Члены семьи') {
            setSubmitError('Выберите члена семьи из списка');
            refProfileList.current.classList.add('head-of-list-error')
            refError.current.classList.add('error-active');

            return;
        }

        if (firstTime === '00:00') {
            setSubmitError('Введите первое время');
            refFirstTime.current.classList.add('input-med-error');
            refError.current.classList.add('error-active');

            return;
        }

        if (firstTime.toString().slice(3) !== '00') {
            setSubmitError('Только круглое время');
            refFirstTime.current.classList.add('input-med-error');
            refError.current.classList.add('error-active');

            return;
        }

        if (kolRep === '') {
            setSubmitError('Введите количество повторение');
            refRepInput.current.classList.add('input-med-error');
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) < 0 || Number(kolRep) > 5) {
            setSubmitError('Допускаются значение от 0 до 5');
            refRepInput.current.classList.add('input-med-error');
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) === 1 && repTime1 === '') {
            setSubmitError('Введите время повторений приема');
            refRepTime1.current.classList.add('input-med-error');
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) === 1 && repTime1.toString().slice(3) !== '00') {
            setSubmitError('Только круглое время');
            refRepTime1.current.classList.add('input-med-error');
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) === 2 && (repTime1 === '' || repTime2 === '')) {
            setSubmitError('Введите время повторений приема');
            if (repTime1 === '') {
                refRepTime1.current.classList.add('input-med-error');
            }
            if (repTime2 === '') {
                refRepTime2.current.classList.add('input-med-error');
            }
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) === 2 && (repTime1.toString().slice(3) !== '00' || repTime2.toString().slice(3) !== '00')) {
            setSubmitError('Только круглое время');
            if (repTime1.toString().slice(3) !== '00') {
                refRepTime1.current.classList.add('input-med-error');
            }
            if ( repTime2.toString().slice(3) !== '00') {
                refRepTime2.current.classList.add('input-med-error');
            }
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) === 3 && (repTime1 === '' || repTime2 === '' || repTime3 === '')) {
            setSubmitError('Введите время повторений приема');
            if (repTime1 === '') {
                refRepTime1.current.classList.add('input-med-error');
            }
            if (repTime2 === '') {
                refRepTime2.current.classList.add('input-med-error');
            }
            if (repTime3 === '') {
                refRepTime3.current.classList.add('input-med-error');
            }
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) === 3 && (repTime1.toString().slice(3) !== '00' || repTime2.toString().slice(3) !== '00' || repTime3.toString().slice(3) !== '00')) {
            setSubmitError('Только круглое время');
            if (repTime1.toString().slice(3) !== '00') {
                refRepTime1.current.classList.add('input-med-error');
            }
            if ( repTime2.toString().slice(3) !== '00') {
                refRepTime2.current.classList.add('input-med-error');
            }
            if ( repTime3.toString().slice(3) !== '00') {
                refRepTime3.current.classList.add('input-med-error');
            }
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) === 4 && (repTime1 === '' || repTime2 === '' || repTime3 === '' || repTime4 === '')) {
            setSubmitError('Введите время повторений приема');
            if (repTime1 === '') {
                refRepTime1.current.classList.add('input-med-error');
            }
            if (repTime2 === '') {
                refRepTime2.current.classList.add('input-med-error');
            }
            if (repTime3 === '') {
                refRepTime3.current.classList.add('input-med-error');
            }
            if (repTime4 === '') {
                refRepTime4.current.classList.add('input-med-error');
            }
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) === 4 && (repTime1.toString().slice(3) !== '00' || repTime2.toString().slice(3) !== '00' || repTime3.toString().slice(3) !== '00' ||  repTime4.toString().slice(3) !== '00')) {
            setSubmitError('Только круглое время');
            if (repTime1.toString().slice(3) !== '00') {
                refRepTime1.current.classList.add('input-med-error');
            }
            if ( repTime2.toString().slice(3) !== '00') {
                refRepTime2.current.classList.add('input-med-error');
            }
            if ( repTime3.toString().slice(3) !== '00') {
                refRepTime3.current.classList.add('input-med-error');
            }
            if ( repTime4.toString().slice(3) !== '00') {
                refRepTime4.current.classList.add('input-med-error');
            }
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) === 5 && (repTime1 === '' || repTime2 === '' || repTime3 === '' || repTime4 === '' || repTime5 === '')) {
            setSubmitError('Введите время повторений приема');
            if (repTime1 === '') {
                refRepTime1.current.classList.add('input-med-error');
            }
            if (repTime2 === '') {
                refRepTime2.current.classList.add('input-med-error');
            }
            if (repTime3 === '') {
                refRepTime3.current.classList.add('input-med-error');
            }
            if (repTime4 === '') {
                refRepTime4.current.classList.add('input-med-error');
            }
            if (repTime5 === '') {
                refRepTime5.current.classList.add('input-med-error');
            }
            refError.current.classList.add('error-active');

            return;
        }

        if (Number(kolRep) === 5 && (repTime1.toString().slice(3) !== '00' || repTime2.toString().slice(3) !== '00' || repTime3.toString().slice(3) !== '00' ||  repTime4.toString().slice(3) !== '00' || repTime5.toString().slice(3) !== '00')) {
            setSubmitError('Только круглое время');
            if (repTime1.toString().slice(3) !== '00') {
                refRepTime1.current.classList.add('input-med-error');
            }
            if ( repTime2.toString().slice(3) !== '00') {
                refRepTime2.current.classList.add('input-med-error');
            }
            if ( repTime3.toString().slice(3) !== '00') {
                refRepTime3.current.classList.add('input-med-error');
            }
            if ( repTime4.toString().slice(3) !== '00') {
                refRepTime4.current.classList.add('input-med-error');
            }
            if ( repTime5.toString().slice(3) !== '00') {
                refRepTime5.current.classList.add('input-med-error');
            }
            refError.current.classList.add('error-active');

            return;
        }

        if (during === '') {
            setSubmitError('Введите количество дней в курсе лечения');
            refDuring.current.classList.add('input-med-error');
            refError.current.classList.add('error-active');

            return;
        }

        if (during.match(/<script>/) !== null ||
            during.match(/<a/) !== null ||
            during.match(/<img/) !== null ||
            !(regExp.checkKolMed.test(during))) {
            setSubmitError('Только число');
            refDuring.current.classList.add('input-med-error');
            refError.current.classList.add('error-active');

            return;
        }

        const x = new Date();
        const currentTimeZoneOffsetInHours = -x.getTimezoneOffset() / 60;
        let nameProf = profileList.split(' ')[0];

        const res = await dispatch(addNotify({
            name_medicine: medNotList,
            id_medicine: idMed,
            to_is_user: checkUser,
            id_to_user: idProf,
            name_to: nameProf,
            time: firstTime,
            time_zone: currentTimeZoneOffsetInHours,
            count_days: Number(during),
        }))

        if (Number(kolRep) === 0) {
            nav('/');
        }

        if (Number(kolRep) === 1) {
            const res = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime1,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            nav('/')

            return;
        }

        if (Number(kolRep) === 2) {
            const res1 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime2,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            const res2 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime1,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            nav('/')

            return;
        }

        if (Number(kolRep) === 3) {
            const res1 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime3,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            const res2 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime2,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            const res3 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime1,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            nav('/')

            return;
        }

        if (Number(kolRep) === 4) {
            const res = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime4,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            const res1 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime3,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            const res2 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime2,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            const res3 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime1,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            nav('/')

            return;
        }

        if (Number(kolRep) === 5) {
            const res = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime5,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            const res1 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime3,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            const res2 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime2,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            const res3 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime1,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            const res4 = await dispatch(addNotify({
                name_medicine: medNotList,
                id_medicine: idMed,
                to_is_user: checkUser,
                id_to_user: idProf,
                name_to: nameProf,
                time: repTime4,
                time_zone: currentTimeZoneOffsetInHours,
                count_days: Number(during),
            }))

            nav('/')

            return;
        }
    }

    const searchMed = (e) => {
        const value = e.target.value
        setSearch(value);

        if (value === '') {
            setTempArr(medList);

            return
        }

        const searchArr = tempArr.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));

        setTempArr(searchArr)
    }

    return (
        isLoading
            ?
            <Loader/>
            :
        !error500
            ?
            <div className='notify-container'>
                <div className="addmed-h1">Добавляйте напоминания на прием</div>
                <div className='add-photo-med-first'> Поставить время можно только на xx:00 </div>
                <form method='post' noValidate encType='application/json' className='notify-form'>
                    <div className="not-med-row">
                        <div className="not-med-row__first">
                            Выберете лекарство:
                        </div>
                        <div className="not-med-row__second">
                            <div ref={refHeadList} onClick={openUl} className='head-of-list'>
                                {medNotList}
                                <svg ref={refArrow} className='list-arrow' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#000000"
                                          d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
                                </svg>
                            </div>
                            <ul style={{zIndex: '14'}} ref={refUl} className='header-list header-list-hidden'>
                                <input onChange={(e) => searchMed(e)} value={search} className='search-list-med' type='text' placeholder='Поиск в списке' />
                                {
                                    tempArr.length === 0
                                        ? <div className='list-element'><span className='not-found-list'>Ничего не найдено</span></div>
                                        :
                                        <>
                                            {
                                                tempArr.map((item) => {
                                                    return <ListElement selectMed={selectMedList} key={item.id} medId={item.id} photo={item.image} name={item.name}/>
                                                })
                                            }
                                        </>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="not-med-row">
                        <div className="not-med-row__first">
                            Для кого напоминание:
                        </div>
                        <div className="not-med-row__second">
                            <div ref={refProfileList} onClick={openUlProfile} className='head-of-list'>
                                {profileList}
                                <svg ref={refArrowProfile} className='list-arrow' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#000000"
                                          d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
                                </svg>
                            </div>
                            <ul ref={refUlProfile} className='header-list header-list-hidden'>
                                {
                                    adult === false
                                    ?
                                        <ListElement photo={photo} name={name} selectProf={selectProfileList}/>
                                    :
                                        <>
                                            {
                                                listFamily.length !== 0
                                                    ?
                                                    listFamily.map((item, index) => {
                                                        return <ListElement familyId={item.id} user={item.user} selectProf={selectProfileList} key={index} photo={item.avatar} name={item.name}/>
                                                    })
                                                    :
                                                    <ListElement familyId={id} user={true} photo={photo} name={name} selectProf={selectProfileList}/>
                                            }
                                        </>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="not-med-row">
                        <div className="not-med-row__first">
                            Первое время приема в дне:
                        </div>
                        <div className="not-med-row__second">
                            <input ref={refFirstTime} className='nod-med-input' value={firstTime} onChange={selectFirstTime} type='time'/>
                        </div>
                    </div>
                    <div className="not-med-row">
                        <div className="not-med-row__first">
                            Кол-во повторений в дне:
                        </div>
                        <div className="not-med-row__second">
                            <input ref={refRepInput} className='nod-med-input' value={kolRep} placeholder='Число от 0 до 5' onChange={selectKolRep} type='text'/>
                        </div>
                    </div>
                    <div ref={refTimeRep} className="not-med-row not-med-row-hidden">
                        <div className="not-med-row__first">
                            Время повторений:
                        </div>
                        <div className="not-med-row__second">
                            {
                                Number(kolRep) === 1 &&
                                <input ref={refRepTime1} className='nod-med-input rep-time' value={repTime1} onChange={selectRepTime1} type='time'/>
                            }
                            {
                                Number(kolRep) === 2 &&
                                <>
                                    <input ref={refRepTime1} className='nod-med-input rep-time' value={repTime1} onChange={selectRepTime1} type='time'/>
                                    <input ref={refRepTime2} className='nod-med-input rep-time' value={repTime2} onChange={selectRepTime2} type='time'/>
                                </>
                            }
                            {
                                Number(kolRep) === 3 &&
                                <>
                                    <input ref={refRepTime1} className='nod-med-input rep-time' value={repTime1} onChange={selectRepTime1} type='time'/>
                                    <input ref={refRepTime2} className='nod-med-input rep-time' value={repTime2} onChange={selectRepTime2} type='time'/>
                                    <input ref={refRepTime3} className='nod-med-input rep-time' value={repTime3} onChange={selectRepTime3} type='time'/>
                                </>
                            }
                            {
                                Number(kolRep) === 4 &&
                                <>
                                    <input ref={refRepTime1} className='nod-med-input rep-time' value={repTime1} onChange={selectRepTime1} type='time'/>
                                    <input ref={refRepTime2} className='nod-med-input rep-time' value={repTime2} onChange={selectRepTime2} type='time'/>
                                    <input ref={refRepTime3} className='nod-med-input rep-time' value={repTime3} onChange={selectRepTime3} type='time'/>
                                    <input ref={refRepTime4} className='nod-med-input rep-time' value={repTime4} onChange={selectRepTime4} type='time'/>
                                </>
                            }
                            {
                                Number(kolRep) === 5 &&
                                <>
                                    <input ref={refRepTime1} className='nod-med-input rep-time' value={repTime1} onChange={selectRepTime1} type='time'/>
                                    <input ref={refRepTime2} className='nod-med-input rep-time' value={repTime2} onChange={selectRepTime2} type='time'/>
                                    <input ref={refRepTime3} className='nod-med-input rep-time' value={repTime3} onChange={selectRepTime3} type='time'/>
                                    <input ref={refRepTime4} className='nod-med-input rep-time' value={repTime4} onChange={selectRepTime4} type='time'/>
                                    <input ref={refRepTime5} className='nod-med-input rep-time' value={repTime5} onChange={selectRepTime5} type='time'/>
                                </>
                            }
                        </div>
                    </div>
                    <div className="not-med-row">
                        <div className="not-med-row__first">
                            Длительность курса:
                        </div>
                        <div className="not-med-row__second">
                            <input ref={refDuring} className='nod-med-input' value={during} placeholder='Любое число' onChange={selectDuring} type='text'/>
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
                    <MyButton size='ipad-log' submit={submit}  width='70%' height='40px' fontSize='18px' margin='0 0 0 0'> {
                        isLoading
                            ?
                            <MiniLoader/>
                            :
                            'Добавить'
                    } </MyButton>
                    <MyButton size='mobile-log' submit={submit}  width='70%' height='38px' fontSize='17px' margin='0 0 0 0'> {
                        isLoading
                            ?
                            <MiniLoader/>
                            :
                            'Добавить'
                    } </MyButton>
                </form>
            </div>
            :
            <Error500Page/>
    );
};

export default NotifyPage;