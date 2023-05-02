import {authActionAuth, authActionError} from "../reducers/authReducer/authReducer";
import {login, registration} from "./userActions";
import axios from "axios";
import {apiUrl} from "../store";
import {
    userActionAdult,
    userActionAge,
    userActionEmail, userActionId, userActionList,
    userActionMain,
    userActionName, userActionNullList, userActionPhoto,
    userActionSurname
} from "../reducers/userReducer/userReducer";

export const loginOrLogout = (auth, user?) => {
    return async (dispatch) => {
        let message;
        try {
            if (user !== undefined) {
                if (user.hasOwnProperty('name')) {
                    message = await dispatch(registration(user));
                    if (message === 500) {
                        throw 500;
                    }

                    if (message === 400) {
                        throw 400;
                    }

                    return message;
                }

                message = await dispatch(login(user));

                if (message === 401) {
                    throw 401;
                }

                if (message === 404) {
                    throw 404;
                }

                if (message === 500) {
                    throw 500;
                }

                dispatch(authActionAuth(auth));

                return true;
            }

            const res = await axios({
                baseURL: apiUrl,
                url: '/logout',
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(authActionAuth(auth));
            dispatch(userActionName(''));
            dispatch(userActionId(0));
            dispatch(userActionSurname(''));
            dispatch(userActionEmail(''));
            dispatch(userActionAge(''));
            dispatch(userActionMain(false));
            dispatch(userActionAdult(true));
            dispatch(userActionPhoto(''));
            dispatch(userActionNullList([]));

            return res.data.status;
        } catch (error) {
            if (error === 400) {
                dispatch(authActionError('Такая почта уже зарегистрирована'));
            }

            if (error === 401) {
                dispatch(authActionError('Подтвердите почту'));
            }

            if (error === 404) {
                dispatch(authActionError('Неверные данные'));
            }

            if (error === 500) {
                dispatch(authActionError('Упс... Пожалуйста, зайдите позже'));
            }
        }
    }
}

export const deleteError = () => {
    return async (dispatch) => {
        dispatch(authActionError(''));
    }
}