import axios from "axios";
import {apiUrl} from "../store";
import {authActionLoading} from "../reducers/authReducer/authReducer";
import {
    userActionAge, userActionEmail,
    userActionName,
    userActionPassword,
    userActionSurname
} from "../reducers/userReducer/userReducer";

export const registration = (user) => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                    baseURL: apiUrl,
                    url: '/signup',
                    method: 'POST',
                    data: user,
                    headers: {'credentials': 'include'}
            });

            return res.data.message;
        } catch (error) {
            if (error.response.data.status === 400) {
                return 400;
            }

            if (Math.trunc(error.response.data.status / 100) === 5) {
                return 500;
            }
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const login = (user) => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/login',
                method: 'POST',
                data: user,
                headers: {'credentials': 'include'}
            });
        } catch (error) {
            if (error.response.data.status === 401) {
                return 401;
            }

            if (error.response.data.status === 404) {
                return 404;
            }

            if (Math.trunc(error.response.data.status / 100) === 5) {
                return 500;
            }
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const loadingProfile = () => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/profile',
                method: 'GET',
                headers: {'credentials': 'include'}
            });

            if (res.data.status === 200) {
                dispatch(userActionName(res))
                dispatch(userActionSurname(res))
                dispatch(userActionEmail(res))
                dispatch(userActionAge(res))
                dispatch(userActionPassword(res))

                return true
            }
        } catch (error) {
            if (error.response.data.status === 401) {
                return 401
            }

            if (Math.trunc(error.response.data.status / 100) === 5) {
                return 500;
            }
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}