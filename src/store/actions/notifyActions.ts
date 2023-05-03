import {medActionCodeError, medActionLoading, medActionOneMedApi} from "../reducers/medReducer/medReducer";
import {apiUrl} from "../store";
import axios from "axios";
import {notifyActionNotList, notifyActionNullNotList, notifyActionTime} from "../reducers/notifyReducer/notifyReducer";
import {authActionLoading} from "../reducers/authReducer/authReducer";
import {log} from "util";

export const addNotify = (data) => {
    return async (dispatch) => {
        try {
            dispatch(medActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/add/notification',
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                data,
                withCredentials: true
            });

            const list = await axios({
                baseURL: apiUrl,
                url: '/notifications ',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(notifyActionNullNotList([]))

            const time = await axios({
                baseURL: 'http://worldtimeapi.org/api/timezone/Europe/London',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            });

            const now = new Date(time.data.utc_datetime)

            dispatch(notifyActionTime(now))

            const arr = list.data.notifications.map((item) => {
                item.allow = (Number(now.toString().split(' ')[4].slice(0, 2)) >= Number(item.time.split(' ')[1].slice(0, 2)))
                    && (Number(now.toString().split(' ')[2]) === Number(item.time.split(' ')[0].slice(8, 10)));

                return item
            })

            dispatch(notifyActionNotList(arr))

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

            const now = new Date(time.data.utc_datetime)

            dispatch(notifyActionTime(now))

            return true
        } catch (error) {
            return false;
        }
    }
}

export const getNotify = () => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/notifications ',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            const time = await axios({
                baseURL: 'http://worldtimeapi.org/api/timezone/Europe/London',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            });

            const now = new Date(time.data.utc_datetime)

            dispatch(notifyActionTime(now))

            const arr = res.data.notifications.map((item) => {
                item.allow = (Number(now.toString().split(' ')[4].slice(0, 2)) >= Number(item.time.split(' ')[1].slice(0, 2)))
                    && (Number(now.toString().split(' ')[2]) === Number(item.time.split(' ')[0].slice(8, 10)));

                return item
            })

            dispatch(notifyActionNullNotList([]))

            dispatch(notifyActionNotList(arr))

            return true
        } catch (error) {
            return false;
        }
        finally {
            dispatch(authActionLoading(false))
        }
    }
}

export const removeNotify = (id) => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/remove/notification',
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
                data: {
                    id
                },
            });

            const list = await axios({
                baseURL: apiUrl,
                url: '/notifications ',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(notifyActionNullNotList([]))

            const time = await axios({
                baseURL: 'http://worldtimeapi.org/api/timezone/Europe/London',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            });

            const now = new Date(time.data.utc_datetime)

            dispatch(notifyActionTime(now))

            const arr = list.data.notifications.map((item) => {
                item.allow = (Number(now.toString().split(' ')[4].slice(0, 2)) >= Number(item.time.split(' ')[1].slice(0, 2)))
                    && (Number(now.toString().split(' ')[2]) === Number(item.time.split(' ')[0].slice(8, 10)));

                return item
            })

            dispatch(notifyActionNotList(arr))

            return true
        } catch (error) {
            return false;
        }
        finally {
            dispatch(authActionLoading(false))
        }
    }
}

export const acceptNotify = (data) => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const token = await axios({
                baseURL: apiUrl,
                url: '/csrf',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            const res = await axios({
                baseURL: apiUrl,
                url: '/accept',
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "csrf-token": token.data.message
                },
                withCredentials: true,
                data
            });

            dispatch(notifyActionNullNotList([]))

            const time = await axios({
                baseURL: 'http://worldtimeapi.org/api/timezone/Europe/London',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            });

            const now = new Date(time.data.utc_datetime)

            dispatch(notifyActionTime(now))

            const arr = res.data.notifications.map((item) => {
                item.allow = (Number(now.toString().split(' ')[4].slice(0, 2)) >= Number(item.time.split(' ')[1].slice(0, 2)))
                    && (Number(now.toString().split(' ')[2]) === Number(item.time.split(' ')[0].slice(8, 10)));

                return item
            })

            dispatch(notifyActionNotList(arr))

            return true
        } catch (error) {
            return false;
        }  finally {
            dispatch(authActionLoading(false))
        }
    }
}

