import React, {FC, useEffect, useRef, useState} from 'react';
import './profilePage.scss'
import InputProfileForm from "../../components/InputForm/InputProfileForm/InputProfileForm";
import MyInput from "../../components/InputForm/MyInput";
import {textErrors} from "../../components/InputForm/utils/textError";
import {regExp} from "../../components/InputForm/utils/regExp";
import FamilyPerson from "../../components/FamilyPerson/FamilyPerson";
import MyButton from "../../components/MyButton/MyButton";
import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {
    createFamily,
    deleteFamilyServer,
    deletePersonFamilyNoUser, deletePersonFamilyUser, invitePersonFamily,
    loadingProfile
} from "../../store/actions/userActions";
import Error500Page from "../Error500Page/Error500Page";
import {title} from "../../models/Title/Title";
import Loader from "../../components/Loader/Loader";
import MiniLoader from "../../components/MiniLoader/MiniLoader";
import {ListFamily} from "../../store/reducers/userReducer/types";

const ProfilePage: FC = () => {
    const [submitError, setSubmitError] = useState<string>('');
    const [submitInvError, setSubmitInvError] = useState<string>('');

    const [submitFamEmail, setSubmitFamEmail] = useState<boolean>(false);
    const [errorFamEmail, setErrorFamEmail] = useState<string>('');
    const [valueFamEmail, setValueFamEmail] = useState<string>('');
    const [classErrorFamEmail, setClassErrorFamEmail] = useState<string>('');
    const [check, setCheck] = useState(false);
    const [checkClick, setCheckClick] = useState(false);
    const [createFamilyCheck, setCreateFamilyCheck] = useState(false);
    const [lastClick, setLastClick] = useState({} as ListFamily);

    const elemFamEmail = useRef<HTMLDivElement>();
    const refPopUp = useRef<HTMLDivElement>()
    const refPopUpBody = useRef<HTMLDivElement>();
    const refPopUpSec = useRef<HTMLDivElement>()
    const refPopUpBodySec = useRef<HTMLDivElement>();
    const refErrorAdd = useRef<HTMLDivElement>();

    const nav = useNavigate();

    const {isAuth, isLoading} = useAppSelector(state => state.auth);
    const {listFamily, profileLoading, main} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const [error500, setError500] = useState(false);

    useEffect(() => {
        title.innerText = 'Профиль';

        if (!isAuth) {
            dispatch(loadingProfile(true))
                .then((res) => {
                    if (res === 401) {
                        nav('/login');
                    }

                    if (res === 500) {
                        setError500(true);
                    }
                });
        }

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, [])

    const changeBorderFocusFamEmail = () => {
        refErrorAdd.current.classList.remove('error-success');
        setSubmitInvError('');
        elemFamEmail.current.style.borderColor = '#B36FF7';

        if (classErrorFamEmail.length !== 0) {
            setErrorFamEmail('');
            setClassErrorFamEmail('');
        }
    }

    const changeValueEmail = (value: string) => {
        setValueFamEmail(value);
    }

    const changeBorderBlurFamEmail = () => {
        setValueFamEmail(valueFamEmail.trim());
        elemFamEmail.current.style.borderColor = '#ECECEC';

        if (valueFamEmail.length === 0) {
            setErrorFamEmail(textErrors.empty);
            setClassErrorFamEmail('error-active');
            setSubmitFamEmail(false);

            return;
        }

        if (!regExp.checkEmail.test(valueFamEmail) && valueFamEmail.length !== 0) {
            setErrorFamEmail(textErrors.wrongEmail);
            setClassErrorFamEmail('error-active');
            setSubmitFamEmail(false);

            return;
        }

        setSubmitFamEmail(true);
    }

    const openPopUp = (item) => {
        setLastClick(item)
        document.body.style.overflowY = 'hidden';

        refPopUp.current.classList.add('popUp-container-active');
        refPopUpBody.current.classList.add('popUp-active');
    }

    const deletePerson = async (e) => {
        e.preventDefault();

        if (!lastClick.user) {
            const res = await dispatch(deletePersonFamilyNoUser(lastClick.id));

            if (!res) {
                setSubmitError('Упс... Повторите позже!');

                return;
            }
        } else {
            const res = await dispatch(deletePersonFamilyUser(lastClick.id));

            if (!res) {
                setSubmitError('Упс... Повторите позже!');

                return;
            }
        }

        document.body.style.overflowY = 'visible';

        refPopUp.current.classList.remove('popUp-container-active');
        refPopUpBody.current.classList.remove('popUp-active');

        setSubmitError('');

        return;
    }

    const closePopUp = (e) => {
        e.preventDefault();
        document.body.style.overflowY = 'visible';

        refPopUp.current.classList.remove('popUp-container-active');
        refPopUpBody.current.classList.remove('popUp-active');
        setSubmitError('');
    }

    const openPopUpSec = () => {
        document.body.style.overflowY = 'hidden';

        refPopUpSec.current.classList.add('popUp-container-active');
        refPopUpBodySec.current.classList.add('popUp-active');
    }

    const deleteFamily = async (e) => {
        e.preventDefault();

        const res = await dispatch(deleteFamilyServer());

        if (!res) {
            setSubmitError('Упс... Повторите позже!');

            return;
        }

        document.body.style.overflowY = 'visible';

        refPopUpSec.current.classList.remove('popUp-container-active');
        refPopUpBodySec.current.classList.remove('popUp-active');
        setSubmitError('');
    }

    const closePopUpSec = (e) => {
        e.preventDefault();
        document.body.style.overflowY = 'visible';

        refPopUpSec.current.classList.remove('popUp-container-active');
        refPopUpBodySec.current.classList.remove('popUp-active');
        setSubmitError('');
    }


    const changeCheck = (e) => {
        setCheck(e.target.checked)
    }

    const submit = async (e) => {
        e.preventDefault();
        setCheckClick(true)

        const res = await dispatch(createFamily());

        if (!res) {
            setSubmitError('Упс... Повторите позже!');
            setCheckClick(false)

            return;
        }

        setCheckClick(false)
        setSubmitError('');
    }

    const invite = async (e) => {
        e.preventDefault();
        refErrorAdd.current.classList.remove('error-success');
        setSubmitInvError('');

        if (!submitFamEmail) {
            setErrorFamEmail(textErrors.wrongEmail);
            setClassErrorFamEmail('error-active');
            setSubmitFamEmail(false);

            return;
        }


        const res = await dispatch(invitePersonFamily({
            email: valueFamEmail,
            adult: !check
        }));

        if (!res) {
            setSubmitInvError('Упс... Попробуйте позже');

            return;
        }

        setSubmitInvError('Приглашение отправлено на почту');
        refErrorAdd.current.classList.add('error-success');
    }

    return (
        profileLoading
            ?
            <Loader/>
            :
            !error500
                ?
                <>
                    <div className='back-profile'></div>
                    <div className='prof-fam-form'>
                        <InputProfileForm/>
                        <div className='add-family'>
                            <h1 className='log-h1'>Семья</h1>
                            <div className='under-profile'>Отправляйте приглашение по почте вашей семье для введения общей аптечки. Создавайте напоминания для них. <br/> Максимальное количество - 6</div>
                            {
                                listFamily[0] === undefined
                                ?
                                    <>
                                        <div className='error error-active'> {submitError} </div>
                                        <MyButton size='desktop-log' submit={submit}  width='100%' height='50px' fontSize='22px' margin='0 0 0 0'> {
                                            (isLoading && checkClick)
                                                ?
                                                <MiniLoader/>
                                                :
                                                'Создать данные о семье'
                                        } </MyButton>
                                        <MyButton size='small-desktop-log' submit={submit}  width='100%' height='45px' fontSize='20px' margin='0 0 0 0'> {
                                            (isLoading && checkClick)
                                                ?
                                                <MiniLoader/>
                                                :
                                                'Создать данные о семье'
                                        }</MyButton>
                                        <MyButton size='ipad-log' submit={submit}  width='100%' height='40px' fontSize='18px' margin='0 0 0 0'> {
                                            (isLoading && checkClick)
                                                ?
                                                <MiniLoader/>
                                                :
                                                'Создать данные о семье'
                                        } </MyButton>
                                        <MyButton size='mobile-log' submit={submit}  width='100%' height='35px' fontSize='16px' margin='0 0 0 0'> {
                                            (isLoading && checkClick)
                                                ?
                                                <MiniLoader/>
                                                :
                                                'Создать данные о семье'
                                        } </MyButton>
                                    </>
                                :
                                    <>
                                        <div className='my-family'>
                                            {
                                                listFamily.map((item, index) => {
                                                    return <FamilyPerson key={index} index={index} familyId={item.id} user={item.user} open={() => openPopUp(item)} src={item.avatar} name={item.name} role={item.adult}/>
                                                })
                                            }
                                        </div>
                                        {
                                            main &&
                                            <>
                                                {
                                                    listFamily.length < 6 &&
                                                    <>
                                                        <form className='add-family-form' method='post' action='/' noValidate encType='application/json'>
                                                            <MyInput elem={elemFamEmail}
                                                                     active={classErrorFamEmail}
                                                                     error={errorFamEmail}
                                                                     value={valueFamEmail}
                                                                     blur={changeBorderBlurFamEmail}
                                                                     change={changeValueEmail}
                                                                     focus={changeBorderFocusFamEmail}
                                                                     type='email'
                                                                     placeholder='Почта приглашенного'
                                                            >
                                                                <svg className='svg' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M28 6H4C3.46957 6 2.96086 6.21071 2.58579 6.58579C2.21071 6.96086 2 7.46957 2 8V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H28C28.5304 26 29.0391 25.7893 29.4142 25.4142C29.7893 25.0391 30 24.5304 30 24V8C30 7.46957 29.7893 6.96086 29.4142 6.58579C29.0391 6.21071 28.5304 6 28 6ZM25.8 8L16 14.78L6.2 8H25.8ZM4 24V8.91L15.43 16.82C15.5974 16.9361 15.7963 16.9984 16 16.9984C16.2037 16.9984 16.4026 16.9361 16.57 16.82L28 8.91V24H4Z" fill="white"/>
                                                                </svg>
                                                            </MyInput>
                                                            <label style={{marginBottom: 15}} className="checkbox style-e">
                                                                <input onChange={(e) => changeCheck(e)} checked={check} type="checkbox"/>
                                                                <div className="checkbox__checkmark"></div>
                                                                <div className="checkbox__body">Ребенок?</div>
                                                            </label>
                                                            <div ref={refErrorAdd} className='error error-active'> {submitInvError} </div>
                                                            <MyButton size='desktop-log' submit={invite}  width='100%' height='50px' fontSize='22px' margin='0 0 0 0'> {
                                                                isLoading
                                                                    ?
                                                                    <MiniLoader/>
                                                                    :
                                                                    'Пригласить'
                                                            } </MyButton>
                                                            <MyButton size='small-desktop-log' submit={invite}  width='100%' height='45px' fontSize='20px' margin='0 0 0 0'> {
                                                                isLoading
                                                                    ?
                                                                    <MiniLoader/>
                                                                    :
                                                                    'Пригласить'
                                                            }  </MyButton>
                                                            <MyButton size='ipad-log' submit={invite}  width='100%' height='40px' fontSize='18px' margin='0 0 0 0'> {
                                                                isLoading
                                                                    ?
                                                                    <MiniLoader/>
                                                                    :
                                                                    'Пригласить'
                                                            }  </MyButton>
                                                            <MyButton size='mobile-log' submit={invite}  width='100%' height='35px' fontSize='16px' margin='0 0 0 0'> {
                                                                isLoading
                                                                    ?
                                                                    <MiniLoader/>
                                                                    :
                                                                    'Пригласить'
                                                            }  </MyButton>
                                                        </form>
                                                        <div className='under-family under-profile'>
                                                            Или нажмите <Link to='/addfamily' className='under-family-link'> сюда</Link>, чтобы добавить члена семьи, у которого нет аккаунта
                                                        </div>
                                                    </>
                                                }
                                                <button onClick={openPopUpSec} className='delete-btn-popup delete-family'>Удалить данные о семье</button>
                                            </>
                                        }
                                    </>
                            }
                        </div>
                        <div ref={refPopUp} className='popUp-container'>
                            <div ref={refPopUpBody} className='popUp'>
                                <div className='attention'>Вы уверены, что хотите удалить члена семьи?</div>
                                <div className='attention-under'>В этом случае вы не сможете его вернуть <br/> А также удалятся все уведомления, связанные с этим человеком</div>
                                <div className='error error-active'> {submitError} </div>
                                <div className='popup-btns'>
                                    <button className='delete-btn-popup' onClick={deletePerson}> {
                                        isLoading
                                            ?
                                            <MiniLoader deleteCheck={true}/>
                                            :
                                            'Удалить'
                                    } </button>
                                    <button className='cancel-btn-popup' onClick={closePopUp}> Отмена </button>
                                </div>
                            </div>
                        </div>
                        <div ref={refPopUpSec} className='popUp-container'>
                            <div ref={refPopUpBodySec} className='popUp'>
                                <div className='attention'>Вы уверены, что хотите удалить всю семью?</div>
                                <div className='attention-under'>В этом случае вы не сможете её вернуть <br/> А также удалятся все уведомления, связанные с этой семьей</div>
                                <div className='error error-active'> {submitError} </div>
                                <div className='popup-btns'>
                                    <button className='delete-btn-popup' onClick={deleteFamily}> {
                                        isLoading
                                            ?
                                            <MiniLoader deleteCheck={true}/>
                                            :
                                            'Удалить'
                                    } </button>
                                    <button className='cancel-btn-popup' onClick={closePopUpSec}> Отмена </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <Error500Page/>
    );
};

export default ProfilePage;