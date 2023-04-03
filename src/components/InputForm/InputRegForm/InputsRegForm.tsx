import React, {FC, useEffect, useRef, useState} from 'react';
import '../inputForm.scss';
import {Link, useNavigate} from "react-router-dom";
import MyButton from "../../MyButton/MyButton";
import MyInput from "../MyInput";
import {textErrors} from "../utils/textError";
import {regExp} from "../utils/regExp";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {deleteError, loginOrLogout} from "../../../store/actions/authActions";
import {useAppSelector} from "../../../hooks/useAppSelector";
import Loader from "../../Loader/Loader";

const InputsRegForm: FC = () => {
    const [submitName, setSubmitName] = useState<boolean>(false);
    const [errorName, setErrorName] = useState<string>('');
    const [valueName, setValueName] = useState<string>('');
    const [classErrorName, setClassErrorName] = useState<string>('');

    const [submitSurName, setSubmitSurName] = useState<boolean>(false);
    const [errorSurName, setErrorSurName] = useState<string>('');
    const [valueSurName, setValueSurName] = useState<string>('');
    const [classErrorSurName, setClassErrorSurName] = useState<string>('');

    const [submitEmail, setSubmitEmail] = useState<boolean>(false);
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [valueEmail, setValueEmail] = useState<string>('');
    const [classErrorEmail, setClassErrorEmail] = useState<string>('');

    const [submitAge, setSubmitAge] = useState<boolean>(false);
    const [errorAge, setErrorAge] = useState<string>('');
    const [valueAge, setValueAge] = useState<string>('');
    const [classErrorAge, setClassErrorAge] = useState<string>('');

    const [submitPass, setSubmitPass] = useState<boolean>(false);
    const [classErrorPass, setClassErrorPass] = useState<string>('');
    const [errorPass, setErrorPass] = useState<string>('');
    const [valuePass, setValuePass] = useState<string>('')


    const [submitSecPass, setSubmitSecPass] = useState<boolean>(false);
    const [classErrorSecPass, setClassErrorSecPass] = useState<string>('');
    const [errorSecPass, setErrorSecPass] = useState<string>('');

    const [link, setLink] = useState('');

    const elemName = useRef<HTMLDivElement>();
    const elemSurName = useRef<HTMLDivElement>();
    const elemEmail = useRef<HTMLDivElement>();
    const elemAge = useRef<HTMLDivElement>();
    const elemPass = useRef<HTMLDivElement>();
    const elemSecPass = useRef<HTMLDivElement>();
    const refError = useRef<HTMLDivElement>();
    const refLinkCon = useRef<HTMLDivElement>();
    const refRegCon = useRef<HTMLDivElement>();

    const dispatch = useAppDispatch();
    const {isLoading, isError} = useAppSelector(state => state.auth);

    useEffect(() => {
        return () => {
            dispatch(deleteError());
        }
    }, [])

    const changeBorderFocusName = () => {
        elemName.current.style.borderColor = '#B36FF7';

        if (classErrorName.length !== 0) {
            setErrorName('');
            setClassErrorName('');
        }
    }

    const changeBorderBlurName = (value: string) => {
        value = value.trim();
        elemName.current.style.borderColor = '#ECECEC';

        if (value.length === 0) {
            setErrorName(textErrors.empty);
            setClassErrorName('error-active');
            setSubmitName(false)

            return
        }

        if (value.match(/<script>/) !== null ||
            value.match(/<a/) !== null ||
            value.match(/<img/) !== null ||
            !(regExp.checkUsername.test(value))) {
            setErrorName(textErrors.wrongData);
            setClassErrorName('error-active');
            setSubmitName(false)

            return
        }

        setValueName(value);
        setSubmitName(true)
    }

    const changeBorderFocusSurName = () => {
        elemSurName.current.style.borderColor = '#B36FF7';

        if (classErrorSurName.length !== 0) {
            setErrorSurName('');
            setClassErrorSurName('');
        }
    }

    const changeBorderBlurSurName = (value: string) => {
        value = value.trim();
        elemSurName.current.style.borderColor = '#ECECEC';

        if (value.length === 0) {
            setErrorSurName(textErrors.empty);
            setClassErrorSurName('error-active');
            setSubmitSurName(false)

            return
        }

        if (value.match(/<script>/) !== null ||
            value.match(/<a/) !== null ||
            value.match(/<img/) !== null ||
            !(regExp.checkUsername.test(value))) {
            setErrorSurName(textErrors.wrongData);
            setClassErrorSurName('error-active');
            setSubmitSurName(false)

            return
        }

        setValueSurName(value);

        setSubmitSurName(true)
    }
    const changeBorderFocusEmail = () => {
        elemEmail.current.style.borderColor = '#B36FF7';

        if (classErrorEmail.length !== 0) {
            setErrorEmail('');
            setClassErrorEmail('');
        }
    }

    const changeBorderBlurEmail = (value: string) => {
        value = value.trim();
        elemEmail.current.style.borderColor = '#ECECEC';

        if (value.length === 0) {
            setErrorEmail(textErrors.empty);
            setClassErrorEmail('error-active');
            setSubmitEmail(false);

            return;
        }

        if (!regExp.checkEmail.test(value) && value.length !== 0) {
            setErrorEmail(textErrors.wrongEmail);
            setClassErrorEmail('error-active');
            setSubmitEmail(false);

            return;
        }

        setValueEmail(value);
        setSubmitEmail(true);
    }

    const changeBorderFocusAge = () => {
        elemAge.current.style.borderColor = '#B36FF7';

        if (classErrorAge.length !== 0) {
            setErrorAge('');
            setClassErrorAge('');
        }
    }

    const changeBorderBlurAge = (value: string) => {
        elemAge.current.style.borderColor = '#ECECEC';

        if (value.length === 0) {
            setErrorAge(textErrors.empty);
            setClassErrorAge('error-active');
            setSubmitAge(false)

            return
        }

        setValueAge(value);
        setSubmitAge(true)
    }

    const changeBorderFocusPassword = () => {
        elemPass.current.style.borderColor = '#B36FF7';

        if (classErrorPass.length !== 0) {
            setErrorPass('');
            setClassErrorPass('');
        }
    }

    const changeBorderBlurPassword = (value: string) => {
        value = value.trim();
        elemPass.current.style.borderColor = '#ECECEC';

        if (value.length === 0) {
            setErrorPass(textErrors.empty);
            setClassErrorPass('error-active');
            setSubmitPass(false)

            return
        }

        if (value.length > 50) {
            setErrorPass(textErrors.tooLong);
            setClassErrorPass('error-active');
            setSubmitPass(false)

            return
        }

        if (!regExp.minimum8Chars.test(value)) {
            setErrorPass(textErrors.shortPass);
            setClassErrorPass('error-active');
            setSubmitPass(false)

            return
        }

        if (!regExp.containsNumbers.test(value) ||
            !regExp.containsLetters.test(value)) {
            setErrorPass(textErrors.wrongPass);
            setClassErrorPass('error-active');
            setSubmitPass(false)

            return
        }

        setValuePass(value)
        setSubmitPass(true)
    }

    const changeBorderFocusSecPassword = () => {
        elemSecPass.current.style.borderColor = '#B36FF7';

        if (classErrorSecPass.length !== 0) {
            setErrorSecPass('');
            setClassErrorSecPass('');
        }
    }

    const changeBorderBlurSecPassword = (value: string) => {
        value = value.trim();
        elemSecPass.current.style.borderColor = '#ECECEC';

        if (value.length === 0) {
            setErrorSecPass(textErrors.empty);
            setClassErrorSecPass('error-active');
            setSubmitSecPass(false)

            return
        }

        if (value !== valuePass) {
            setErrorSecPass(textErrors.secondPassErr);
            setClassErrorSecPass('error-active');
            setSubmitSecPass(false)

            return
        }

        setSubmitSecPass(true)
    }

    const submit = async (e) => {
        e.preventDefault();

        if (!submitName) {
            setErrorName(textErrors.wrongData);
            setClassErrorName('error-active');
            setSubmitName(false)

            return
        }

        if (!submitSurName) {
            setErrorSurName(textErrors.wrongData);
            setClassErrorSurName('error-active');
            setSubmitSurName(false)

            return
        }

        if (!submitEmail) {
            setErrorEmail(textErrors.wrongEmail);
            setClassErrorEmail('error-active');
            setSubmitEmail(false);

            return;
        }

        if (!submitAge) {
            setErrorAge(textErrors.wrongAge);
            setClassErrorAge('error-active');
            setSubmitAge(false)

            return
        }

        if (!submitPass) {
            setErrorPass(textErrors.checkPass);
            setClassErrorPass('error-active');
            setSubmitPass(false)

            return
        }

        if (!submitSecPass) {
            setErrorSecPass(textErrors.checkPass);
            setClassErrorSecPass('error-active');
            setSubmitSecPass(false)

            return
        }

        const tempUser = {
            name: valueName,
            surname: valueSurName,
            email: valueEmail,
            date: valueAge,
            password: valuePass
        }

        const link = await dispatch(loginOrLogout(true, tempUser));
        if (link !== undefined) {
            setLink(link)
            refLinkCon.current.classList.remove('conf-container-hidden');
            refRegCon.current.classList.add('conf-container-hidden');
        }
    }

    const regLink = () => {
        window.location.href = `${link}`;
    }

    return (
        <>
            <div ref={refRegCon} className='form-container'>
                <h1 className='log-h1'>Регистрация</h1>
                <form className='menu-form' method='post' action='/' noValidate encType='application/json'>
                    <MyInput elem={elemName}
                             active={classErrorName}
                             error={errorName}
                             blur={changeBorderBlurName}
                             focus={changeBorderFocusName}
                             type='text'
                             placeholder='Имя'
                    >
                        <svg className='svg' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 16C19.6819 16 22.6666 13.0152 22.6666 9.33332C22.6666 5.65142 19.6819 2.66666 16 2.66666C12.3181 2.66666 9.33331 5.65142 9.33331 9.33332C9.33331 13.0152 12.3181 16 16 16Z" stroke="white"/>
                            <path d="M22.6666 18.6667H23.136C24.1108 18.6669 25.0519 19.0231 25.7825 19.6684C26.5132 20.3136 26.9831 21.2034 27.104 22.1707L27.6253 26.336C27.6722 26.7112 27.6388 27.0922 27.5272 27.4535C27.4156 27.8148 27.2284 28.1483 26.9781 28.4317C26.7278 28.7152 26.4201 28.9422 26.0754 29.0976C25.7307 29.2531 25.3568 29.3334 24.9786 29.3333H7.02131C6.64316 29.3334 6.26931 29.2531 5.92457 29.0976C5.57984 28.9422 5.27211 28.7152 5.02181 28.4317C4.77151 28.1483 4.58436 27.8148 4.47278 27.4535C4.36121 27.0922 4.32775 26.7112 4.37465 26.336L4.89465 22.1707C5.01557 21.203 5.48587 20.3128 6.21709 19.6675C6.94831 19.0222 7.89008 18.6663 8.86531 18.6667H9.33331" stroke="white" />
                        </svg>
                    </MyInput>
                    <MyInput elem={elemSurName}
                             active={classErrorSurName}
                             error={errorSurName}
                             blur={changeBorderBlurSurName}
                             focus={changeBorderFocusSurName}
                             type='text'
                             placeholder='Фамилия'
                    >
                        <svg className='svg' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 16C19.6819 16 22.6666 13.0152 22.6666 9.33332C22.6666 5.65142 19.6819 2.66666 16 2.66666C12.3181 2.66666 9.33331 5.65142 9.33331 9.33332C9.33331 13.0152 12.3181 16 16 16Z" stroke="white"/>
                            <path d="M22.6666 18.6667H23.136C24.1108 18.6669 25.0519 19.0231 25.7825 19.6684C26.5132 20.3136 26.9831 21.2034 27.104 22.1707L27.6253 26.336C27.6722 26.7112 27.6388 27.0922 27.5272 27.4535C27.4156 27.8148 27.2284 28.1483 26.9781 28.4317C26.7278 28.7152 26.4201 28.9422 26.0754 29.0976C25.7307 29.2531 25.3568 29.3334 24.9786 29.3333H7.02131C6.64316 29.3334 6.26931 29.2531 5.92457 29.0976C5.57984 28.9422 5.27211 28.7152 5.02181 28.4317C4.77151 28.1483 4.58436 27.8148 4.47278 27.4535C4.36121 27.0922 4.32775 26.7112 4.37465 26.336L4.89465 22.1707C5.01557 21.203 5.48587 20.3128 6.21709 19.6675C6.94831 19.0222 7.89008 18.6663 8.86531 18.6667H9.33331" stroke="white" />
                        </svg>
                    </MyInput>
                    <MyInput elem={elemEmail}
                             active={classErrorEmail}
                             error={errorEmail}
                             blur={changeBorderBlurEmail}
                             focus={changeBorderFocusEmail}
                             type='email'
                             placeholder='Почта'
                    >
                        <svg className='svg' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 6H4C3.46957 6 2.96086 6.21071 2.58579 6.58579C2.21071 6.96086 2 7.46957 2 8V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H28C28.5304 26 29.0391 25.7893 29.4142 25.4142C29.7893 25.0391 30 24.5304 30 24V8C30 7.46957 29.7893 6.96086 29.4142 6.58579C29.0391 6.21071 28.5304 6 28 6ZM25.8 8L16 14.78L6.2 8H25.8ZM4 24V8.91L15.43 16.82C15.5974 16.9361 15.7963 16.9984 16 16.9984C16.2037 16.9984 16.4026 16.9361 16.57 16.82L28 8.91V24H4Z" fill="white"/>
                        </svg>
                    </MyInput>
                    <MyInput elem={elemAge}
                             active={classErrorAge}
                             error={errorAge}
                             blur={changeBorderBlurAge}
                             focus={changeBorderFocusAge}
                             type='date'
                             placeholder='Возраст'
                             min='1920-01-01'
                             max='2019-01-01'

                    >
                        <svg className='svg' style={{strokeWidth: '1px'}} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
                            <path d="M18,5h1V6a1,1,0,0,0,2,0V5h1a1,1,0,0,0,0-2H21V2a1,1,0,0,0-2,0V3H18a1,1,0,0,0,0,2ZM15.5,9a3,3,0,0,0-3-3h-1a3,3,0,0,0-3,3,1,1,0,0,0,2,0,1,1,0,0,1,1-1h1a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1H12a1,1,0,0,0,0,2h.5a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1h-1a1,1,0,0,1-1-1,1,1,0,0,0-2,0,3,3,0,0,0,3,3h1a3,3,0,0,0,3-3V14a3,3,0,0,0-.78-2,3,3,0,0,0,.78-2Zm6.1,0a1,1,0,0,0-.78,1.18,9,9,0,1,1-7-7,1,1,0,1,0,.4-2A10.8,10.8,0,0,0,12,1,11,11,0,1,0,23,12a10.8,10.8,0,0,0-.22-2.2A1,1,0,0,0,21.6,9Z"/>
                        </svg>
                    </MyInput>
                    <MyInput elem={elemPass}
                             active={classErrorPass}
                             error={errorPass}
                             blur={changeBorderBlurPassword}
                             focus={changeBorderFocusPassword}
                             type='password'
                             placeholder='Пароль'
                    >
                        <svg className='svg' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 2C19.5946 1.99968 18.2087 2.32857 16.9532 2.96031C15.6978 3.59205 14.6079 4.50908 13.7707 5.63792C12.9335 6.76675 12.3723 8.07599 12.1322 9.46074C11.8921 10.8455 11.9797 12.2672 12.388 13.612L2 24V30H8L18.388 19.612C19.6259 19.9878 20.9303 20.0922 22.2122 19.9183C23.4941 19.7443 24.7235 19.2961 25.8165 18.604C26.9095 17.912 27.8405 16.9925 28.546 15.9081C29.2515 14.8237 29.7149 13.6 29.9047 12.3203C30.0945 11.0407 30.0062 9.7351 29.6458 8.49264C29.2854 7.25019 28.6613 6.10003 27.8162 5.12056C26.9711 4.14109 25.9247 3.35532 24.7485 2.81681C23.5722 2.2783 22.2937 1.9997 21 2ZM21 18C20.3115 17.9996 19.6268 17.8979 18.968 17.698L17.821 17.35L16.974 18.197L13.793 21.378L12.414 20L11 21.414L12.379 22.793L10.793 24.379L9.414 23L8 24.414L9.379 25.793L7.172 28H4V24.828L13.802 15.026L14.65 14.179L14.302 13.032C13.8746 11.623 13.9023 10.1151 14.3814 8.72277C14.8604 7.33045 15.7662 6.12463 16.97 5.27683C18.1739 4.42902 19.6144 3.98242 21.0867 4.00053C22.559 4.01864 23.9881 4.50056 25.1707 5.37772C26.3533 6.25488 27.2292 7.48262 27.6738 8.8863C28.1184 10.29 28.1091 11.7981 27.6471 13.1962C27.1852 14.5942 26.2941 15.8111 25.1008 16.6735C23.9074 17.5359 22.4724 18.0001 21 18Z" fill="white"/>
                            <path d="M22 12C23.1046 12 24 11.1046 24 10C24 8.89543 23.1046 8 22 8C20.8954 8 20 8.89543 20 10C20 11.1046 20.8954 12 22 12Z" fill="white"/>
                        </svg>
                    </MyInput>
                    <MyInput elem={elemSecPass}
                             active={classErrorSecPass}
                             error={errorSecPass}
                             blur={changeBorderBlurSecPassword}
                             focus={changeBorderFocusSecPassword}
                             type='password'
                             placeholder='Повторите пароль'
                    >
                        <svg className='svg' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 2C19.5946 1.99968 18.2087 2.32857 16.9532 2.96031C15.6978 3.59205 14.6079 4.50908 13.7707 5.63792C12.9335 6.76675 12.3723 8.07599 12.1322 9.46074C11.8921 10.8455 11.9797 12.2672 12.388 13.612L2 24V30H8L18.388 19.612C19.6259 19.9878 20.9303 20.0922 22.2122 19.9183C23.4941 19.7443 24.7235 19.2961 25.8165 18.604C26.9095 17.912 27.8405 16.9925 28.546 15.9081C29.2515 14.8237 29.7149 13.6 29.9047 12.3203C30.0945 11.0407 30.0062 9.7351 29.6458 8.49264C29.2854 7.25019 28.6613 6.10003 27.8162 5.12056C26.9711 4.14109 25.9247 3.35532 24.7485 2.81681C23.5722 2.2783 22.2937 1.9997 21 2ZM21 18C20.3115 17.9996 19.6268 17.8979 18.968 17.698L17.821 17.35L16.974 18.197L13.793 21.378L12.414 20L11 21.414L12.379 22.793L10.793 24.379L9.414 23L8 24.414L9.379 25.793L7.172 28H4V24.828L13.802 15.026L14.65 14.179L14.302 13.032C13.8746 11.623 13.9023 10.1151 14.3814 8.72277C14.8604 7.33045 15.7662 6.12463 16.97 5.27683C18.1739 4.42902 19.6144 3.98242 21.0867 4.00053C22.559 4.01864 23.9881 4.50056 25.1707 5.37772C26.3533 6.25488 27.2292 7.48262 27.6738 8.8863C28.1184 10.29 28.1091 11.7981 27.6471 13.1962C27.1852 14.5942 26.2941 15.8111 25.1008 16.6735C23.9074 17.5359 22.4724 18.0001 21 18Z" fill="white"/>
                            <path d="M22 12C23.1046 12 24 11.1046 24 10C24 8.89543 23.1046 8 22 8C20.8954 8 20 8.89543 20 10C20 11.1046 20.8954 12 22 12Z" fill="white"/>
                        </svg>
                    </MyInput>
                    {
                        isLoading &&
                            <Loader add='loader-log-reg'/>
                    }
                    <div ref={refError} style={{textAlign: 'center'}} className='error error-active'> {isError} </div>
                    <MyButton size='desktop-log' submit={submit}  width='100%' height='50px' fontSize='25px' margin='0 0 0 0'> Зарегистрироваться </MyButton>
                    <MyButton size='small-desktop-log' submit={submit}  width='100%' height='45px' fontSize='22px' margin='0 0 0 0'> Зарегистрироваться </MyButton>
                    <MyButton size='ipad-log' submit={submit}  width='100%' height='40px' fontSize='20px' margin='0 0 0 0'> Зарегистрироваться </MyButton>
                    <MyButton size='mobile-log' submit={submit}  width='100%' height='35px' fontSize='18px' margin='0 0 0 0'> Зарегистрироваться </MyButton>
                </form>
                <div className='text'>
                    <span className='first-span'> Есть аккаунт? <Link className='second-span' to='/login'> Войдите! </Link></span>
                </div>
            </div>
            <div ref={refLinkCon} className='conf-container conf-container-hidden'>
                <div className='log-h1' style={{textAlign: 'center'}}> Подтвердите почту </div>
                <div className='conf-first'> Перейдите по этой <span onClick={regLink} className='conf-a'> сслыке!</span> для заверщения регистрации</div>
            </div>
        </>
    );
};

export default InputsRegForm;