import {medActionCodeError, medActionLoading, medActionOneMedApi} from "../reducers/medReducer/medReducer";
import {localUrl} from "../store";
import axios from "axios";

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

            return true
        } catch (error) {
            return false;
        }
        finally {
            dispatch(medActionLoading(false))
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

            console.log(res.data)

            return true
        } catch (error) {
            return false;
        }
        finally {
            dispatch(medActionLoading(false))
        }
    }
}
