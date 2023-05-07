import React, {FC, useEffect, useRef, useState} from 'react';
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {title} from "../../models/Title/Title";
import {addPersonFamily, loadingProfile} from "../../store/actions/userActions";
import {Link, useNavigate} from "react-router-dom";
import Error500Page from "../Error500Page/Error500Page";
import MyInput from "../../components/InputForm/MyInput";
import {textErrors} from "../../components/InputForm/utils/textError";
import {regExp} from "../../components/InputForm/utils/regExp";
import MyButton from "../../components/MyButton/MyButton";
import MiniLoader from "../../components/MiniLoader/MiniLoader";

import './addFamilyPage.scss'

const AddFamilyPage: FC = () => {
    const nav = useNavigate();

    const {isAuth, isLoading} = useAppSelector(state => state.auth);
    const {listFamily} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const [error500, setError500] = useState(false);

    const [submitError, setSubmitError] = useState<string>('');

    const [submitName, setSubmitName] = useState<boolean>(false);
    const [errorName, setErrorName] = useState<string>('');
    const [valueName, setValueName] = useState<string>('');
    const [classErrorName, setClassErrorName] = useState<string>('');

    const [myPhoto, setMyPhoto] = useState('https://myaidkit.ru/api/v1/minio/avatars/default_avatar.webp');
    const [avatar, setAvatar] = useState('');

    const elemName = useRef<HTMLDivElement>();
    const refError = useRef<HTMLDivElement>();


    useEffect(() => {
        title.innerText = 'Добавление в семью';

        if (listFamily.length >= 6) {
            nav('/profile');

            return;
        }

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
    }, [listFamily]);

    const changeBorderFocusName = () => {
        elemName.current.style.borderColor = '#B36FF7';

        if (classErrorName.length !== 0) {
            setErrorName('');
            setClassErrorName('');
        }
    }

    const changeValueName = (value: string) => {
        setValueName(value);
    }

    const changeBorderBlurName = () => {
        setValueName(valueName.trim());
        elemName.current.style.borderColor = '#ECECEC';

        if (valueName.length === 0) {
            setErrorName(textErrors.empty);
            setClassErrorName('error-active');
            setSubmitName(false)

            return
        }

        if (valueName.match(/<script>/) !== null ||
            valueName.match(/<a/) !== null ||
            valueName.match(/<img/) !== null ||
            !(regExp.checkUsername.test(valueName))) {
            setErrorName(textErrors.wrongData);
            setClassErrorName('error-active');
            setSubmitName(false)

            return
        }

        setSubmitName(true)
    }

    const changePhoto = (e) => {
        setMyPhoto(URL.createObjectURL(e.target.files[0]));
        setAvatar(e.target.files[0]);
    }

    const submit = async (e) => {
        e.preventDefault();

        if (!submitName) {
            setErrorName(textErrors.wrongData);
            setClassErrorName('error-active');
            setSubmitName(false);

            return;
        }

        if (avatar !== '') {
            let formData = new FormData();
            formData.append('file', avatar);
            formData.append('name', valueName);

            const res = await dispatch(addPersonFamily(formData));

            if (!res) {
                setSubmitError('Упс... Попробуйте позже');

                return
            }

            nav('/profile');

            return
        }

        const res = await dispatch(addPersonFamily({name: valueName}));

        if (!res) {
            setSubmitError('Упс... Попробуйте позже');

            return
        }

        if (res === 400) {
            setSubmitError('Поддерживается только jpg и png');

            return;
        }

        nav('/profile');
    }

    return (
        !error500
            ?
            <>
                <div className='back-profile add-family-back'></div>
                <Link to='/profile'>
                    <svg className='back-to-profile' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#FFF"/>
                    </svg>
                </Link>
                <div className='prof-fam-form add-family-second'>
                    <div className='profile-form-container'>
                        <h1 className='log-h1'>Добавление в семью</h1>
                        <div className='under-profile'>Вы сможете добавлять напоминания на этого человека. Но у него не будет доступа к этому сервису без личного аккаунта</div>
                        <form className='menu-form' method='post' action='/' noValidate encType='application/json'>
                            <MyInput elem={elemName}
                                     active={classErrorName}
                                     error={errorName}
                                     blur={changeBorderBlurName}
                                     focus={changeBorderFocusName}
                                     change={changeValueName}
                                     type='text'
                                     placeholder='Имя'
                            >
                                <svg className='svg' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 16C19.6819 16 22.6666 13.0152 22.6666 9.33332C22.6666 5.65142 19.6819 2.66666 16 2.66666C12.3181 2.66666 9.33331 5.65142 9.33331 9.33332C9.33331 13.0152 12.3181 16 16 16Z" stroke="white"/>
                                    <path d="M22.6666 18.6667H23.136C24.1108 18.6669 25.0519 19.0231 25.7825 19.6684C26.5132 20.3136 26.9831 21.2034 27.104 22.1707L27.6253 26.336C27.6722 26.7112 27.6388 27.0922 27.5272 27.4535C27.4156 27.8148 27.2284 28.1483 26.9781 28.4317C26.7278 28.7152 26.4201 28.9422 26.0754 29.0976C25.7307 29.2531 25.3568 29.3334 24.9786 29.3333H7.02131C6.64316 29.3334 6.26931 29.2531 5.92457 29.0976C5.57984 28.9422 5.27211 28.7152 5.02181 28.4317C4.77151 28.1483 4.58436 27.8148 4.47278 27.4535C4.36121 27.0922 4.32775 26.7112 4.37465 26.336L4.89465 22.1707C5.01557 21.203 5.48587 20.3128 6.21709 19.6675C6.94831 19.0222 7.89008 18.6663 8.86531 18.6667H9.33331" stroke="white" />
                                </svg>
                            </MyInput>
                            <div className='family-avatar-container'>
                                <div className="photo-input">
                                    <img alt='Фотография лекарства' className='med-photo' src={myPhoto}/>
                                    <input onChange={(e) => changePhoto(e)} className='photo-input-med' type='file' id='photo' accept='mage/png, image/jpg, image/webp'/>
                                    <label className='med-photo-button' htmlFor='photo'> Загрузить фото </label>
                                </div>
                            </div>
                            <div ref={refError} className='error error-active' style={{textAlign: 'center'}}> {submitError} </div>
                            <MyButton size='desktop-log' submit={submit}  width='100%' height='50px' fontSize='25px' margin='0 0 0 0'>
                                {
                                    isLoading
                                        ?
                                        <MiniLoader/>
                                        :
                                        'Добавить'
                                }
                            </MyButton>
                            <MyButton size='small-desktop-log' submit={submit}  width='100%' height='45px' fontSize='22px' margin='0 0 0 0'>
                                {
                                    isLoading
                                        ?
                                        <MiniLoader/>
                                        :
                                        'Добавить'
                                }
                            </MyButton>
                            <MyButton size='ipad-log' submit={submit}  width='100%' height='40px' fontSize='20px' margin='0 0 0 0'>
                                {
                                    isLoading
                                        ?
                                        <MiniLoader/>
                                        :
                                        'Добавить'
                                }
                            </MyButton>
                            <MyButton size='mobile-log' submit={submit}  width='100%' height='35px' fontSize='18px' margin='0 0 0 0'>
                                {
                                    isLoading
                                        ?
                                        <MiniLoader/>
                                        :
                                        'Добавить'
                                }
                            </MyButton>
                        </form>
                    </div>
                </div>
            </>
            :
            <Error500Page/>
    );
};

export default AddFamilyPage;