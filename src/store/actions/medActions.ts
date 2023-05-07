import {authActionLoading} from "../reducers/authReducer/authReducer";
import axios from "axios";
import {apiUrl} from "../store";
import {
    medActionCodeError,
    medActionLoading,
    medActionMedList,
    medActionNullMedList, medActionNullSearchList, medActionOneMedApi, medActionSearchList
} from "../reducers/medReducer/medReducer";

export const addOneMed = (data) => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const add = await axios({
                baseURL: apiUrl,
                url: '/add/medicine',
                method: 'POST',
                headers: {"Content-Type": "multipart/form-data"},
                data,
                withCredentials: true
            });

            const list = await axios({
                baseURL: apiUrl,
                url: '/medicine',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(medActionMedList(list.data.medicines[list.data.medicines.length - 1]));

            return true
        } catch (error) {
            if (error.response !== undefined) {
                if (error.response.data.message === 'File type is not supported') {

                    return 400
                }
            }

            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const editOneMed = (data) => {
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

            const add = await axios({
                baseURL: apiUrl,
                url: '/edit/medicine',
                method: 'PUT',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "csrf-token": token.data.message
                },
                data,
                withCredentials: true
            });

            const list = await axios({
                baseURL: apiUrl,
                url: '/medicine',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(medActionNullMedList([]));

            list.data.medicines.forEach((item) => {
                dispatch(medActionMedList(item));
            })

            return true
        } catch (error) {
            if (error.response.data.message === 'File type is not supported') {

                return 400
            }

            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const getListMed = () => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/medicine',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            res.data.medicines.forEach((item) => {
                dispatch(medActionMedList(item));
            })

            return true
        } catch (error) {
            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const deleteOneMed = (data) => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const add = await axios({
                baseURL: apiUrl,
                url: '/remove/medicine',
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                data,
                withCredentials: true
            });

            const list = await axios({
                baseURL: apiUrl,
                url: '/medicine',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(medActionNullMedList([]));

            list.data.medicines.forEach((item) => {
                dispatch(medActionMedList(item))
            });

            return true
        } catch (error) {
            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const barcodeMed = (data) => {
    return async (dispatch) => {
        try {
            dispatch(medActionCodeError(''));
            dispatch(medActionLoading(true));
            dispatch(medActionOneMedApi({}))

            const res = await axios({
                baseURL: apiUrl,
                url: '/barcode',
                method: 'POST',
                headers: {"Content-Type": "multipart/form-data"},
                data,
                withCredentials: true
            });

            if (res.data === '') {
                dispatch(medActionCodeError('Упс... Пожалуйста, переснимите'));

                return false;
            }

            dispatch(medActionOneMedApi(res.data.products[0]))

            return true
        } catch (error) {
            return false;
        }
        finally {
            dispatch(medActionLoading(false))
        }
    }
}

export const searchMed = (name) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                baseURL: apiUrl,
                url: `/search?search_text=${name}`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });

            dispatch(medActionNullSearchList([]));

            if (res.data.products !== undefined) {
                dispatch(medActionSearchList(res.data.products));
            }

            return true
        } catch (error) {
            dispatch(medActionNullSearchList([]));

            return false;
        }
    }
}