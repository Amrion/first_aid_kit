import axios from "axios";
import {apiUrl} from "../store";
import {authActionAuth, authActionLoading} from "../reducers/authReducer/authReducer";
import {
    userActionAge, userActionEmail,
    userActionName,
    userActionPhoto,
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
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
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
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(loadingProfile())
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
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            if (res.data.status === 200) {
                dispatch(authActionAuth(true));
                dispatch(userActionName(res.data.user.name))
                dispatch(userActionSurname(res.data.user.surname))
                dispatch(userActionEmail(res.data.user.email))
                dispatch(userActionAge(res.data.user.date))
                dispatch(userActionPhoto(res.data.user.photo))

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