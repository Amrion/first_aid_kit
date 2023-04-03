import React, {FC, useEffect, useRef, useState} from 'react';
import './notifyPage.scss'
import {arr, IMedicine} from "../../models/List/List";
import ListElement from "../../components/ListElement/ListElement";
import MyButton from "../../components/MyButton/MyButton";
import {regExp} from "../../components/InputForm/utils/regExp";
import {family} from "../../models/Family/Family";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {loadingProfile} from "../../store/actions/userActions";
import Error500Page from "../Error500Page/Error500Page";
import {title} from "../../models/Title/Title";

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
    const [medList, setMedList] = useState('Список лекарств');
    const [firstTime, setFirstTime] = useState('');
    const [kolRep, setKolRep] = useState('');
    const [repTime1, setRepTime1] = useState('');
    const [repTime2, setRepTime2] = useState('');
    const [repTime3, setRepTime3] = useState('');
    const [repTime4, setRepTime4] = useState('');
    const [repTime5, setRepTime5] = useState('');
    const [during, setDuring] = useState('');
    const [prevProfile, setPrevProfile] = useState(null);
    const [profileList, setProfileList] = useState('Члены семьи');
    const [submitError, setSubmitError] = useState('');
    const [search, setSearch] = useState('');
    const [tempArr, setTempArr] = useState<Array<IMedicine>>([]);

    const nav = useNavigate();

    const {isAuth} = useAppSelector(state => state.auth);
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

        setTempArr(arr);

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, [])

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

    const selectMedList = (e) => {
        refHeadList.current.classList.remove('head-of-list-active')
        refUl.current.classList.add('header-list-hidden');
        refArrow.current.classList.remove('list-arrow-active');

        if (e.target.classList[0] === 'list-element') {
            e.target.classList.add('list-element-select');
            setMedList(e.target.textContent)
            setPrevList(e.target)
        } else {
            e.target.parentElement.classList.add('list-element-select');
            setMedList(e.target.textContent)
            setPrevList(e.target.parentElement);
        }

        if (e.target.classList[0] === 'elem-photo') {
            setMedList(e.target.nextSibling.textContent);
            prevList.classList.remove('list-element-select');
        } else {
            prevList.classList.remove('list-element-select');
            setMedList(e.target.textContent)
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

    const selectProfileList = (e) => {
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

    const submit = (e) => {
        e.preventDefault();

        if (medList === 'Ваш список лекарств') {
            setSubmitError('Выберите лекарство из списка');
            refHeadList.current.classList.add('head-of-list-error')
            refError.current.classList.add('error-active');

            return;
        }

        if (profileList === 'Выберете члена семьи') {
            setSubmitError('Выберите члена семьи из списка');
            refProfileList.current.classList.add('head-of-list-error')
            refError.current.classList.add('error-active');

            return;
        }

        if (firstTime === '') {
            setSubmitError('Введите первое время');
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
    }

    const searchMed = (e) => {
        const value = e.target.value
        setSearch(value);

        if (value === '') {
            setTempArr(arr);

            return
        }

        const searchArr = tempArr.filter(item => item.med.toLowerCase().includes(value.toLowerCase()));

        setTempArr(searchArr)
    }

    return (
        !error500
            ?
            <div className='notify-container'>
                <div className="addmed-h1">Добавляйте напоминания на прием</div>
                <form method='post' noValidate encType='application/json' className='notify-form'>
                    <div className="not-med-row">
                        <div className="not-med-row__first">
                            Выберете лекарство:
                        </div>
                        <div className="not-med-row__second">
                            <div ref={refHeadList} onClick={openUl} className='head-of-list'>
                                {medList}
                                <svg ref={refArrow} className='list-arrow' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#000000"
                                          d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
                                </svg>
                            </div>
                            <ul ref={refUl} className='header-list header-list-hidden'>
                                <input onChange={(e) => searchMed(e)} value={search} className='search-list-med' type='text' placeholder='Поиск в списке' />
                                {
                                    tempArr.length === 0
                                        ? <div className='list-element'><span className='not-found-list'>Ничего не найдено</span></div>
                                        :
                                        <>
                                            {
                                                tempArr.map((item) => {
                                                    return <ListElement select={selectMedList} key={item.id} photo={item.photo} name={item.med}/>
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
                                    family.map((item) => {
                                        return <ListElement select={selectProfileList} key={item.id} photo={item.photo} name={item.name + ' ' + item.id}/>
                                    })
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
                    <MyButton size='desktop-log' submit={submit}  width='70%' height='50px' fontSize='25px' margin='0 0 0 0'> Добавить </MyButton>
                    <MyButton size='small-desktop-log' submit={submit}  width='70%' height='45px' fontSize='22px' margin='0 0 0 0'> Добавить </MyButton>
                    <MyButton size='ipad-log' submit={submit}  width='70%' height='40px' fontSize='18px' margin='0 0 0 0'> Добавить </MyButton>
                    <MyButton size='mobile-log' submit={submit}  width='70%' height='38px' fontSize='17px' margin='0 0 0 0'> Добавить </MyButton>
                </form>
            </div>
            :
            <Error500Page/>
    );
};

export default NotifyPage;