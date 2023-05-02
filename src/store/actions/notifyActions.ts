import {medActionCodeError, medActionLoading, medActionOneMedApi} from "../reducers/medReducer/medReducer";
import {localUrl} from "../store";
import axios from "axios";
import {notifyActionNotList, notifyActionNullNotList, notifyActionTime} from "../reducers/notifyReducer/notifyReducer";

export const addNotify = (data) => {
    return async (dispatch) => {
        try {
            dispatch(medActionLoading(true));

            const res = await axios({
                baseURL: localUrl,
                url: '/add/notification',
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                data,
                withCredentials: true
            });

            const list = await axios({
                baseURL: localUrl,
                url: '/notifications ',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(notifyActionNullNotList([]))
            dispatch(notifyActionNotList(list.data.notifications));

            return true
        } catch (error) {
            return false;
        }
        finally {
            dispatch(medActionLoading(false))
        }
    }
}

export const getTime = () => {
    return async (dispatch) => {
        try {
            const time = await axios({
                baseURL: 'http://worldtimeapi.org/api/timezone/Europe/London',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            });

            dispatch(notifyActionTime(new Date(time.data.utc_datetime)))

            return true
        } catch (error) {
            return false;
        }
    }
}

export const getNotify = () => {
    return async (dispatch) => {
        try {
            dispatch(medActionLoading(true));

            const res = await axios({
                baseURL: localUrl,
                url: '/notifications ',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(notifyActionNotList(res.data.notifications))

            return true
        } catch (error) {
            return false;
        }
        finally {
            dispatch(medActionLoading(false))
        }
    }
}

export const removeNotify = (id) => {
    return async (dispatch) => {
        try {
            dispatch(medActionLoading(true));

            const res = await axios({
                baseURL: localUrl,
                url: '/remove/notification',
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
                data: {
                    id
                },
            });

            const list = await axios({
                baseURL: localUrl,
                url: '/notifications ',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(notifyActionNullNotList([]))
            dispatch(notifyActionNotList(list.data.notifications));

            return true
        } catch (error) {
            return false;
        }
        finally {
            dispatch(medActionLoading(false))
        }
    }
}

//api/v1/remove/notification
