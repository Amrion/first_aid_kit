import axios from "axios";
import {apiUrl} from "../store";
import {authActionAuth, authActionError, authActionLoading} from "../reducers/authReducer/authReducer";
import {
    userActionAdult,
    userActionAge, userActionEmail, userActionId, userActionList, userActionMain,
    userActionName, userActionNullList,
    userActionPhoto, userActionProfLoadinglList,
    userActionSurname
} from "../reducers/userReducer/userReducer";
import {medActionNullMedList} from "../reducers/medReducer/medReducer";
import {notifyActionNullNotList} from "../reducers/notifyReducer/notifyReducer";

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

export const changeProfile = (data) => {
    return async (dispatch) => {
        try {
            const token = await axios({
                baseURL: apiUrl,
                url: '/csrf',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            if (token.data.status === 200) {
                const res = await axios({
                    baseURL: apiUrl,
                    url: '/edit',
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "csrf-token": token.data.message
                    },
                    data: data,
                    withCredentials: true
                });

                if (data.hasOwnProperty('name')) {
                    dispatch(userActionName(data.name));

                    const resFamily = await axios({
                        baseURL: apiUrl,
                        url: '/family',
                        method: 'GET',
                        headers: {"Content-Type": "application/json"},
                        withCredentials: true
                    });

                    if (resFamily.data.members.length === 0) {
                        dispatch(userActionNullList([]));
                    } else {
                        dispatch(userActionNullList([]));
                        resFamily.data.members.forEach((item) => {
                            dispatch(userActionList(item))
                        })
                    }
                }

                if (data.hasOwnProperty('surname')) {
                    dispatch(userActionSurname(data.surname));
                }

                if (data.hasOwnProperty('date')) {
                    dispatch(userActionAge(data.age));
                }
            }

            return true;
        } catch (error) {
            return false;
        }
    }
}

export const changeAvatar = (avatar, photo) => {
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

            if (token.data.status === 200) {
                const res = await axios({
                    baseURL: apiUrl,
                    url: '/avatar',
                    method: 'PUT',
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "csrf-token": token.data.message
                    },
                    data: avatar,
                    withCredentials: true
                });

                dispatch(userActionPhoto(photo));

                const resFamily = await axios({
                    baseURL: apiUrl,
                    url: '/family',
                    method: 'GET',
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                });

                if (resFamily.data.members.length === 0) {
                    dispatch(userActionNullList([]));
                } else {
                    dispatch(userActionNullList([]));
                    resFamily.data.members.forEach((item) => {
                        dispatch(userActionList(item))
                    })
                }
            }

            return true
        } catch (error) {
            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const loadingProfile = (profile?) => {
    return async (dispatch) => {
        try {
            if (profile) {
                dispatch(userActionProfLoadinglList(true));
            } else {
                dispatch(authActionLoading(true));
            }


            const resProfile = await axios({
                baseURL: apiUrl,
                url: '/profile',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            const resFamily = await axios({
                baseURL: apiUrl,
                url: '/family',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            if (resProfile.data.status === 200) {
                dispatch(authActionAuth(true));
                dispatch(userActionName(resProfile.data.user.name))
                dispatch(userActionSurname(resProfile.data.user.surname))
                dispatch(userActionEmail(resProfile.data.user.email))
                dispatch(userActionAge(resProfile.data.user.date))
                dispatch(userActionPhoto(resProfile.data.user.avatar))
                dispatch(userActionMain(resProfile.data.user.main))
                dispatch(userActionAdult(resProfile.data.user.adult))
                dispatch(userActionId(resProfile.data.user.id))

                if (resFamily.data.status === 200) {
                    if (resFamily.data.members.length === 0) {
                        dispatch(userActionNullList([]));
                    } else {
                        resFamily.data.members.forEach((item) => {
                            dispatch(userActionList(item))
                        })
                    }
                }

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
            if (profile) {
                dispatch(userActionProfLoadinglList(false));
            } else {
                dispatch(authActionLoading(false));
            }
        }
    }
}


export const createFamily = () => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/create',
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            const resFamily = await axios({
                baseURL: apiUrl,
                url: '/family',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(userActionList(resFamily.data.members[0]))
            dispatch(userActionMain(true));

            return true
        } catch (error) {
            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const deleteFamilyServer = () => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/delete',
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(userActionNullList([]));
            dispatch(userActionMain(false));

            return true
        } catch (error) {
            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const addPersonFamily = (data) => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/add',
                method: 'POST',
                headers: {"Content-Type": "multipart/form-data"},
                data,
                withCredentials: true
            });

            const resFamily = await axios({
                baseURL: apiUrl,
                url: '/family',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(userActionList(resFamily.data.members[resFamily.data.members.length - 1]));

            return true
        } catch (error) {
            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const invitePersonFamily = (data) => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/invite',
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                data,
                withCredentials: true
            });

            return true
        } catch (error) {
            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const deletePersonFamilyNoUser = (data) => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/remove/member',
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                data,
                withCredentials: true
            });

            const resFamily = await axios({
                baseURL: apiUrl,
                url: '/family',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(userActionNullList([]));

            resFamily.data.members.forEach((item) => {
                dispatch(userActionList(item))
            });

            return true
        } catch (error) {
            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}

export const deletePersonFamilyUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch(authActionLoading(true));

            const res = await axios({
                baseURL: apiUrl,
                url: '/remove/user',
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                data: {
                    id,
                },
                withCredentials: true
            });

            const resFamily = await axios({
                baseURL: apiUrl,
                url: '/family',
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

            dispatch(userActionNullList([]));
            dispatch(medActionNullMedList([]));
            dispatch(notifyActionNullNotList([]));

            resFamily.data.members.forEach((item) => {
                dispatch(userActionList(item))
            });

            return true
        } catch (error) {
            return false;
        } finally {
            dispatch(authActionLoading(false));
        }
    }
}